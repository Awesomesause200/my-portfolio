import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import IdeVersion from "./ideversion";
import BentoVersion from "./BentoVersion";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navigation Toggle */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2">
        <Link 
          to="/ide" 
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-mono shadow-2xl hover:scale-105 transition-all text-center"
        >
          VIEW_NEW_IDE
        </Link>
        <Link 
          to="/bento" 
          className="bg-slate-700 text-white px-4 py-2 rounded-full text-xs font-mono shadow-2xl hover:scale-105 transition-all text-center"
        >
          VIEW_OLD_BENTO
        </Link>
      </div>

      <Routes>
        {/* Force the landing page to go to the IDE version */}
        <Route path="/" element={<Navigate to="/ide" replace />} />
        <Route path="/ide" element={<IdeVersion />} />
        <Route path="/bento" element={<BentoVersion />} />
        
        {/* Catch-all for index.html or typos */}
        <Route path="*" element={<Navigate to="/ide" replace />} />
      </Routes>
    </BrowserRouter>
  );
}