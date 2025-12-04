import { Database, Table as TableIcon } from 'lucide-react';

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

export default SnowflakeExplorer;
