import { useState } from 'react';
import { Search } from 'lucide-react';
import { ALL_SYSTEMS } from '../data/systems';
import BrandLogo from './BrandLogo';

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

export default DirectoryView;
