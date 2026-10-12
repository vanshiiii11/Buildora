import React, { useState } from 'react';
import { useBuildora } from '../../store/buildoraContext';
import {
  ShieldCheck,
  DollarSign,
  TrendingUp,
  Camera,
  Layers,
  HardHat,
  Clock,
  CheckCircle2,
  UserCheck,
} from 'lucide-react';

export const CustomerProjectDashboard: React.FC = () => {
  const { projects, activeProject, setActiveProjectId } = useBuildora();

  const [activeTabSection, setActiveTabSection] = useState<'timeline' | 'daily_logs' | 'team'>('timeline');

  if (!activeProject) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">No Active Projects Found</h2>
        <p className="text-gray-400">Use the Dynamic Package Builder to configure and launch your home project!</p>
      </div>
    );
  }

  const targetDateObj = new Date(activeProject.estimatedCompletionDate);
  const nowObj = new Date();
  const diffTime = targetDateObj.getTime() - nowObj.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Top Project Selector & Header */}
      <div className="glass-panel p-6 lg:p-8 space-y-6 border-amber-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge-gold font-mono text-[10px]">{activeProject.id}</span>
              <span className="badge-emerald">{activeProject.status}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold font-heading text-white mt-1">
              {activeProject.projectTitle}
            </h1>
            <p className="text-xs text-gray-300 mt-1 flex items-center gap-2">
              <span>{activeProject.propertyType}</span> • <span>{activeProject.location}</span> • <span>{activeProject.builtUpAreaSqFt.toLocaleString()} Sq. Ft.</span>
            </p>
          </div>

          {/* Project Switcher Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-semibold whitespace-nowrap">Switch Project:</span>
            <select
              value={activeProject.id}
              onChange={(e) => setActiveProjectId(e.target.value)}
              className="bg-black/50 border border-white/20 rounded-xl px-3.5 py-2 text-xs font-bold text-amber-400 focus:border-amber-500 focus:outline-none"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.projectTitle} ({p.id})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Overall Progress
            </div>
            <div className="text-2xl font-extrabold font-heading text-amber-400">{activeProject.overallProgress}%</div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-1">
              <div style={{ width: `${activeProject.overallProgress}%` }} className="bg-amber-500 h-full" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" /> Timeline Gauge
            </div>
            <div className="text-2xl font-extrabold font-heading text-white">{daysRemaining} Days</div>
            <div className="text-[10px] text-gray-400">Est Handover: {activeProject.estimatedCompletionDate}</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Budget Utilization
            </div>
            <div className="text-2xl font-extrabold font-heading text-emerald-400">
              ₹{(activeProject.paidAmount / 100000).toFixed(1)}L / ₹{(activeProject.totalBudget / 100000).toFixed(1)}L
            </div>
            <div className="text-[10px] text-gray-400">Paid: {Math.round((activeProject.paidAmount / activeProject.totalBudget) * 100)}%</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
            <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Buildora Team Lead
            </div>
            <div className="text-sm font-bold text-white truncate">{activeProject.assignedTeamLeader.name}</div>
            <div className="text-[10px] text-gray-300 font-mono">★ {activeProject.assignedTeamLeader.rating} • {activeProject.assignedTeamLeader.department}</div>
          </div>
        </div>
      </div>

      {/* DASHBOARD TAB NAVIGATION */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTabSection('timeline')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTabSection === 'timeline'
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers className="w-4 h-4" />
          Construction Milestones ({activeProject.milestones.length})
        </button>

        <button
          onClick={() => setActiveTabSection('daily_logs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTabSection === 'daily_logs'
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Camera className="w-4 h-4" />
          Live Daily Site Logs ({activeProject.dailyLogs.length})
        </button>

        <button
          onClick={() => setActiveTabSection('team')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTabSection === 'team'
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <HardHat className="w-4 h-4" />
          Assigned Buildora Team
        </button>
      </div>

      {/* SECTION 1: MILESTONE TIMELINE */}
      {activeTabSection === 'timeline' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading">Project Execution Timeline & Payment Milestones</h3>

            <div className="relative border-l-2 border-amber-500/30 ml-4 pl-6 space-y-8">
              {activeProject.milestones.map((m, idx) => (
                <div key={m.id} className="relative space-y-3">
                  <div
                    className={`absolute -left-[35px] top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      m.status === 'completed'
                        ? 'bg-emerald-500 border-emerald-400 text-black'
                        : m.status === 'in_progress'
                        ? 'bg-amber-500 border-amber-300 text-black animate-pulse'
                        : 'bg-gray-800 border-gray-600 text-gray-500'
                    }`}
                  >
                    {m.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-black" />}
                    {m.status === 'in_progress' && <span className="w-2 h-2 rounded-full bg-black" />}
                    {m.status === 'upcoming' && <span className="text-[10px] font-bold">{idx + 1}</span>}
                  </div>

                  <div className="glass-card-sm p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white font-heading">{m.title}</h4>
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              m.status === 'completed'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : m.status === 'in_progress'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                : 'bg-white/5 text-gray-400'
                            }`}
                          >
                            {m.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 mt-1">{m.description}</p>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <div className="text-sm font-extrabold text-amber-400 font-mono">₹{m.paymentAmount.toLocaleString('en-IN')}</div>
                        <span
                          className={`text-[10px] font-bold ${
                            m.paymentStatus === 'paid'
                              ? 'text-emerald-400'
                              : m.paymentStatus === 'due'
                              ? 'text-amber-400 underline'
                              : 'text-gray-400'
                          }`}
                        >
                          Payment: {m.paymentStatus.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/5">
                      <span>Target Date: {m.targetDate}</span>
                      {m.completedDate && <span className="text-emerald-400 font-semibold">Completed On: {m.completedDate}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: DAILY SITE LOGS FEED */}
      {activeTabSection === 'daily_logs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white font-heading">On-Site Progress Photos & Verified Team Logs</h3>
            <span className="text-xs text-gray-400">Updated Daily by Team Leader</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {activeProject.dailyLogs.map((log) => (
              <div key={log.id} className="glass-panel overflow-hidden border-amber-500/20 space-y-4">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={log.photoUrl}
                    alt={log.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="badge-gold font-mono text-[10px]">{log.date} • {log.time}</span>
                    <span className="badge-emerald text-[10px]">{log.weatherCondition}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 px-2.5 py-1 rounded-lg text-[10px] text-amber-400 font-mono border border-white/10">
                    Workers On Site: {log.workersOnSite}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <img
                      src={log.authorAvatar}
                      alt={log.authorName}
                      className="w-9 h-9 rounded-full object-cover border border-amber-500/40"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{log.authorName}</div>
                      <div className="text-[10px] text-amber-400 font-mono">{log.authorRole}</div>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white font-heading">{log.title}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">{log.notes}</p>

                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-white/10">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" /> Safety Audit Passed
                    </span>
                    <span className="flex items-center gap-1 text-amber-400 font-semibold">
                      <UserCheck className="w-3.5 h-3.5" /> Uniforms Verified
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: ASSIGNED BUILDORA TEAM */}
      {activeTabSection === 'team' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 lg:p-8 space-y-6 border-amber-500/30">
            <div className="flex items-center justify-between">
              <div>
                <span className="badge-gold">Direct Company Workforce</span>
                <h3 className="text-2xl font-bold text-white font-heading mt-1">Assigned Buildora Team Leaders</h3>
              </div>
              <span className="text-xs text-gray-400">Zero Unverified Third-Party Contractors</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card-sm p-6 space-y-4 border-amber-500/40 bg-amber-500/5">
                <div className="flex items-start gap-4">
                  <img
                    src={activeProject.assignedTeamLeader.avatar}
                    alt={activeProject.assignedTeamLeader.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/50"
                  />
                  <div>
                    <span className="badge-gold text-[9px]">Primary Site Supervisor</span>
                    <h4 className="text-xl font-bold text-white font-heading mt-0.5">{activeProject.assignedTeamLeader.name}</h4>
                    <p className="text-xs text-amber-400 font-mono">{activeProject.assignedTeamLeader.department} Lead</p>
                    <p className="text-xs text-gray-300 mt-1">{activeProject.assignedTeamLeader.experienceYears} Years Experience • ★ {activeProject.assignedTeamLeader.rating} Rating</p>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                  <div className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Uniform & Safety Verification Checklist:</div>
                  <div className="grid grid-cols-2 gap-2 text-gray-200">
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Safety Helmet</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Buildora Jacket</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Steel-Toe Shoes</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Digital QR ID Card</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
