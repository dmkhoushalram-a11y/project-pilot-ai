import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI conditionally
let openai;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// 1. Generate Ideas
app.post('/api/generate-ideas', async (req, res) => {
  const { domain, skills, duration } = req.body;
  try {
    if (openai) {
      const prompt = `Act as an academic advisor. Generate 3 final-year project ideas for a student in ${domain} with skills in ${skills} and a duration of ${duration}. Return a JSON array of objects with keys: id (string), title (string), summary (string), problem (string), difficulty (string), duration (string), technologies (array of strings), features (array of strings), innovationScore (number).`;
      
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-4o-mini",
        response_format: { type: "json_object" }
      });
      const data = JSON.parse(completion.choices[0].message.content);
      return res.json(data.projects || data);
    }
    
    // Fallback Mock Data
    res.json([
      {
        id: `proj-${Date.now()}`,
        title: "AI Project Mentor",
        summary: "A full-stack application to help students build projects.",
        problem: "Students struggle to find good project ideas.",
        difficulty: "Intermediate",
        duration,
        technologies: ["React", "Node.js", "Express", "OpenAI"],
        features: ["Idea Generation", "Chat Mentorship", "Roadmap tracking"],
        innovationScore: 88
      }
    ]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Generate Plan/Roadmap
app.post('/api/generate-plan', async (req, res) => {
  const { projectId } = req.body;
  try {
    if (openai) {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `Create a week-by-week development roadmap for project ID: ${projectId}. Return a JSON object with a "phases" array containing strings.` }],
        model: "gpt-4o-mini",
        response_format: { type: "json_object" }
      });
      return res.json(JSON.parse(completion.choices[0].message.content));
    }
    res.json({ phases: ["Phase 1: Setup", "Phase 2: UI/UX", "Phase 3: Logic", "Phase 4: Deployment"] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Ask Mentor (Chat)
app.post('/api/ask-mentor', async (req, res) => {
  const { projectId, question } = req.body;
  try {
    if (openai) {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a senior developer mentoring a student on their final year project. Keep answers concise, technical, and encouraging." },
          { role: "user", content: `Regarding project ${projectId}: ${question}` }
        ],
        model: "gpt-4o-mini"
      });
      return res.json({ answer: completion.choices[0].message.content });
    }
    res.json({ answer: `[Mock AI Reply] To answer your question "${question}", I recommend reading the official documentation and breaking the problem into smaller functions.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Generate Documentation
app.post('/api/generate-docs', async (req, res) => {
  const { projectId, docType } = req.body;
  try {
    if (openai) {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `Generate a detailed ${docType} template for the final year project ${projectId}. Use markdown format.` }],
        model: "gpt-4o-mini"
      });
      return res.json({ content: completion.choices[0].message.content });
    }
    res.json({ content: `# ${docType.toUpperCase()}\n\nThis is a mock template for project ${projectId}.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
