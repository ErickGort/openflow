import { useState, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { ALL_SYSTEMS, INTEGRATIONS } from '../data/systems';
import BrandLogo from './BrandLogo';

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

export default OrbSystem;
