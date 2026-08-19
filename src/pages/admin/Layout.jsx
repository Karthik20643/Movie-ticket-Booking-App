import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Admin</h1>
        <nav className="mt-3 flex gap-3">
          <Link to="/admin" className="text-sm text-gray-300">Dashboard</Link>
          <Link to="add-shows" className="text-sm text-gray-300">Add Shows</Link>
          <Link to="list-shows" className="text-sm text-gray-300">List Shows</Link>
          <Link to="list-bookings" className="text-sm text-gray-300">List Bookings</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout