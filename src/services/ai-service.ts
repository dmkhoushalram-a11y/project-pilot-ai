const API_URL = 'http://localhost:3001/api';

export async function generateProjectIdeas(domain: string, skills: string, duration: string) {
  try {
    const res = await fetch(`${API_URL}/generate-ideas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain, skills, duration })
    });
    if (!res.ok) throw new Error("Failed to generate ideas");
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    // Fallback if backend is not running
    const focus = skills || "your current skills";
    return [
      { id: "offline-1", title: `${domain} Impact Hub`, summary: `A practical ${domain.toLowerCase()} solution tailored around ${focus}.`, problem: "Students and communities need a simple way to turn a recurring problem into measurable action.", difficulty: "Intermediate", duration, technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"], features: ["Role-based dashboard", "Smart recommendations", "Progress analytics"], innovationScore: 86 },
      { id: "offline-2", title: "Campus Connect AI", summary: "A student-first platform that organizes campus requests and suggests the best next action.", problem: "Important campus information and support requests are scattered across too many channels.", difficulty: "Intermediate", duration, technologies: ["React", "Firebase", "OpenAI API", "Chart.js"], features: ["AI assistant", "Live status updates", "Personalized notifications"], innovationScore: 91 },
      { id: "offline-3", title: "SkillSprint Planner", summary: "An adaptive planner that turns ambitious learning or project goals into achievable weekly sprints.", problem: "Students often struggle to estimate work and stay consistent before final submission.", difficulty: "Beginner", duration, technologies: ["React", "TypeScript", "Local Storage", "Recharts"], features: ["Weekly sprints", "Feasibility score", "Achievement badges"], innovationScore: 79 }
    ];
  }
}

export async function generateProjectPlan(projectId: string) {
  try {
    const res = await fetch(`${API_URL}/generate-plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId })
    });
    return await res.json();
  } catch (error) {
    return { phases: ["Phase 1: Please start the backend server."] };
  }
}

export async function askMentor(projectId: string, question: string) {
  try {
    const res = await fetch(`${API_URL}/ask-mentor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, question })
    });
    const data = await res.json();
    return data.answer;
  } catch (error) {
    return `Great question. For a strong MVP, define one user journey, build only essential screens, and test with 3–5 students. For “${question}”, document your decision, explain the trade-off, and keep the first version simple enough to finish on time.`;
  }
}

export async function generateDocumentation(projectId: string, docType: string) {
  try {
    const res = await fetch(`${API_URL}/generate-docs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, docType })
    });
    const data = await res.json();
    return data.content;
  } catch (error) {
    const templates: Record<string, string> = {
      Abstract: "This project proposes a practical digital solution that addresses a real user problem through an intuitive interface, secure data handling, and measurable outcomes.",
      Architecture: "Presentation layer (React) → API layer (Node/Express) → data layer (MongoDB/Firebase). External AI services are accessed only through the API layer.",
      "Viva Questions": "1. What problem does your project solve?\n2. Why did you choose this stack?\n3. What is the MVP scope?\n4. How do you protect user data?\n5. What would you improve with more time?"
    };
    return templates[docType] || "Create a concise section covering the problem, approach, implementation, evaluation, and future scope.";
  }
}
