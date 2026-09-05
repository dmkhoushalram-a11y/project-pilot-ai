import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Generator from "./pages/Generator";
import Mentor from "./pages/Mentor";
import Dashboard from "./pages/Dashboard";
import CursorGlow from "./components/ui/CursorGlow";
import FloatingParticles from "./components/ui/FloatingParticles";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CursorGlow />
      <FloatingParticles />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/mentor/:id" element={<Mentor />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
