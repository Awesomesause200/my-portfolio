import { Shield, Server, Activity } from 'lucide-react';

export default function Metrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 pointer-events-auto">
      <div className="p-6 rounded-2xl border border-white/5 bg-[#0e101f]/80 backdrop-blur-md orange-glow transition-all hover:border-[#FF9900]/30">
        <div className="text-xs font-mono text-[#FF9900] uppercase tracking-wider mb-1 flex items-center gap-2">
          <Activity size={14} /> System Availability
        </div>
        <div className="text-4xl font-bold font-mono">99.99%</div>
        <p className="text-xs text-gray-400 mt-1">Uptime SLA targets optimized via declarative structural scaling across compute nodes.</p>
      </div>

      <div className="p-6 rounded-2xl border border-white/5 bg-[#0e101f]/80 backdrop-blur-md transition-all hover:border-purple-500/30">
        <div className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-1 flex items-center gap-2">
            <Server size={14} /> Pipeline Data Footprint
        </div>
        <div className="text-4xl font-bold font-mono">&gt; 1.0 TB</div>
        <p className="text-xs text-gray-400 mt-1">Aggregated monthly pipeline ingestion managed via automated S3 object stores and warehouse execution stages.</p>
      </div>

      <div className="p-6 rounded-2xl border border-white/5 bg-[#0e101f]/80 backdrop-blur-md transition-all hover:border-[#146EB4]/30">
        <div className="text-xs font-mono text-[#146EB4] uppercase tracking-wider mb-1 flex items-center gap-2">
          <Shield size={14} /> Platform Consumption
        </div>
        <div className="text-4xl font-bold font-mono">8,000+</div>
        <p className="text-xs text-gray-400 mt-1">Unique active internal consumers across dashboard tools and automated macros.</p>
      </div>
    </div>
  );
}