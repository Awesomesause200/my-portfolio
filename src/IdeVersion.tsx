import React, { useState } from 'react';

// --- Sub-Components for the IDE look ---

const FileIcon = ({ color }: { color: string }) => (
  <span className={`w-2 h-2 rounded-full ${color}`} />
);

const SQLResultTable = () => (
  <div className="mt-6 border border-slate-800 rounded bg-black/20 overflow-hidden">
    <div className="bg-slate-800/50 px-3 py-1 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
      Query Results (2 rows)
    </div>
    <table className="w-full text-left text-xs font-mono">
      <thead>
        <tr className="border-b border-slate-800 text-slate-500">
          <th className="p-2">METRIC_NAME</th>
          <th className="p-2">PRE_OPT</th>
          <th className="p-2 text-emerald-400">POST_OPT</th>
        </tr>
      </thead>
      <tbody className="text-slate-300">
        <tr className="border-b border-slate-800/50">
          <td className="p-2">queue_latency</td>
          <td className="p-2 italic">100ms</td>
          <td className="p-2 text-emerald-400 font-bold">65ms (-35%)</td>
        </tr>
        <tr>
          <td className="p-2">concurrency_limit</td>
          <td className="p-2 italic">2x</td>
          <td className="p-2 text-emerald-400 font-bold">15x</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('profile.json');

  return (
    <div className="h-screen w-full flex flex-col bg-[#0d1117] text-[#c9d1d9] font-mono selection:bg-blue-500/30">
      
      {/* --- 1. TOP NAV / BREADCRUMBS --- */}
      <nav className="h-9 border-b border-slate-800 flex items-center bg-[#161b22] text-xs px-4 justify-between">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 italic font-sans">Business_Intelligence_v2.0</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300">src</span>
          <span className="text-slate-600">/</span>
          <span className="text-blue-400">{activeTab}</span>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] text-emerald-500 uppercase font-bold">Cluster_Active</span>
          </div>
        </div>
      </nav>

      {/* --- 2. MAIN LAYOUT CONTAINER --- */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR (File Explorer) */}
        <aside className="w-64 border-r border-slate-800 bg-[#0d1117] hidden md:flex flex-col">
          <div className="p-3 text-[10px] uppercase font-bold text-slate-500 tracking-widest">Explorer</div>
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-1 text-sm text-slate-400 flex items-center gap-2 bg-blue-500/5 border-l-2 border-blue-500">
              <span>📂</span> <span className="text-slate-200 font-bold underline decoration-blue-500/50">Core_Infrastructure</span>
            </div>
            <ul className="pl-9 mt-1 space-y-1 text-sm text-slate-500">
              <li className="hover:text-blue-400 cursor-pointer flex items-center gap-2 py-0.5">
                <FileIcon color="bg-orange-500" /> redshift_opt.sql
              </li>
              <li className="hover:text-blue-400 cursor-pointer flex items-center gap-2 py-0.5 text-blue-300">
                <FileIcon color="bg-blue-400" /> profile.json
              </li>
              <li className="hover:text-blue-400 cursor-pointer flex items-center gap-2 py-0.5">
                <FileIcon color="bg-yellow-400" /> etl_pipeline.py
              </li>
            </ul>
          </div>
        </aside>

        {/* EDITOR AREA (Main Content) */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#0d1117]">
          {/* Tabs */}
          <div className="flex bg-[#161b22] border-b border-slate-800">
            <div className="px-4 py-2 bg-[#0d1117] border-r border-slate-800 border-t-2 border-t-blue-500 text-xs text-blue-300">
              profile.json
            </div>
            <div className="px-4 py-2 border-r border-slate-800 text-xs text-slate-500 hover:bg-white/5 cursor-pointer">
              infrastructure.tf
            </div>
          </div>

          {/* Scrolling Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
            <div className="max-w-4xl mx-auto">
              
              {/* Intro Section */}
              <section className="mb-16">
                <div className="text-slate-600 mb-2">{"{"}</div>
                <div className="pl-6">
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    "role": <span className="text-emerald-400">"Business Intelligence Engineer"</span>
                  </h1>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                    "Specializing in <span className="text-blue-400">2TB+</span> high-throughput ETL pipelines. From 
                    Redshift cluster maintenance to S3 lake architecture, I automate 
                    the entire lifecycle with CI/CD."
                  </p>
                </div>
              </section>

              {/* Redshift Optimization Section */}
              <section className="mb-16 group">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="text-blue-500">import</span> <span>infrastructure.optimization</span>
                </div>
                <div className="border-l-2 border-slate-800 pl-6 transition-colors group-hover:border-blue-500/50">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    Redshift Optimization
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">Success</span>
                  </h2>
                  <p className="text-slate-400 text-sm mb-4">
                    Serverless → Provisioned RA3. Handled zero-downtime cutover for 50+ dependent ETL jobs and 150+ QS Datasets.
                  </p>
                  <SQLResultTable />
                </div>
              </section>

              {/* Custom Auth Project */}
              <section className="mb-16">
                <div className="bg-[#161b22] border border-slate-800 rounded-lg p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10 text-4xl">🔐</div>
                  <h3 className="text-blue-400 font-bold mb-4"># Project: Custom Auth & Intra-VPC API</h3>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex gap-3">
                      <span className="text-slate-600">01</span>
                      <span>Complex orchestration via AWS Lambda in Java/Python.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-slate-600">02</span>
                      <span>554K/day Transactions managed with CI/CD.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-slate-600">03</span>
                      <span>AWS Glue and Lake Formation managed tables.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <div className="text-slate-600">{"}"}</div>
            </div>
          </div>
        </main>
      </div>

		{/* Mentorship / Documentation Section */}
		<section className="mb-16">
		<div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-mono">
			<span>docs / leadership / mentorship_log.md</span>
		</div>
		<div className="prose prose-invert max-w-none border-t border-slate-800 pt-6">
			<h2 className="text-2xl font-bold text-white mb-4"># Technical Leadership & Enablement</h2>
			<div className="space-y-6">
			<div>
				<h4 className="text-code-blue font-bold text-sm uppercase mb-2">## AWS CDK v2 Migration</h4>
				<p className="text-slate-400 text-sm leading-relaxed">
				Spearheaded team-wide adoption of <code className="bg-slate-800 px-1.5 py-0.5 rounded text-code-orange">CDK v2</code>. 
				Developed a library of L3 constructs to standardize repeatable infrastructure across 4 separate engineering squads.
				</p>
			</div>
			
			<div className="grid md:grid-cols-2 gap-4">
				<div className="p-4 bg-slate-900/50 border border-slate-800 rounded">
				<h5 className="text-xs font-bold text-slate-500 mb-2 underline">Ownership Culture</h5>
				<p className="text-xs text-slate-400">Mentored 5+ junior engineers on technical ownership and the end-to-end lifecycle of high-throughput data pipelines.</p>
				</div>
				<div className="p-4 bg-slate-900/50 border border-slate-800 rounded">
				<h5 className="text-xs font-bold text-slate-500 mb-2 underline">Code Standards</h5>
				<p className="text-xs text-slate-400">Implemented a rigorous code review process focusing on security architecture and operational excellence.</p>
				</div>
			</div>
			</div>
		</div>
		</section>

      {/* --- 3. BOTTOM TERMINAL / STATUS BAR --- */}
      <footer className="h-32 border-t border-slate-800 bg-black flex flex-col">
        <div className="flex gap-6 px-4 bg-[#161b22] border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
          <button className="py-1 border-b border-blue-500 text-blue-400">Terminal</button>
          <button className="py-1">Output</button>
          <button className="py-1">Debug Console</button>
        </div>
        <div className="p-3 overflow-y-auto text-[11px] leading-tight flex flex-col gap-1">
          <div className="flex gap-4">
            <span className="text-emerald-500 font-bold">[SUCCESS]</span>
            <span className="text-slate-400 italic">Total data processed weekly:</span>
            <span className="text-white">1.28 TB</span>
          </div>
          <div className="flex gap-4">
            <span className="text-blue-500 font-bold">[INFO]</span>
            <span className="text-slate-400 italic">QuickSuite Health Check:</span>
            <span className="text-white">12 Dashboards reporting ACTIVE</span>
          </div>
          <div className="flex gap-4">
            <span className="text-yellow-500 font-bold">[WARN]</span>
            <span className="text-slate-400 italic">Environment:</span>
            <span className="text-white">Production - CI/CD Pipelines Operational</span>
          </div>
        </div>
      </footer>

    </div>
  );
}