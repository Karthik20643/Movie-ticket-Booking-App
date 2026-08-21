import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-white/6 bg-black">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-2xl font-bold text-pink-500">QuickShow</Link>
        <div className="text-sm text-gray-400">Admin Portal</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-300">Admin User</div>
      </div>
    </div>
  )
}

export default AdminNavbar