import React from 'react'
import chartIcon from '../../assets/chartIcon.svg'

const StatCard = ({ title, value, icon, accent }) => (
	<div className="flex-1 min-w-[200px]">
		<div className={`p-4 rounded-lg bg-gradient-to-br ${accent} border border-white/5 flex items-center justify-between`}>
			<div>
				<div className="text-sm text-gray-300">{title}</div>
				<div className="text-2xl font-semibold text-white mt-2">{value}</div>
			</div>
			<div className="w-12 h-12 rounded-full bg-white/6 flex items-center justify-center">
				{icon}
			</div>
		</div>
	</div>
)

const IconChart = () => (
	<img src={chartIcon} alt="chart" className="w-6 h-6" />
)

const IconDollar = () => (
	<svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
		<path d="M12 1v22" stroke="#E6E6E6" strokeWidth="1.5" strokeLinecap="round" />
		<path d="M17 6H9.5a2.5 2.5 0 000 5H15a2.5 2.5 0 010 5H6" stroke="#E6E6E6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
)

const IconPlay = () => (
	<svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
		<path d="M5 3v18l15-9L5 3z" stroke="#E6E6E6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
)

const IconUsers = () => (
	<svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
		<path d="M17 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" stroke="#E6E6E6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<circle cx="12" cy="7" r="4" stroke="#E6E6E6" strokeWidth="1.5" />
	</svg>
)

const AdminDashboard = () => {
	return (
		<div>
			<div className="flex items-center gap-4 mb-6">
				<h2 className="text-2xl font-semibold text-white">Admin <span className="text-red-400 ml-2">Dashboard</span></h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<StatCard title="Total Bookings" value="14" icon={<IconChart />} accent="from-red-800 to-red-700" />
				<StatCard title="Total Revenue" value="$1517" icon={<IconDollar />} accent="from-rose-800 to-rose-700" />
				<StatCard title="Active Shows" value="6" icon={<IconPlay />} accent="from-pink-800 to-pink-700" />
				<StatCard title="Total Users" value="5" icon={<IconUsers />} accent="from-slate-800 to-slate-700" />
			</div>
		</div>
	)
}

export default AdminDashboard
