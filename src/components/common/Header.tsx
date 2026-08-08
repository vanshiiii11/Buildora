import React from 'react';
import { useBuildora } from '../../store/buildoraContext';
import type { TabType } from '../../store/buildoraContext';
import type { UserRole } from '../../types/buildora';
import {
  Building2,
  Sliders,
  Calculator,
  Wrench,
  LayoutDashboard,
  HardHat,
  Users,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { role, setRole, activeTab, setActiveTab, projects } = useBuildora();

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'team_leader') {
      setActiveTab('team_leader_portal');
    } else if (newRole === 'operations') {
      setActiveTab('operations_portal');
    } else if (newRole === 'admin') {
      setActiveTab('admin_dashboard');
    } else {
      setActiveTab('home');
    }
  };

  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Overview', icon: Building2 },
    { id: 'package_builder', label: 'Package Builder', icon: Sliders },
    { id: 'ai_estimator', label: 'AI Cost Estimator', icon: Calculator },
    { id: 'services', label: 'Home Services', icon: Wrench },
    { id: 'customer_dashboard', label: 'My Project', icon: LayoutDashboard },
  ];

  const roleConfigs: { id: UserRole; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'customer', label: 'Customer', icon: Building2 },
    { id: 'team_leader', label: 'Team Leader', icon: HardHat },
    { id: 'operations', label: 'Operations Manager', icon: Users },
    { id: 'admin', label: 'Admin Console', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0b0f19]/90 backdrop-blur-xl border-b border-white/10 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center justify-between">
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight font-heading gradient-text-gold">
                  BUILDORA
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Verified
                </span>
              </div>
              <p className="text-[11px] text-gray-400 tracking-wide font-medium">
                One Team. One Vision. One Perfect Home.
              </p>
            </div>
          </div>

          {/* Mobile Role Badge */}
          <div className="md:hidden">
            <span className="badge-gold font-mono text-[10px]">
              Role: {role.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>

        {/* Customer Navigation Tabs */}
        {role === 'customer' && (
          <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
                  {item.label}
                  {item.id === 'customer_dashboard' && projects.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* Internal Role Views Navigation */}
        {role !== 'customer' && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-amber-400 font-mono font-semibold bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Internal Portal Active: {role.replace('_', ' ').toUpperCase()}
            </span>
            <button
              onClick={() => handleRoleChange('customer')}
              className="text-xs text-gray-300 hover:text-white underline flex items-center gap-1"
            >
              Back to Customer View <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Interactive Role Switcher Selector */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-2xl border border-white/10">
          {roleConfigs.map((r) => {
            const Icon = r.icon;
            const isSelected = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => handleRoleChange(r.id)}
                title={`Switch to ${r.label} View`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md font-bold'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{r.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
