import { Terminal } from 'lucide-react';

export default function Hero() {
  return (
    <div className="max-w-xl lg:pt-36 pointer-events-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-mono mb-4">
        <Terminal size={14} /> Systems Orchestrator
      </div>
      <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-4">
        Business Intelligence <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#146EB4] via-purple-400 to-[#FF9900]">
          Engineer
        </span>
      </h1>
      <p className="text-gray-400 text-lg leading-relaxed">
        Architecting ultra-reliable serverless pipelines and high-volume data environments. I build the automated infrastructure that scales data delivery for large scale applications.
      </p>
    </div>
  );
}