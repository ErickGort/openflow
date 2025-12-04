import { X, CheckCircle, RefreshCw, Lock, FileText } from 'lucide-react';
import BrandLogo from './BrandLogo';

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

export default SystemDetailPanel;
