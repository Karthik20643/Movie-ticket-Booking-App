import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminNavbar from '../../components/admin/AdminNavbar'

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <aside className="w-64 bg-[#0f0f11] border-r border-white/6 min-h-screen">
          <AdminSidebar />
        </aside>

        <div className="flex-1 min-h-screen flex flex-col">
          <AdminNavbar />
          <main className="p-6 flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout