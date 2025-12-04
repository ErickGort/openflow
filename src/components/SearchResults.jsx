
import { INTEGRATIONS } from '../data/systems';

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

export default SearchResults;
