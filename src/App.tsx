import React from 'react';
import { BuildoraProvider, useBuildora } from './store/buildoraContext';
import { Header } from './components/common/Header';
import { LandingPage } from './components/landing/LandingPage';
import { DynamicPackageBuilder } from './components/package-builder/DynamicPackageBuilder';
import { AICostEstimator } from './components/estimator/AICostEstimator';
import { HomeServicesCatalog } from './components/services/HomeServicesCatalog';
import { CustomerProjectDashboard } from './components/dashboard/CustomerProjectDashboard';
import { TeamLeaderPortal } from './components/team-leader/TeamLeaderPortal';
import { OperationsPortal } from './components/operations/OperationsPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Building2, ShieldCheck } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab } = useBuildora();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <LandingPage />;
      case 'package_builder':
        return <DynamicPackageBuilder />;
      case 'ai_estimator':
        return <AICostEstimator />;
      case 'services':
        return <HomeServicesCatalog />;
      case 'customer_dashboard':
        return <CustomerProjectDashboard />;
      case 'team_leader_portal':
        return <TeamLeaderPortal />;
      case 'operations_portal':
        return <OperationsPortal />;
      case 'admin_dashboard':
        return <AdminDashboard />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)]">
      {renderActiveView()}
    </main>
  );
};

export function App() {
  return (
    <BuildoraProvider>
      <div className="min-h-screen bg-[#0B0F19] text-gray-100 font-sans flex flex-col justify-between">
        <Header />
        <MainContent />

        {/* Global Footer */}
        <footer className="border-t border-white/10 bg-black/60 py-12 px-4 lg:px-8 mt-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-black" />
              </div>
              <div>
                <span className="text-xl font-bold font-heading gradient-text-gold">BUILDORA</span>
                <p className="text-xs text-gray-400">One Team. One Vision. One Perfect Home.</p>
              </div>
            </div>

            <div className="text-center md:text-right text-xs text-gray-400 space-y-1">
              <p>© 2026 Buildora Technologies Ltd. All rights reserved.</p>
              <p className="flex items-center justify-center md:justify-end gap-1">
                <span>The Apple of Construction</span> • <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> 100% In-House Verified Workforce
              </p>
            </div>
          </div>
        </footer>
      </div>
    </BuildoraProvider>
  );
}

export default App;
