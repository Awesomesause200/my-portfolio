import React, { useState, type ReactNode } from 'react';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface BentoCardProps {
  children: ReactNode;
  backContent?: ReactNode; // New prop for the expanded view
  className?: string;
  title?: string;
}

const BentoCard = ({ children, backContent, className = "", title = "" }: BentoCardProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 1. Handle Ripple
    const rect = e.currentTarget.getBoundingClientRect();
    const newRipple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    // 2. Handle Flip (only if backContent exists)
    if (backContent) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div 
      className={`perspective-1000 h-full w-full ${className}`}
      onClick={handleClick}
    >
      <div className={`relative w-full h-full transition-all duration-700 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* FRONT SIDE */}
        <div className="absolute inset-0 backface-hidden bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 flex flex-col overflow-hidden">
          {ripples.map((ripple) => (
            <span key={ripple.id} className="pointer-events-none absolute rounded-full bg-white/20 animate-ripple"
              style={{ left: ripple.x, top: ripple.y, width: '100px', height: '100px', marginLeft: '-50px', marginTop: '-50px' }} 
            />
          ))}
          
          {title && <span className="text-xs font-mono uppercase tracking-tighter text-slate-500 mb-4">{title}</span>}
          <div className="flex-1 flex flex-col">{children}</div>

          {/* Conditional Arrow Icon */}
          {backContent && (
            <div className="absolute bottom-4 right-4 text-slate-500 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          )}
        </div>

        {/* BACK SIDE */}
		{backContent && (
		<div className="absolute inset-0 backface-hidden bg-indigo-950 border border-indigo-500/50 rounded-3xl p-6 rotate-y-180 flex flex-col">
			<span className="text-xs font-mono uppercase tracking-tighter text-indigo-300 mb-4 flex-shrink-0">
			Detailed View
			</span>
			
			{/* This wrapper enables scrolling */}
			<div className="flex-1 overflow-y-auto pr-2 custom-scrollbar text-sm text-slate-200">
			{backContent}
			</div>

			{/* Return Arrow */}
			<div className="absolute bottom-4 right-4 text-indigo-300 rotate-180 pointer-events-none">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
			</div>
		</div>
		)}

      </div>
    </div>
  );
};


function App() {
  return (
    <div className="min-h-screen bg-black text-slate-100 p-4 md:p-12 font-sans">
      {/* The Grid Container */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
        
        {/* 1. Intro Card (Big Square) */}
        <BentoCard className="md:col-span-2 md:row-span-2 justify-end bg-gradient-to-br from-slate-900 to-slate-950">
          <h1 className="text-5xl font-bold tracking-tight">Bussiness Intelligence <br/>Engineer.</h1>
          <p className="mt-4 text-slate-400 max-w-xs">
            Specializing in 2TB+ high-throughput ETL pipelines. From Redshift cluster maintenance to S3 lake architecture, I automate the entire lifecycle with CI/CD to ensure data integrity and zero-lag performance.
          </p>
        </BentoCard>

        {/* 2. Tech Stack */}
        <BentoCard title="Tech Stack" className="md:row-span-2 md:col-span-2">
          <ul className="space-y-3 font-mono text-sm mt-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> AWS / S3 / Redshift / Lambda / API Gateway / Cognito
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span> Python / Pandas / Numpy
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span> SQL / Redshift / Athena / SparkSQL / Postgress
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span> React / Vite
            </li>
          </ul>
        </BentoCard>

        {/* 3. Processing Numbers */}
        <BentoCard title="Processing Numbers" className="md:col-span-2">
          <div className="mt-auto">
            <div className="text-3xl font-bold font-mono text-indigo-400">1.28 TB</div>
            <p className="text-xs text-slate-500 mt-1">Total data processed weekly</p>

			<div className="text-3xl font-bold font-mono text-indigo-400">12 QuickSuite Dashboards</div>
            <p className="text-xs text-slate-500 mt-1">Two Dashboards are near-real time.</p>
          </div>
        </BentoCard>

		{/* 4. Custom Auth Card */}
		<BentoCard 
			title="Project"
			className="md:col-span-2"
			backContent={
				<div className="space-y-2">
				<p>• Complex orchestration via AWS Lambda in Java and Python.</p>
				<p>• Lambda deployment & testing managed with CI/CD data pipelines.</p>
				<p>• AWS Glue, Redshift, and Lake Formation managed tables.</p>
				</div>
			}
			>
			<div className="flex items-center gap-6 h-full">
				<div className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center text-2xl">🚀</div>
				<div>
				<h3 className="font-bold text-xl">Custom Auth & Inter-VPC API Data</h3>
				<p className="text-xs text-slate-400 font-mono">554K/day Transactions</p>
				</div>
			</div>
		</BentoCard>

		{/* 4. Redshift Management Card */}
		<BentoCard 
			title="Infrastructure"
			className="md:col-span-2 md:row-span-1"
			backContent={
				<div className="space-y-4">
				<div className="bg-white/10 p-3 rounded-lg border border-white/10">
					<h4 className="text-xs font-bold text-indigo-300 uppercase underline decoration-indigo-500/50 mb-1">Migration Project</h4>
					<p className="text-sm">Serverless → Provisioned RA3. Handled zero-downtime cutover for 50+ dependent ETL jobs, 150+ QS Datasets, and other data pipelines.</p>
				</div>
				<div className="bg-white/10 p-3 rounded-lg border border-white/10">
					<h4 className="text-xs font-bold text-indigo-300 uppercase underline decoration-indigo-500/50 mb-1">Query Optimization</h4>
					<p className="text-sm">Configured Work Load Management (WLM) properties and SQA (Short Query Acceleration) to reduce peak-hour latency by 35%.</p>
				</div>
				</div>
			}
			>
			<div className="flex flex-col h-full">
				<div className="flex justify-between items-start mb-4">
				<div>
					<h3 className="text-xl font-bold text-white">Redshift Optimization</h3>
					<p className="text-slate-400 text-sm italic">WLM & Cluster Orchestration</p>
				</div>
				{/* Decorative "Status" Light */}
				<div className="flex items-center gap-2 px-2 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30">
					<span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
					<span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">Active</span>
				</div>
				</div>

				{/* Small visual data indicator */}
				<div className="mt-auto grid grid-cols-3 gap-2 border-t border-slate-800 pt-4">
				<div className="text-center">
					<p className="text-[10px] text-slate-500 uppercase font-mono">Queue Time</p>
					<p className="text-lg font-bold text-indigo-400 font-mono">-35%</p>
				</div>
				<div className="text-center border-x border-slate-800">
					<p className="text-[10px] text-slate-500 uppercase font-mono">Concurrency</p>
					<p className="text-lg font-bold text-indigo-400 font-mono">15x</p>
				</div>
				<div className="text-center">
					<p className="text-[10px] text-slate-500 uppercase font-mono">Uptime</p>
					<p className="text-lg font-bold text-indigo-400 font-mono">99.98</p>
				</div>
				</div>
			</div>
		</BentoCard>

      </main>
    </div>
  );
}

export default App;