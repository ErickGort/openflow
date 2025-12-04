import { useState, useEffect, useRef } from 'react';
import { ALL_SYSTEMS, INTEGRATIONS } from '../data/systems';
import BrandLogo from './BrandLogo';

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

export default ArchitectureView;
