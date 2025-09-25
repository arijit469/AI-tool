import React, { useState } from "react";
import { Menu, X } from "lucide-react";

function RecentSearch({ history, setQuestion, clearHistory, darkmode, setDarkmode }) {
  const [isOpen, setIsOpen] = useState(false);

  const bgMain = darkmode === "dark" ? "bg-zinc-900" : "bg-gray-100";
  const bgItem =
    darkmode === "dark"
      ? "bg-zinc-800 hover:bg-zinc-700 text-white"
      : "bg-white hover:bg-gray-200 text-black";
  const textColor = darkmode === "dark" ? "text-gray-400" : "text-gray-700";
  const buttonHover =
    darkmode === "dark" ? "hover:bg-zinc-800" : "hover:bg-gray-200";

  const uniqueHistory = Array.from(new Set(history)).slice(0, 20);

  return (
    <>
      <div className="lg:hidden flex items-center justify-between bg-zinc-800 text-white p-4">
        <button onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
        <h1 className="font-bold text-lg">ARIX & XEN</h1>
      </div>

      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-auto lg:w-full max-w-xs lg:max-w-none
          h-full lg:h-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className={`h-full flex flex-col ${bgMain} p-4 overflow-y-auto`}>
          {/* Close button (mobile only) */}
          <div className="flex justify-between items-center lg:hidden mb-5">
            <h1 className="text-xl font-bold">Menu</h1>
            <button onClick={() => setIsOpen(false)}>
              <X size={28} />
            </button>
          </div>

          {/* Title */}
          <h1 className="hidden lg:block text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-violet-700">
            ARIX & XEN
          </h1>

          {/* History header + clear */}
          <div className="flex items-center justify-between mb-3">
            <h2 className={`text-xl font-semibold ${textColor}`}>
              Recent Search
            </h2>
            <button
              onClick={clearHistory}
              className={`${buttonHover} cursor-pointer p-2 rounded-lg transition`}
            >
              🗑
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {uniqueHistory.length > 0 ? (
              uniqueHistory.map((item, index) => (
                <li
                  key={index}
                  className={`${bgItem} p-2 rounded-lg cursor-pointer transition`}
                  onClick={() => setQuestion(item)}
                >
                  {item}
                </li>
              ))
            ) : (
              <p className={`${textColor}`}>No history yet.</p>
            )}
          </ul>

          <div className="mt-auto p-5">
            <select
              value={darkmode}
              onChange={(e) => setDarkmode(e.target.value)}
              className={`p-2 rounded-lg border ${
                darkmode === "dark"
                  ? "bg-zinc-800 text-white border-gray-700"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default RecentSearch;
