import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { assets } from './assets/assets';
import Dashboard from './Components/Dashboard';
import Transactions from './Components/Transactions';
import Analytics from './Components/Analytics'
import Goals from './Components/Goals';
import Settings from './Components/Settings';
import { useContext } from 'react';
import { Storecontext } from './context/Storecontext.jsx';

function App() {
  const { role, setRole, focus, setFocus, navigate } = useContext(Storecontext);
  return (
    <div className='h-screen'>
      <div className={`flex dark:bg-(--bg) dark:text-(--text-h) justify-between items-center px-5 py-2 w-full`}>
        <div className='flex items-center'>
          <img className='h-10 w-10 lg:h-12 lg:w-12' src={assets.logo} alt="" />
          <h1 className='text-sm lg:text-lg'>Finance</h1>
        </div>
        <div className='flex gap-2'>
          <select name="role" id="role" value={role} className='lg:text-lg text-sm outline-none dark:bg-(--bg) rounded-lg h-fit py-1 px-2' onChange={(e) => setRole(e.target.value)}>
            <option value="view">View</option>
            <option value="admin">Admin</option>
          </select>
          {role === "admin" && focus !== "transaction" && <h1 className='bg-green-600 text-sm lg:text-lg py-1 px-3 rounded-lg cursor-pointer' onClick={() => { navigate('/transaction'); setFocus("transaction") }}>+ Add Transaction</h1>}
        </div>
      </div>
      <div className={`flex dark:bg-(--primary) md:p-8 lg:p-8 gap-4 lg:gap-8 h-[calc(100%-64px)] overflow-scroll`}>
        <div className='w-15 md:w-15 lg:w-[25%] dark:bg-(--code-bg) dark:text-(--text-h) lg:rounded-lg h-full'>
          <div className={`flex items-center gap-2 my-2 hover:dark:bg-(--primary) cursor-pointer py-3 px-5 ${focus === "dashboard" && "focus: dark:bg-(--primary)"}`} onClick={() => { navigate("/"); setFocus("dashboard") }}>
            <i className="fa-brands fa-microsoft dark:text-(--text-h) text-xl"></i>
            <h1 className='text-lg hidden lg:block'>Dashboard</h1>
          </div>
          <div className={`flex items-center gap-2 my-2 hover:dark:bg-(--primary) hover:dark:text-(--text-h) cursor-pointer py-3 px-5 ${focus === "transaction" && "focus: dark:bg-(--primary)"}`} onClick={() => { navigate("/transaction"); setFocus("transaction") }}>
            <i className="fa-solid fa-arrow-right-arrow-left dark:text-(--text-h) text-xl"></i>
            <h1 className='text-lg hidden lg:block'>Transactions</h1>
          </div>
          <div className={`flex items-center gap-2 my-2 hover:dark:bg-(--primary) cursor-pointer py-3 px-5 ${focus === "analytic" && "focus: dark:bg-(--primary)"}`} onClick={() => { navigate("/analytics"); setFocus("analytic") }}>
            <i className="fa-solid fa-chart-line dark:text-(--text-h) text-xl"></i>
            <h1 className='text-lg hidden lg:block '>Analytics</h1>
          </div>
          <div className={`flex items-center gap-2 my-2 hover:dark:bg-(--primary) cursor-pointer py-3 px-5 ${focus === "goals" && "focus: dark:bg-(--primary)"}`} onClick={() => { navigate("/goals"); setFocus("goals") }}>
            <i className="fa-solid fa-bullseye text-xl dark:text-(--text-h)"></i>
            <h1 className='text-lg hidden lg:block'>Goals & Alerts</h1>
          </div>
          <div className={`flex items-center gap-2 my-2 hover:dark:bg-(--primary) cursor-pointer py-3 px-5 ${focus === "settings" && "focus: dark:bg-(--primary)"}`} onClick={() => { navigate("/settings"); setFocus("settings") }}>
            <i className="fa-solid fa-gear text-xl dark:text-(--text-h)"></i>
            <h1 className='text-lg hidden lg:block'>Settings</h1>
          </div>
        </div>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/transaction' element={<Transactions />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/goals' element={<Goals />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
