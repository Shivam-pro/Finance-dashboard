import React, { useContext, useState } from "react";
import { Storecontext } from "../context/Storecontext";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className='h-full w-full dark:bg-(--primary) dark:text-(--text) py-5 pr-4 lg:pr-0 lg:p-0'>
      <h1 className="text-xl lg:text-2xl font-bold mb-6">Settings</h1>

      {/* Role Selector */}
      <div className="mb-6">
      </div>

      {/* Dark Mode Toggle */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Appearance:</label>
        <button
          onClick={() => {document.documentElement.classList.toggle('dark');
            darkMode ? setDarkMode(false):setDarkMode(true);
          }}
          className="dark:bg-(--bg) dark:text-(--text) px-4 py-2 rounded shadow-lg lg:text-lg text-sm"
        >
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </div>
  );
}

export default Settings;