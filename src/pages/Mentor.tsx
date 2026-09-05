import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { MessageSquare, FileText, CheckSquare, Target } from 'lucide-react';
import { askMentor } from '../services/ai-service';
import { generateDocumentation } from '../services/ai-service';

export default function Mentor() {
  const { id } = useParams();
  const [tab, setTab] = useState('overview');
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState<{role: string, content: string}[]>([
    { role: 'ai', content: 'Hello! I am your project mentor. Ask me how to structure your database, or what API to use.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [completed, setCompleted] = useState<number[]>(() => JSON.parse(localStorage.getItem(`roadmap-${id}`) || '[]'));
  const [document, setDocument] = useState('');
  const [documentTitle, setDocumentTitle] = useState('');
  const [docLoading, setDocLoading] = useState(false);

  const togglePhase = (index: number) => {
    const next = completed.includes(index) ? completed.filter(item => item !== index) : [...completed, index];
    setCompleted(next);
    localStorage.setItem(`roadmap-${id}`, JSON.stringify(next));
  };
  const makeDocument = async (type: string) => {
    setDocLoading(true);
    setDocumentTitle(type);
    setDocument(await generateDocumentation(id || 'unknown', type));
    setDocLoading(false);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatLog([...chatLog, { role: 'user', content: userMsg }]);
    setChatInput('');
    setIsTyping(true);
    
    try {
      const response = await askMentor(id || 'unknown', userMsg);
      setChatLog(prev => [...prev, { role: 'ai', content: response as string }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4">
        <Link to="/" className="text-xl font-bold text-indigo-400 mb-8 block">ProjectPilot AI</Link>
        <nav className="space-y-2">
          <button onClick={() => setTab('overview')} className={`w-full text-left p-3 rounded-md flex gap-2 items-center ${tab === 'overview' ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}><Target size={18}/> Overview</button>
          <button onClick={() => setTab('roadmap')} className={`w-full text-left p-3 rounded-md flex gap-2 items-center ${tab === 'roadmap' ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}><CheckSquare size={18}/> Roadmap</button>
          <button onClick={() => setTab('chat')} className={`w-full text-left p-3 rounded-md flex gap-2 items-center ${tab === 'chat' ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}><MessageSquare size={18}/> Mentor Chat</button>
          <button onClick={() => setTab('docs')} className={`w-full text-left p-3 rounded-md flex gap-2 items-center ${tab === 'docs' ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}><FileText size={18}/> Documentation</button>
        </nav>
      </aside>
      
      <main className="flex-1 p-8">
        {tab === 'overview' && (
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">Project Workspace</h1>
            <p className="text-slate-400 text-lg mb-8">AI-powered mentorship dashboard for project {id}</p>
            <h2 className="text-2xl font-semibold mb-4 mt-8">Technology Stack</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <h3 className="font-bold text-indigo-300">Frontend</h3>
                <p>React / React Native</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <h3 className="font-bold text-emerald-300">Backend</h3>
                <p>Node.js & Express / Python API</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'roadmap' && (
          <div className="max-w-3xl">
            <div className="flex items-end justify-between mb-6"><div><h2 className="text-2xl font-bold">Development Roadmap</h2><p className="text-slate-400 mt-1">Complete a phase and your progress is saved automatically.</p></div><span className="text-indigo-300 font-semibold">{Math.round((completed.length / 4) * 100)}% complete</span></div>
            <div className="h-2 bg-slate-800 rounded-full mb-6 overflow-hidden"><div className="h-full bg-indigo-500 transition-all" style={{width: `${(completed.length / 4) * 100}%`}} /></div>
            <div className="space-y-4">
              {["Phase 1: Research", "Phase 2: Database", "Phase 3: Features", "Phase 4: AI & Testing"].map((phase, i) => (
                <div key={i} className={`flex gap-4 items-center bg-slate-900 p-4 rounded-lg border ${completed.includes(i) ? 'border-indigo-500/60' : 'border-slate-800'}`}>
                  <input checked={completed.includes(i)} onChange={() => togglePhase(i)} type="checkbox" className="w-5 h-5 accent-indigo-500" />
                  <span className={`text-lg ${completed.includes(i) ? 'line-through text-slate-500' : ''}`}>{phase}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'chat' && (
          <div className="max-w-2xl h-[600px] flex flex-col bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-800/50 font-semibold">AI Mentor</div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
              {chatLog.map((msg, idx) => (
                <div key={idx} className={`p-3 rounded-lg max-w-[80%] ${msg.role === 'ai' ? 'bg-slate-800 rounded-tl-none self-start' : 'bg-indigo-600 text-white rounded-tr-none self-end'}`}>
                  {msg.content}
                </div>
              ))}
              {isTyping && <div className="text-slate-400 text-sm italic">Mentor is typing...</div>}
            </div>
            <div className="p-4 border-t border-slate-800 flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask a question..." 
                className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-white" 
              />
              <Button onClick={handleSendMessage} disabled={isTyping || !chatInput.trim()}>Send</Button>
            </div>
            <div className="px-4 pb-4 flex flex-wrap gap-2">{['Suggest a simple MVP', 'How should I design the database?', 'Help me prepare for the viva'].map(prompt => <button key={prompt} onClick={() => setChatInput(prompt)} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700">{prompt}</button>)}</div>
          </div>
        )}

        {tab === 'docs' && (
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Documentation Assistant</h2>
            <p className="text-slate-400 mb-6">Generate ready-to-use templates for your final report.</p>
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => makeDocument('Abstract')} variant="outline" className="h-24 flex flex-col gap-2"><FileText size={20}/> Generate Abstract</Button>
              <Button onClick={() => makeDocument('Architecture')} variant="outline" className="h-24 flex flex-col gap-2"><FileText size={20}/> System Architecture</Button>
              <Button onClick={() => makeDocument('Viva Questions')} variant="outline" className="h-24 flex flex-col gap-2"><FileText size={20}/> Viva Questions</Button>
            </div>
            {(docLoading || document) && <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-5"><h3 className="font-semibold text-indigo-300 mb-3">{docLoading ? 'Drafting your section…' : documentTitle}</h3><p className="whitespace-pre-line leading-7 text-slate-300">{docLoading ? 'The AI mentor is preparing a practical starting point.' : document}</p></div>}
          </div>
        )}
      </main>
    </div>
  );
}
