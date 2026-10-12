import React from 'react';
import { useBuildora } from '../../store/buildoraContext';
import { DEPARTMENTS_DATA } from '../../data/mockData';
import {
  ShieldCheck,
  TrendingUp,
  Building,
  Users,
  Award,
  DollarSign,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { projects, employees } = useBuildora();

  const totalRevenue = projects.reduce((acc, p) => acc + p.totalBudget, 0);
  const totalPaid = projects.reduce((acc, p) => acc + p.paidAmount, 0);
  const activeProjectsCount = projects.length;
  const workforceCount = employees.length;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 pb-20">
      {/* Header Banner */}
      <div className="glass-panel p-6 lg:p-8 space-y-4 border-amber-500/40 bg-gradient-to-r from-gray-900 via-amber-950/30 to-black">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>EXECUTIVE CORPORATE CONTROL PANEL</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold font-heading text-white mt-2">
              Buildora Company Operations & Analytics
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              High-level overview of enterprise revenues, active construction sites, department performance, and quality compliance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="badge-gold font-mono">SYSTEM LIVE</span>
          </div>
        </div>
      </div>

      {/* KPI METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-panel p-6 space-y-2 border-amber-500/30">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase">
            <span>Gross Contracted Value</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold font-heading gradient-text-gold">
            ₹{(totalRevenue / 10000000).toFixed(2)} Cr
          </div>
          <p className="text-xs text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Collected: ₹{(totalPaid / 100000).toFixed(1)} Lakhs
          </p>
        </div>

        <div className="glass-panel p-6 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase">
            <span>Active Turnkey Sites</span>
            <Building className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold font-heading text-white">
            {activeProjectsCount} Projects
          </div>
          <p className="text-xs text-gray-400">100% Managed On-Time</p>
        </div>

        <div className="glass-panel p-6 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase">
            <span>Verified Workforce</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold font-heading text-emerald-400">
            {workforceCount} Craftsmen
          </div>
          <p className="text-xs text-gray-400">99.1% Uniform & Safety Compliance</p>
        </div>

        <div className="glass-panel p-6 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400 font-semibold uppercase">
            <span>Customer Satisfaction</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold font-heading text-amber-400">
            4.95 / 5
          </div>
          <p className="text-xs text-gray-400">Based on 1,420 Site Audits</p>
        </div>
      </div>

      {/* DEPARTMENT PERFORMANCE TABLE */}
      <div className="glass-panel p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white font-heading">Department Performance & Manpower Metrics</h3>
          <span className="text-xs text-gray-400">Buildora Internal Organizations</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-gray-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4">Department Name</th>
                <th className="py-3 px-4">Department Lead</th>
                <th className="py-3 px-4">Team Leaders</th>
                <th className="py-3 px-4">Skilled Craftsmen</th>
                <th className="py-3 px-4">Active Projects</th>
                <th className="py-3 px-4">Audit Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {DEPARTMENTS_DATA.map((dept, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{dept.name}</td>
                  <td className="py-3.5 px-4 flex items-center gap-2">
                    <img src={dept.leadAvatar} alt={dept.leadName} className="w-6 h-6 rounded-full object-cover border border-amber-500/30" />
                    <span>{dept.leadName}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono">{dept.teamLeaderCount} Leaders</td>
                  <td className="py-3.5 px-4 font-mono">{dept.skilledWorkerCount} Workers</td>
                  <td className="py-3.5 px-4 font-bold text-cyan-400">{dept.activeProjects} Sites</td>
                  <td className="py-3.5 px-4 font-bold text-amber-400 font-mono">★ {dept.satisfactionRating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SYSTEM QUALITY CONTROL & AUDIT TRAIL */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-white font-heading">Real-Time Enterprise Audit Stream</h3>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Site Log Published for <strong className="text-white">Emerald Heights Luxury Villa (PROJ-901)</strong> by Rajesh Kumar</span>
            </span>
            <span className="text-gray-400 font-mono text-[10px]">Today, 17:30 IST</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Service Booking <strong className="text-white">BK-1001 (Plumbing Repair)</strong> assigned to Team Lead Vikram Singh</span>
            </span>
            <span className="text-gray-400 font-mono text-[10px]">Today, 14:15 IST</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Milestone Payment ₹37,000,000 received for <strong className="text-white">PROJ-901 Ground Floor Slab</strong></span>
            </span>
            <span className="text-gray-400 font-mono text-[10px]">Yesterday, 11:20 IST</span>
          </div>
        </div>
      </div>
    </div>
  );
};
