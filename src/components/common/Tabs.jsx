import React from "react";

function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center mb-6">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`px-8 py-2 text-lg font-medium transition-all divide-gray-300 ${
            activeTab === index
              ? "bg-[#A40000] text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setActiveTab(index)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
