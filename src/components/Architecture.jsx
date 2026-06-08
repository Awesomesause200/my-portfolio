import { useState } from 'react';
import { Layers, ShieldCheck, Cpu, RefreshCw, Radio } from 'lucide-react';

export default function Architecture() {
  const [activeTab, setActiveTab] = useState('ingestion');

  const pipelineData = {
    ingestion: {
      title: "Asynchronous Processing & Storage Engine",
      subtitle: "Event-Driven & API Managed Pipelines",
      tech: ["AWS Cognito", "API Gateway", "Lambda", "S3", "DynamoDB"],
      points: [
        "Secured entryways using AWS Cognito matching fine-grained API Gateway permissions.",
        "Engineered stateless event workers via Lambda to handle burst incoming streams safely.",
        "Partitioned persistent data footprints across unstructured S3 layers and structured DynamoDB transactional states."
      ]
    },
    orchestration: {
      title: "Warehouse Ingestion & Cataloging Lookups",
      subtitle: "Multi-Source Redshift Architecture Optimization",
      tech: ["Amazon Redshift", "AWS Glue", "Lake Formation", "EventBridge"],
      points: [
        "Maintained high performance inside twin-source architectures utilizing targeted INSERT/DELETE staging strategies.",
        "Automated continuous schema evaluations via AWS Glue crawlers directly targeting historical S3 object stores.",
        "Enforced granular access structures locally within Glue Catalogs backed by Lake Formation permissions."
      ]
    },
    quality: {
      title: "Infrastructure as Code & Automated Testing Rigor",
      subtitle: "State Validation Platform-Wide via AWS CDK v2",
      tech: ["AWS CDK v2", "CloudWatch", "Vitest/Jest", "Python Unittest"],
      points: [
        "Abstracted logical network boundaries and system constructs purely as code architectures inside AWS CDK v2 templates.",
        "Prevented deployment regressions by wrapping all stack mutation logic in strict custom integration and unit test scripts.",
        "Automated declarative rollbacks through deep tracking rules configured within dynamic CloudWatch system monitors."
      ]
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 pointer-events-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">System Infrastructure Archetypes</h2>
          <p className="text-gray-400 mt-1">Deliverying data to end-users efficiently and securely across multiple platforms.</p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap p-1 rounded-xl bg-[#0e101f] border border-white/5">
          {Object.keys(pipelineData).map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                activeTab === tabKey 
                  ? 'bg-[#146EB4] text-white font-semibold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tabKey}
            </button>
          ))}
        </div>
      </div>

      {/* Detail Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 rounded-2xl border border-white/5 bg-[#0e101f]/60 backdrop-blur-xl">
        <div className="lg:col-span-2 space-y-4">
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#FF9900]/10 text-[#FF9900] border border-[#FF9900]/20 inline-block">
            {pipelineData[activeTab].subtitle}
          </span>
          <h3 className="text-2xl font-bold">{pipelineData[activeTab].title}</h3>
          
          <ul className="space-y-3 pt-2">
            {pipelineData[activeTab].points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#146EB4]" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Stack Box */}
        <div className="p-6 rounded-xl bg-black/30 border border-white/5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Cpu size={12} /> Managed Stack Resources
            </h4>
            <div className="flex flex-wrap gap-2">
              {pipelineData[activeTab].tech.map((t, idx) => (
                <span key={idx} className="px-3 py-1 text-xs font-mono rounded-md bg-white/5 border border-white/10">
                  {t}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-white/5 text-xs text-gray-500 flex items-center gap-2">
            <Radio size={12} className="text-green-400 animate-pulse" /> Active Deployment Profile Verified
          </div>
        </div>
      </div>
    </section>
  );
}