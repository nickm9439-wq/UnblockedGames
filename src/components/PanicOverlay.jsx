import React, { useState } from 'react';
import { FileText, Check } from 'lucide-react';

export const PanicOverlay = ({ onClose }) => {
  const [docText, setDocText] = useState(
    `AP US History - Chapter 14: Industrialization & Urbanization\n\n1. Executive Summary\nThe late 19th century witnessed an unprecedented expansion of manufacturing, railway transportation, and urban infrastructure in North America. Rapid technological innovations led to major structural shifts in trade, labor organization, and municipal policy.\n\n2. Primary Themes & Key Terms\n- Transcontinental Railroad Expansion (1869)\n- Bessemer Steel Process and Industrial Metallurgy\n- Vertical and Horizontal Integration Business Models\n- Urban Population Growth and Municipal Infrastructure\n\n3. Critical Analysis & Study Notes\nIndustrial capitalism accelerated wealth accumulation while posing questions regarding worker protections, agrarian reform, and market regulation. Modern historians emphasize the interplay between technological efficiency and social reform movements.`
  );

  return (
    <div className="fixed inset-0 z-[99999] bg-[#f8f9fa] text-[#202124] flex flex-col font-sans select-text">
      {/* Google Docs Style Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl shadow-sm">
            <FileText size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                defaultValue="AP US History - Notes Chapter 14"
                className="font-medium text-gray-800 text-lg hover:bg-gray-100 px-2 py-0.5 rounded border border-transparent focus:border-blue-500 focus:outline-none"
              />
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Saved to Drive</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
              <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">File</span>
              <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Edit</span>
              <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">View</span>
              <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Insert</span>
              <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Format</span>
              <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Tools</span>
              <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Extensions</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onClose}
            title="Exit Stealth Mode (or press ~ / Esc)"
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
          >
            <Check size={14} /> Resume Arcade (Esc)
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-[#edf2fc] border-b border-gray-200 px-4 py-1.5 flex items-center gap-2 text-xs text-gray-700 overflow-x-auto">
        <select className="bg-white border border-gray-300 rounded px-2 py-1 text-xs">
          <option>Normal text</option>
          <option>Title</option>
          <option>Heading 1</option>
        </select>
        <select className="bg-white border border-gray-300 rounded px-2 py-1 text-xs">
          <option>Arial</option>
          <option>Times New Roman</option>
        </select>
        <div className="h-4 w-px bg-gray-300 mx-1" />
        <button className="p-1 hover:bg-gray-200 rounded font-bold">B</button>
        <button className="p-1 hover:bg-gray-200 rounded italic">I</button>
        <button className="p-1 hover:bg-gray-200 rounded underline">U</button>
      </div>

      {/* Document Canvas Container */}
      <div className="flex-1 bg-[#f1f3f4] p-8 overflow-y-auto flex justify-center">
        <div className="bg-white w-full max-w-[800px] min-h-[900px] p-12 shadow-md border border-gray-200 rounded-sm">
          <textarea
            value={docText}
            onChange={(e) => setDocText(e.target.value)}
            className="w-full h-full min-h-[800px] resize-none outline-none font-serif text-gray-800 text-base leading-relaxed bg-transparent"
          />
        </div>
      </div>

      {/* Stealth Return Ribbon */}
      <div className="fixed bottom-3 right-3 bg-gray-900/90 text-white text-xs px-3 py-2 rounded-lg shadow-xl backdrop-blur-md flex items-center gap-2 border border-gray-700">
        <span className="text-gray-400">Stealth Mode Active</span>
        <button
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold"
        >
          Exit (Esc / ~)
        </button>
      </div>
    </div>
  );
};
