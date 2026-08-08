import React, { useState } from 'react';
import { useBuildora } from '../../store/buildoraContext';
import {
  Users,
  HardHat,
  ShieldCheck,
  Building,
  CheckCircle2,
  Search,
  Check,
  AlertCircle,
} from 'lucide-react';

export const OperationsPortal: React.FC = () => {
  const {
    employees,
    projects,
    serviceBookings,
    toggleUniformCheck,
    assignTeamLeader,
    updateBookingStatus,
  } = useBuildora();

  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTabSection, setActiveTabSection] = useState<'dispatch' | 'roster'>('dispatch');

  const departmentsList = [
    'All',
    'Civil & Masonry',
    'Plumbing & Drainage',
    'Electrical & Power',
    'Painting & Coating',
    'Carpentry & Woodwork',
    'Interior Design',
    'Architecture & Structural',
  ];

  const filteredEmployees = employees.filter((e) => {
    const matchesDept = selectedDeptFilter === 'All' || e.department === selectedDeptFilter;
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 lg:p-8 space-y-6 border-cyan-500/40 bg-gradient-to-r from-gray-900 via-cyan-950/20 to-black">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold">
              <Users className="w-4 h-4" />
              <span>BUILDORA CORPORATE OPERATIONS</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold font-heading text-white mt-2">
              Centralized Workforce Dispatch & Allocation
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              Manage in-house department rosters, audit employee uniform compliance, and assign Team Leaders to incoming customer bookings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="badge-cyan text-xs">Total Staff: {employees.length} Verified</span>
            <span className="badge-emerald text-xs">100% In-House</span>
          </div>
        </div>
      </div>

      {/* NAVIGATION SECTION TABS */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTabSection('dispatch')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTabSection === 'dispatch'
              ? 'bg-cyan-500 text-black shadow-md'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Building className="w-4 h-4" />
          Active Dispatch Queue ({serviceBookings.filter((b) => b.status === 'Requested').length + projects.length})
        </button>

        <button
          onClick={() => setActiveTabSection('roster')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTabSection === 'roster'
              ? 'bg-cyan-500 text-black shadow-md'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <HardHat className="w-4 h-4" />
          Workforce Directory & Uniform Compliance ({employees.length})
        </button>
      </div>

      {/* SECTION 1: DISPATCH QUEUE */}
      {activeTabSection === 'dispatch' && (
        <div className="space-y-8">
          
          {/* Construction Projects Dispatch */}
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading">Construction Projects Assignment</h3>

            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="glass-card-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-amber-500/20">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="badge-gold font-mono text-[10px]">{proj.id}</span>
                      <h4 className="text-base font-bold text-white font-heading">{proj.projectTitle}</h4>
                    </div>
                    <p className="text-xs text-gray-300">
                      Location: {proj.location} • Built-Up: {proj.builtUpAreaSqFt.toLocaleString()} sq. ft. • Total Budget: ₹{(proj.totalBudget / 100000).toFixed(1)}L
                    </p>
                    <div className="text-[11px] text-amber-400 font-mono">
                      Current Assigned Supervisor: <strong>{proj.assignedTeamLeader.name}</strong> ({proj.assignedTeamLeader.department})
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <select
                      value={proj.assignedTeamLeaderId}
                      onChange={(e) => assignTeamLeader(proj.id, e.target.value)}
                      className="bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-xs font-bold text-cyan-300 focus:border-cyan-500 focus:outline-none"
                    >
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.id} className="bg-gray-900 text-white">
                          Assign {emp.name} ({emp.department} - {emp.tier})
                        </option>
                      ))}
                    </select>
                    <span className="badge-emerald text-[10px]">Active Site</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Service Bookings Dispatch */}
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading">Home Service Bookings Dispatch Queue</h3>

            <div className="space-y-4">
              {serviceBookings.map((b) => (
                <div key={b.id} className="glass-card-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-cyan-500/20">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="badge-cyan font-mono text-[10px]">{b.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${b.status === 'Requested' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {b.status}
                      </span>
                      <h4 className="text-base font-bold text-white font-heading">{b.serviceTitle}</h4>
                    </div>
                    <p className="text-xs text-gray-300">
                      Customer: <strong>{b.customerName}</strong> ({b.customerPhone}) • Address: {b.customerAddress}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      Preferred Slot: {b.preferredDate} ({b.preferredSlot}) • Price: ₹{b.estimatedPrice}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {b.status === 'Requested' ? (
                      <button
                        onClick={() => updateBookingStatus(b.id, 'Assigned', 'Vikram Singh')}
                        className="btn-primary text-xs py-2 px-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                      >
                        Dispatch Buildora Team Lead
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Lead Dispatched ({b.assignedLeaderName || 'Rajesh Kumar'})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: WORKFORCE ROSTER & UNIFORM AUDIT */}
      {activeTabSection === 'roster' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search staff name or employee ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {departmentsList.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDeptFilter(dept)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedDeptFilter === dept
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((emp) => (
              <div key={emp.id} className="glass-panel p-6 space-y-4 hover:border-cyan-500/40">
                <div className="flex items-center gap-4">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-500/40"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="badge-cyan font-mono text-[9px]">{emp.id}</span>
                      <span className="text-[10px] font-bold text-amber-400 font-mono">★ {emp.rating}</span>
                    </div>
                    <h4 className="text-base font-bold text-white font-heading mt-0.5">{emp.name}</h4>
                    <p className="text-xs text-cyan-300 font-mono">{emp.department}</p>
                    <p className="text-[11px] text-gray-400">{emp.role} • {emp.experienceYears} Yrs Exp</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-gray-400 font-bold uppercase">Uniform & Safety Checklist</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified Staff
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-[11px] text-gray-300">
                    <button
                      onClick={() => toggleUniformCheck(emp.id, 'safetyHelmet')}
                      className={`p-1.5 rounded text-left flex items-center justify-between border transition-all ${
                        emp.uniformChecklist.safetyHelmet
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                          : 'bg-red-500/10 border-red-500/40 text-red-400'
                      }`}
                    >
                      <span>Safety Helmet</span>
                      {emp.uniformChecklist.safetyHelmet ? <Check className="w-3 h-3 text-emerald-400" /> : <AlertCircle className="w-3 h-3 text-red-400" />}
                    </button>

                    <button
                      onClick={() => toggleUniformCheck(emp.id, 'companyJacket')}
                      className={`p-1.5 rounded text-left flex items-center justify-between border transition-all ${
                        emp.uniformChecklist.companyJacket
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                          : 'bg-red-500/10 border-red-500/40 text-red-400'
                      }`}
                    >
                      <span>Buildora Jacket</span>
                      {emp.uniformChecklist.companyJacket ? <Check className="w-3 h-3 text-emerald-400" /> : <AlertCircle className="w-3 h-3 text-red-400" />}
                    </button>

                    <button
                      onClick={() => toggleUniformCheck(emp.id, 'safetyShoes')}
                      className={`p-1.5 rounded text-left flex items-center justify-between border transition-all ${
                        emp.uniformChecklist.safetyShoes
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                          : 'bg-red-500/10 border-red-500/40 text-red-400'
                      }`}
                    >
                      <span>Steel Shoes</span>
                      {emp.uniformChecklist.safetyShoes ? <Check className="w-3 h-3 text-emerald-400" /> : <AlertCircle className="w-3 h-3 text-red-400" />}
                    </button>

                    <button
                      onClick={() => toggleUniformCheck(emp.id, 'idCard')}
                      className={`p-1.5 rounded text-left flex items-center justify-between border transition-all ${
                        emp.uniformChecklist.idCard
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                          : 'bg-red-500/10 border-red-500/40 text-red-400'
                      }`}
                    >
                      <span>Digital ID Card</span>
                      {emp.uniformChecklist.idCard ? <Check className="w-3 h-3 text-emerald-400" /> : <AlertCircle className="w-3 h-3 text-red-400" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                  <span>Attendance: <strong className="text-white">{emp.attendanceRate}%</strong></span>
                  <span>Completed: <strong className="text-amber-400">{emp.completedProjects} Sites</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
