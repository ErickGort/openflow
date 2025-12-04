import { useState, useEffect, useRef } from 'react';
import {
    Database,
    Search,
    Table as TableIcon,
    X,
    Lock,
    Map as MapIcon,
    Share2,
    FileText,
    CheckCircle,
    RefreshCw,
    Minus,
    Plus,
    Network,
    BookOpen
} from 'lucide-react';

// --- CONFIGURATION & DATA ---

// Using Simple Icons CDN for 100% brand accuracy
const getIconUrl = (slug, color) => `https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`;

const ALL_SYSTEMS = [
    // Core
    { id: 'workday', name: 'Workday', iconSlug: 'workday', color: '#005C9C', category: 'Core', r: 40, details: { type: 'HRIS', status: 'Healthy', sync: 'Real-time', fields: ['Employee ID', 'Job Profile'] } },
    { id: 'okta', name: 'Okta', iconSlug: 'okta', color: '#00297a', category: 'Core', r: 28, details: { type: 'Identity', status: 'Healthy', sync: 'SCIM', fields: ['SSO Profile', 'Groups'] } },
    { id: 'slack', name: 'Slack', iconSlug: 'slack', color: '#E01E5A', category: 'Core', r: 35, details: { type: 'Collaboration', status: 'Healthy', sync: 'Event-based', fields: ['User Email', 'Channel ID'] } },

    // Data
    { id: 'snowflake', name: 'Snowflake', iconSlug: 'snowflake', color: '#29B5E8', category: 'Data', r: 42, details: { type: 'Data Warehouse', status: 'Healthy', sync: 'Batch', fields: ['ALL_TABLES'] } },
    { id: 'aws', name: 'AWS', iconSlug: 'amazonaws', color: '#FF9900', category: 'Data', r: 45, details: { type: 'Infrastructure', status: 'Healthy', sync: 'Continuous', fields: ['S3 Logs', 'EC2'] } },
    { id: 'gcp', name: 'Google Cloud', iconSlug: 'googlecloud', color: '#4285F4', category: 'Data', r: 40, details: { type: 'Analytics', status: 'Healthy', sync: 'Continuous', fields: ['BigQuery'] } },

    // Finance
    { id: 'netsuite', name: 'NetSuite', iconSlug: 'oracle', color: '#C74634', category: 'Finance', r: 35, details: { type: 'ERP', status: 'Healthy', sync: 'Batch', fields: ['GL', 'Invoice'] } },
    { id: 'stripe', name: 'Stripe', iconSlug: 'stripe', color: '#635BFF', category: 'Finance', r: 30, details: { type: 'Payments', status: 'Healthy', sync: 'Real-time', fields: ['Charge ID'] } },
    { id: 'expensify', name: 'Expensify', iconSlug: 'expensify', color: '#000000', category: 'Finance', r: 25, details: { type: 'Expense', status: 'Healthy', sync: 'Weekly', fields: ['Report ID'] } },
    { id: 'carta', name: 'Carta', iconSlug: 'carta', color: '#22c55e', category: 'Finance', r: 25, details: { type: 'Equity', status: 'Healthy', sync: 'Monthly', fields: ['Grant Date'] } },
    { id: 'shopify', name: 'Shopify', iconSlug: 'shopify', color: '#96BF48', category: 'Finance', r: 30, details: { type: 'Commerce', status: 'Healthy', sync: 'Real-time', fields: ['Order ID'] } },

    // Growth
    { id: 'salesforce', name: 'Salesforce', iconSlug: 'salesforce', color: '#00A1E0', category: 'Growth', r: 35, details: { type: 'CRM', status: 'Healthy', sync: 'Real-time', fields: ['Opportunity', 'Account'] } },
    { id: 'hubspot', name: 'HubSpot', iconSlug: 'hubspot', color: '#FF7A59', category: 'Growth', r: 30, details: { type: 'Marketing', status: 'Healthy', sync: 'Bi-directional', fields: ['Lead Score'] } },
    { id: 'marketo', name: 'Marketo', iconSlug: 'adobe', color: '#5c368d', category: 'Growth', r: 28, details: { type: 'Marketing', status: 'Degraded', sync: 'Batch', fields: ['Campaign'] } },
    { id: 'google_ads', name: 'Google Ads', iconSlug: 'googleads', color: '#fbbc04', category: 'Growth', r: 25, details: { type: 'Ad Tech', status: 'Healthy', sync: 'Daily', fields: ['CPC'] } },
    { id: 'linkedin', name: 'LinkedIn', iconSlug: 'linkedin', color: '#0a66c2', category: 'Growth', r: 25, details: { type: 'Social', status: 'Healthy', sync: 'Daily', fields: ['Audience'] } },

    // Engineering
    { id: 'github', name: 'GitHub', iconSlug: 'github', color: '#ffffff', category: 'Engineering', r: 28, details: { type: 'VCS', status: 'Healthy', sync: 'Webhooks', fields: ['PR', 'Commit'] } },
    { id: 'jira', name: 'Jira', iconSlug: 'jira', color: '#0052cc', category: 'Engineering', r: 28, details: { type: 'Project Mgmt', status: 'Healthy', sync: 'Bi-directional', fields: ['Issue'] } },
    { id: 'sentry', name: 'Sentry', iconSlug: 'sentry', color: '#362d59', category: 'Engineering', r: 25, details: { type: 'Observability', status: 'Healthy', sync: 'Real-time', fields: ['Error'] } },
    { id: 'datadog', name: 'Datadog', iconSlug: 'datadog', color: '#632ca6', category: 'Engineering', r: 25, details: { type: 'Monitoring', status: 'Healthy', sync: 'Real-time', fields: ['Metric'] } },
    { id: 'pagerduty', name: 'PagerDuty', iconSlug: 'pagerduty', color: '#04a14a', category: 'Engineering', r: 25, details: { type: 'Incident Response', status: 'Healthy', sync: 'Event-driven', fields: ['Incident'] } },

    // Benefits
    { id: 'fidelity', name: 'Fidelity', iconSlug: 'bankofamerica', color: '#198754', category: 'Benefits', r: 25, details: { type: '401k', status: 'Healthy', sync: 'Weekly', fields: ['Contribution'] } },
    { id: 'bluecross', name: 'BlueCross', iconSlug: 'jguar', color: '#0d6efd', category: 'Benefits', r: 25, details: { type: 'Insurance', status: 'Healthy', sync: 'Monthly', fields: ['Member'] } },
    { id: 'vsp', name: 'VSP Vision', iconSlug: 'eyeem', color: '#6f42c1', category: 'Benefits', r: 25, details: { type: 'Insurance', status: 'Healthy', sync: 'Monthly', fields: ['Enrollment'] } },
    { id: 'delta', name: 'Delta Dental', iconSlug: 'tooth', color: '#20c997', category: 'Benefits', r: 25, details: { type: 'Insurance', status: 'Healthy', sync: 'Monthly', fields: ['Coverage'] } },
    { id: 'guideline', name: 'Guideline', iconSlug: 'wise', color: '#0dcaf0', category: 'Benefits', r: 25, details: { type: '401k', status: 'Syncing', sync: 'Daily', fields: ['Deferral'] } },
];

const INTEGRATIONS = [
    { id: 101, source: 'workday', target: 'slack', direction: 'unidirectional', status: 'active' },
    { id: 102, source: 'workday', target: 'snowflake', direction: 'unidirectional', status: 'active' },
    { id: 103, source: 'aws', target: 'snowflake', direction: 'unidirectional', status: 'active' },
    { id: 104, source: 'gcp', target: 'snowflake', direction: 'unidirectional', status: 'idle' },
    { id: 105, source: 'okta', target: 'workday', direction: 'bidirectional', status: 'active' },
    { id: 106, source: 'okta', target: 'slack', direction: 'unidirectional', status: 'active' },
    { id: 201, source: 'fidelity', target: 'workday', direction: 'bidirectional', status: 'active' },
    { id: 202, source: 'bluecross', target: 'workday', direction: 'unidirectional', status: 'active' },
    { id: 203, source: 'vsp', target: 'workday', direction: 'unidirectional', status: 'active' },
    { id: 204, source: 'delta', target: 'workday', direction: 'unidirectional', status: 'active' },
    { id: 205, source: 'guideline', target: 'workday', direction: 'bidirectional', status: 'active' },
    { id: 301, source: 'github', target: 'jira', direction: 'bidirectional', status: 'active' },
    { id: 302, source: 'datadog', target: 'pagerduty', direction: 'unidirectional', status: 'active' },
    { id: 303, source: 'sentry', target: 'jira', direction: 'unidirectional', status: 'active' },
    { id: 304, source: 'datadog', target: 'slack', direction: 'unidirectional', status: 'active' },
    { id: 305, source: 'pagerduty', target: 'slack', direction: 'unidirectional', status: 'active' },
    { id: 306, source: 'okta', target: 'github', direction: 'unidirectional', status: 'active' },
    { id: 401, source: 'salesforce', target: 'hubspot', direction: 'bidirectional', status: 'syncing' },
    { id: 402, source: 'salesforce', target: 'snowflake', direction: 'unidirectional', status: 'active' },
    { id: 403, source: 'marketo', target: 'salesforce', direction: 'bidirectional', status: 'active' },
    { id: 404, source: 'google_ads', target: 'gcp', direction: 'unidirectional', status: 'active' },
    { id: 405, source: 'linkedin', target: 'salesforce', direction: 'unidirectional', status: 'active' },
    { id: 501, source: 'shopify', target: 'netsuite', direction: 'unidirectional', status: 'active' },
    { id: 502, source: 'stripe', target: 'netsuite', direction: 'unidirectional', status: 'active' },
    { id: 503, source: 'expensify', target: 'netsuite', direction: 'unidirectional', status: 'active' },
    { id: 504, source: 'carta', target: 'workday', direction: 'bidirectional', status: 'active' },
    { id: 505, source: 'netsuite', target: 'snowflake', direction: 'unidirectional', status: 'active' },
];

// SNOWFLAKE_SCHEMA is not used in the provided snippet, so it's removed.

// --- Helper Component for Brand Logos ---
const BrandLogo = ({ slug, color, size = 24, className }) => {
    if (!slug) return <div className={`rounded-full bg-gray-500 ${className}`} style={{ width: size, height: size }} />;
    return (
        <img
            src={getIconUrl(slug, color)}
            alt={slug}
            width={size}
            height={size}
            className={className}
            style={{ filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.5))' }}
            onError={(e) => { e.target.style.display = 'none'; }}
        />
    );
};

const OpenAILikeLogo = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
        <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
    </svg>
);

// --- Components ---

const SystemDetailPanel = ({ system, onClose }) => {
    if (!system) return null;
    return (
        <div className="absolute top-20 right-4 bottom-4 w-96 bg-[#1a1a1a]/95 backdrop-blur-xl border border-[#333] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in slide-in-from-right-4 flex flex-col">
            <div className="p-6 border-b border-[#333] bg-[#222]/50">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-[#111] rounded-xl border border-[#333] shadow-inner">
                        <BrandLogo slug={system.iconSlug} color={system.color} size={32} />
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1 rounded hover:bg-[#333]"><X size={20} /></button>
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{system.name}</h2>
                <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#333] border border-[#444] text-[10px] font-mono text-gray-300 uppercase tracking-wider">{system.details?.type || 'Service'}</span>
                    <span className="flex items-center gap-1 text-[10px] text-green-400 font-medium"><CheckCircle size={10} /> Healthy</span>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#222] p-3 rounded-lg border border-[#333]"><div className="text-[10px] text-gray-500 uppercase mb-1">Sync</div><div className="text-sm text-white font-medium flex items-center gap-2"><RefreshCw size={12} className="text-blue-400" /> {system.details?.sync || 'Polling'}</div></div>
                    <div className="bg-[#222] p-3 rounded-lg border border-[#333]"><div className="text-[10px] text-gray-500 uppercase mb-1">Security</div><div className="text-sm text-white font-medium flex items-center gap-2"><Lock size={12} className="text-orange-400" /> High (PII)</div></div>
                </div>
                <div className="bg-[#222] p-4 rounded-lg border border-[#333]">
                    <div className="text-[10px] text-gray-500 uppercase mb-2 flex items-center gap-2"><FileText size={10} /> Mapped Fields</div>
                    <div className="space-y-1">
                        {system.details?.fields?.map(f => (
                            <div key={f} className="text-xs text-gray-300 font-mono px-2 py-1 bg-[#1a1a1a] rounded border border-[#333]">{f}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SearchResults = ({ query }) => {
    if (!query) return null;
    const integrationMatches = INTEGRATIONS.filter(i => i.source.includes(query.toLowerCase()) || i.target.includes(query.toLowerCase()));
    if (integrationMatches.length === 0) return null;
    return (
        <div className="absolute top-full mt-2 left-0 right-0 bg-[#1a1a1a] rounded-xl shadow-2xl border border-[#333] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
            <div className="max-h-64 overflow-y-auto custom-scrollbar p-2 space-y-1">
                {integrationMatches.map(match => (
                    <div key={match.id} className="flex items-center justify-between bg-[#2a2a2a] hover:bg-[#333] p-2 rounded-lg transition-colors cursor-pointer group">
                        <span className="text-gray-300 text-sm group-hover:text-white">{match.source} <span className="text-gray-600 mx-1">↔</span> {match.target}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SnowflakeExplorer = () => {
    const tables = [
        { name: "DIM_USERS", type: "TABLE", rows: "2.4M" },
        { name: "FACT_ORDERS", type: "TABLE", rows: "15.2M" },
        { name: "STG_STRIPE_CHARGES", type: "VIEW", rows: "N/A" },
        { name: "DIM_PRODUCTS", type: "TABLE", rows: "45K" }
    ];

    return (
        <div className="flex h-full bg-[#0a0a0a]">
            <div className="w-64 border-r border-[#333] bg-[#111] p-4 flex flex-col">
                <div className="mb-6">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Database</h3>
                    <div className="flex items-center gap-2 text-white font-mono text-sm p-2 bg-[#222] rounded border border-[#333]">
                        <Database size={14} className="text-blue-400" /> PROD_DB
                    </div>
                </div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tables</h3>
                <div className="flex-1 overflow-y-auto space-y-1">
                    {tables.map(t => (
                        <div key={t.name} className="flex items-center gap-2 p-2 hover:bg-[#222] rounded cursor-pointer text-gray-300 hover:text-white font-mono text-xs">
                            <TableIcon size={14} /> {t.name}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl font-bold text-white mb-4">Schema Preview</h2>
                    <div className="bg-[#111] border border-[#333] rounded p-8 text-center text-gray-500">
                        Select a table to view schema details.
                    </div>
                </div>
            </div>
        </div>
    )
};

const DirectoryView = ({ setSelectedSystem }) => {
    const [search, setSearch] = useState("");
    const filtered = ALL_SYSTEMS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="flex-1 bg-[#0a0a0a] p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Integrations Directory</h1>
                        <p className="text-gray-400">Manage and monitor all {ALL_SYSTEMS.length} connected systems.</p>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Filter systems..."
                            className="bg-[#1a1a1a] border border-[#333] rounded-full py-2 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(sys => (
                        <div key={sys.id} className="bg-[#111] border border-[#333] rounded-xl p-4 hover:border-[#555] transition-all cursor-pointer group" onClick={() => setSelectedSystem(sys)}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-[#1a1a1a] rounded-lg border border-[#333]">
                                    <BrandLogo slug={sys.iconSlug} color={sys.color} size={24} />
                                </div>
                                <span className="px-2 py-1 rounded bg-[#1a1a1a] text-[10px] font-bold text-gray-400 uppercase">{sys.category}</span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">{sys.name}</h3>
                            <div className="text-xs text-gray-500">{sys.details.type}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// --- ORGANIC VIEW COMPONENT (Stable, No Physics Jitter) ---
const OrbSystem = ({ setSelectedSystem }) => {
    const containerRef = useRef(null);
    const [draggedNodeId, setDraggedNodeId] = useState(null);

    const [viewport, setViewport] = useState({ x: 0, y: 0, k: 1 });
    const [isPanning, setIsPanning] = useState(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    // Initialize with Wide Grid to avoid initial "Pop"
    const [nodes, setNodes] = useState(ALL_SYSTEMS.map((node, i) => ({
        ...node,
        x: (i % 6) * 250 + 300,
        y: Math.floor(i / 6) * 200 + 200,
    })));

    // Handlers
    const handleWheel = (e) => {
        e.preventDefault();
        const zoomSensitivity = 0.001;
        const newK = Math.max(0.1, Math.min(5, viewport.k - e.deltaY * zoomSensitivity));
        setViewport(prev => ({ ...prev, k: newK }));
    };

    const handleMouseDown = (e) => {
        if (e.target === containerRef.current || e.target.tagName === 'svg') {
            setIsPanning(true);
            lastMousePos.current = { x: e.clientX, y: e.clientY };
        }
    };

    const handleNodePointerDown = (e, node) => {
        e.stopPropagation();
        e.target.setPointerCapture(e.pointerId);
        setDraggedNodeId(node.id);
    };

    const handleNodeDoubleClick = (e, node) => {
        e.stopPropagation();
        setSelectedSystem(node);
    }

    const handlePointerUp = (e) => {
        if (draggedNodeId) {
            if (e.target && typeof e.target.releasePointerCapture === 'function') {
                e.target.releasePointerCapture(e.pointerId);
            }
            setDraggedNodeId(null);
        }
        setIsPanning(false);
    };

    const handlePointerMove = (e) => {
        if (!containerRef.current) return;

        // Pan
        if (isPanning) {
            const dx = e.clientX - lastMousePos.current.x;
            const dy = e.clientY - lastMousePos.current.y;
            setViewport(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
            lastMousePos.current = { x: e.clientX, y: e.clientY };
            return;
        }

        // Drag Node
        if (draggedNodeId) {
            const rect = containerRef.current.getBoundingClientRect();
            const worldX = (e.clientX - rect.left - viewport.x) / viewport.k;
            const worldY = (e.clientY - rect.top - viewport.y) / viewport.k;

            setNodes(prev => prev.map(n => {
                if (n.id === draggedNodeId) {
                    return { ...n, x: worldX, y: worldY };
                }
                return n;
            }));
        }
    };

    const getConnections = () => {
        return INTEGRATIONS.map(integ => {
            const source = nodes.find(n => n.id === integ.source);
            const target = nodes.find(n => n.id === integ.target);
            if (!source || !target) return null;
            const isActive = integ.status === 'active' || integ.status === 'syncing';
            const isBidirectional = integ.direction === 'bidirectional';
            return (
                <g key={integ.id}>
                    <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke="#444" strokeWidth="2" />
                    {isActive && (
                        <>
                            <path id={`path-${integ.id}-fwd`} d={`M${source.x},${source.y} L${target.x},${target.y}`} className="hidden" />
                            <circle r="3" fill="#fff">
                                <animateMotion dur="3s" repeatCount="indefinite" calcMode="linear"><mpath href={`#path-${integ.id}-fwd`} /></animateMotion>
                            </circle>
                            {isBidirectional && (
                                <>
                                    <path id={`path-${integ.id}-rev`} d={`M${target.x},${target.y} L${source.x},${source.y}`} className="hidden" />
                                    <circle r="3" fill="#aaa">
                                        <animateMotion dur="3s" repeatCount="indefinite" calcMode="linear" begin="1.5s"><mpath href={`#path-${integ.id}-rev`} /></animateMotion>
                                    </circle>
                                </>
                            )}
                        </>
                    )}
                </g>
            );
        });
    };

    return (
        <div
            className="relative w-full h-full bg-black overflow-hidden cursor-crosshair"
            ref={containerRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-50">
                <button onClick={() => setViewport(p => ({ ...p, k: p.k * 1.2 }))} className="p-2 bg-[#1a1a1a] border border-[#333] rounded text-white hover:bg-[#333]"><Plus size={16} /></button>
                <button onClick={() => setViewport(p => ({ ...p, k: p.k * 0.8 }))} className="p-2 bg-[#1a1a1a] border border-[#333] rounded text-white hover:bg-[#333]"><Minus size={16} /></button>
            </div>
            <div style={{ transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.k})`, transformOrigin: '0 0', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                <svg className="absolute top-0 left-0 w-[5000px] h-[5000px] -top-[2000px] -left-[2000px] z-0 pointer-events-none overflow-visible">
                    {getConnections()}
                </svg>
                {nodes.map(node => {
                    return (
                        <div
                            key={node.id}
                            onPointerDown={(e) => handleNodePointerDown(e, node)}
                            onDoubleClick={(e) => handleNodeDoubleClick(e, node)}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing group z-10 select-none"
                            style={{ left: node.x, top: node.y }}
                        >
                            <div className="relative flex items-center justify-center transition-all duration-500 bg-[#1e1e1e] border-2 border-[#333] group-hover:border-gray-500 shadow-2xl rounded-full" style={{ width: node.r * 2, height: node.r * 2, borderColor: node.color }}>
                                {/* Glow Effect */}
                                <div className="absolute inset-0 rounded-full blur-xl" style={{ backgroundColor: node.color, opacity: 0.5, transform: 'scale(1.5)', zIndex: -1 }} />
                                <BrandLogo slug={node.iconSlug} color={node.color} size={node.r * 1.2} />
                                <div className="absolute top-full mt-3 text-[10px] font-bold uppercase tracking-wider bg-black/50 px-2 py-0.5 rounded text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{node.name}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- ARCHITECTURE DIAGRAM COMPONENT (Auto-Fitting Grid) ---
const ArchitectureView = ({ setSelectedSystem }) => {
    const containerRef = useRef(null);
    const [nodes, setNodes] = useState([]);
    const [zones, setZones] = useState([]);

    const calculateLayout = () => {
        if (!containerRef.current) return;
        const { width, height } = containerRef.current.getBoundingClientRect();
        const activeW = Math.max(width, 1400);
        const activeH = Math.max(height, 900);

        const ZONES = [
            { id: 'data', label: 'Data Infrastructure', x: 0.35, y: 0.05, w: 0.3, h: 0.2, color: '#f59e0b' },
            { id: 'core', label: 'Core Services', x: 0.35, y: 0.4, w: 0.3, h: 0.2, color: '#3b82f6' },
            { id: 'engineering', label: 'Engineering Stack', x: 0.02, y: 0.25, w: 0.25, h: 0.5, color: '#10b981' },
            { id: 'finance', label: 'Finance Systems', x: 0.73, y: 0.25, w: 0.25, h: 0.5, color: '#8b5cf6' },
            { id: 'growth', label: 'Growth & Marketing', x: 0.20, y: 0.75, w: 0.3, h: 0.2, color: '#ec4899' },
            { id: 'benefits', label: 'HR & Benefits', x: 0.55, y: 0.75, w: 0.25, h: 0.2, color: '#14b8a6' },
        ];

        const newZones = ZONES.map(z => ({
            ...z,
            absX: z.x * activeW,
            absY: z.y * activeH,
            absW: z.w * activeW,
            absH: z.h * activeH
        }));

        const newNodes = [];
        const categoryMap = { 'Data': 'data', 'Core': 'core', 'Engineering': 'engineering', 'Finance': 'finance', 'Growth': 'growth', 'Benefits': 'benefits' };

        ALL_SYSTEMS.forEach(sys => {
            const zoneId = categoryMap[sys.category];
            const zone = newZones.find(z => z.id === zoneId);
            if (zone) {
                const systemsInZone = ALL_SYSTEMS.filter(s => categoryMap[s.category] === zoneId).length;
                const indexInZone = newNodes.filter(n => n.zoneId === zoneId).length;
                const cols = Math.ceil(Math.sqrt(systemsInZone));
                const rows = Math.ceil(systemsInZone / cols);
                const col = indexInZone % cols;
                const row = Math.floor(indexInZone / cols);
                const cellW = zone.absW / cols;
                const cellH = zone.absH / rows;

                newNodes.push({
                    ...sys,
                    zoneId: zoneId,
                    x: zone.absX + (col * cellW) + (cellW / 2),
                    y: zone.absY + (row * cellH) + (cellH / 2),
                    w: Math.min(cellW * 0.9, 160),
                    h: Math.min(cellH * 0.8, 60)
                });
            }
        });
        setZones(newZones);
        setNodes(newNodes);
    };

    useEffect(() => {
        const handleResize = () => calculateLayout();
        window.addEventListener('resize', handleResize);
        setTimeout(calculateLayout, 50);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderConnections = () => {
        if (nodes.length === 0) return null;
        return INTEGRATIONS.map(integ => {
            const source = nodes.find(n => n.id === integ.source);
            const target = nodes.find(n => n.id === integ.target);
            if (!source || !target) return null;
            const sx = source.x;
            const sy = source.y;
            const tx = target.x;
            const ty = target.y;
            const midY = (sy + ty) / 2;
            const pathData = `M ${sx} ${sy} L ${sx} ${midY} L ${tx} ${midY} L ${tx} ${ty}`;
            const midX = (sx + tx) / 2;

            return (
                <g key={integ.id}>
                    <path d={pathData} stroke="#444" strokeWidth="2" fill="none" />
                    <circle cx={midX} cy={midY} r="3" fill="#666" />
                </g>
            )
        });
    };

    return (
        <div className="relative w-full h-full bg-[#0a0a0a] overflow-auto" ref={containerRef} onClick={() => setSelectedSystem(null)}>
            <div className="min-w-[1400px] min-h-[900px] w-full h-full relative">
                <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {zones.map(z => (
                        <g key={z.id}>
                            <rect x={z.absX} y={z.absY} width={z.absW} height={z.absH} fill={z.color} fillOpacity="0.05" stroke={z.color} strokeWidth="1" strokeDasharray="4 4" rx="8" />
                            <text x={z.absX + 10} y={z.absY - 10} fill={z.color} fontSize="11" fontWeight="bold" letterSpacing="1">{z.label.toUpperCase()}</text>
                        </g>
                    ))}
                    {renderConnections()}
                </svg>
                {nodes.map(node => (
                    <div key={node.id} onDoubleClick={(e) => { e.stopPropagation(); setSelectedSystem(node); }} className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-105 transition-transform duration-200 z-10" style={{ left: node.x, top: node.y, width: node.w, height: node.h }}>
                        <div className="w-full h-full bg-[#121212] border border-[#333] hover:border-white rounded-lg flex items-center px-3 gap-3 shadow-xl">
                            <div className="p-1.5 rounded bg-[#1a1a1a] border border-[#222]">
                                <BrandLogo slug={node.iconSlug} color={node.color} size={16} />
                            </div>
                            <span className="text-[11px] font-semibold text-gray-300 truncate">{node.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default function App() {
    const [activeTab, setActiveTab] = useState('flow');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSystem, setSelectedSystem] = useState(null);

    return (
        <div className="flex flex-col h-screen bg-black font-sans text-white selection:bg-[#444] selection:text-white">
            <header className="h-16 flex items-center justify-between px-6 z-50 border-b border-[#222] bg-[#0f0f0f]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#333] flex items-center justify-center shadow-lg">
                        <OpenAILikeLogo className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg text-white tracking-tight">OpenData</span>
                </div>
                <div className="relative group w-full max-w-xs">
                    <div className="relative">
                        <input type="text" placeholder="Search systems..." className="w-full bg-[#1a1a1a] text-white placeholder-gray-500 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-600 transition-all text-xs border border-[#333]" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-500" size={14} />
                    </div>
                    <SearchResults query={searchQuery} onClose={() => setSearchQuery('')} />
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#222] border border-[#333] flex items-center justify-center text-gray-400 text-xs font-bold hover:bg-[#333] cursor-pointer transition-colors">AU</div>
                </div>
            </header>

            <main className="flex-1 overflow-hidden relative">
                {activeTab === 'flow' && <OrbSystem setSelectedSystem={setSelectedSystem} />}
                {activeTab === 'diagram' && <ArchitectureView setSelectedSystem={setSelectedSystem} />}
                {activeTab === 'schema' && <SnowflakeExplorer />}
                {activeTab === 'directory' && <DirectoryView setSelectedSystem={setSelectedSystem} />}

                <div className="absolute top-6 right-6 z-50 flex bg-[#1a1a1a] rounded-lg border border-[#333] p-1 gap-1 shadow-xl">
                    <button onClick={() => setActiveTab('flow')} className={`p-2 rounded-md transition-all ${activeTab === 'flow' ? 'bg-[#333] text-white' : 'text-gray-500 hover:text-white'}`} title="Organic View"><Share2 size={16} /></button>
                    <button onClick={() => setActiveTab('diagram')} className={`p-2 rounded-md transition-all ${activeTab === 'diagram' ? 'bg-[#333] text-white' : 'text-gray-500 hover:text-white'}`} title="Architecture Diagram"><Network size={16} /></button>
                    <button onClick={() => setActiveTab('directory')} className={`p-2 rounded-md transition-all ${activeTab === 'directory' ? 'bg-[#333] text-white' : 'text-gray-500 hover:text-white'}`} title="Directory"><BookOpen size={16} /></button>
                    <div className="w-px h-4 bg-[#333] mx-1 self-center"></div>
                    <button onClick={() => setActiveTab('schema')} className={`p-2 rounded-md transition-all ${activeTab === 'schema' ? 'bg-[#333] text-blue-400' : 'text-gray-500 hover:text-blue-400'}`} title="View Snowflake Schema"><Database className="w-4 h-4" /></button>
                </div>

                {activeTab === 'schema' && (
                    <button onClick={() => setActiveTab('flow')} className="absolute top-6 right-6 z-50 px-4 py-2 bg-[#1a1a1a] rounded-lg border border-[#333] text-gray-300 text-sm hover:bg-[#222] transition-all shadow-lg flex items-center gap-2"><MapIcon size={14} /> Back to Map</button>
                )}

                <SystemDetailPanel system={selectedSystem} onClose={() => setSelectedSystem(null)} />
            </main>
        </div>
    );
}
