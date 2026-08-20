import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">AU</div>
        <div>
          <div className="font-semibold">Admin User</div>
          <div className="text-sm text-gray-400">Administrator</div>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="flex flex-col gap-2">
          <li>
            <NavLink to="/admin" className={({isActive}) => `block px-3 py-2 rounded ${isActive ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-white/5'}`} end>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="add-shows" className={({isActive}) => `block px-3 py-2 rounded ${isActive ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-white/5'}`}>Add Shows</NavLink>
          </li>
          <li>
            <NavLink to="list-shows" className={({isActive}) => `block px-3 py-2 rounded ${isActive ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-white/5'}`}>List Shows</NavLink>
          </li>
          <li>
            <NavLink to="list-bookings" className={({isActive}) => `block px-3 py-2 rounded ${isActive ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-white/5'}`}>List Bookings</NavLink>
          </li>
        </ul>
      </nav>

      <div className="mt-auto text-xs text-gray-500">© QuickShow</div>
    </div>
  )
}

export default AdminSidebar