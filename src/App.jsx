import { useState } from 'react';
import {
    Database,
    Share2,
    Network,
    BookOpen,
    Map as MapIcon,
    Search
} from 'lucide-react';

import OrbSystem from './components/OrbSystem';
import ArchitectureView from './components/ArchitectureView';
import SnowflakeExplorer from './components/SnowflakeExplorer';
import DirectoryView from './components/DirectoryView';
import SystemDetailPanel from './components/SystemDetailPanel';
import SearchResults from './components/SearchResults';

// --- Helper Component for Brand Logos ---
// (Moved to src/components/BrandLogo.jsx)

const OpenAILikeLogo = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
        <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
    </svg>
);

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
                    <SearchResults query={searchQuery} />
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
