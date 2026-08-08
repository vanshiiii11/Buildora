import React from 'react';
import { useBuildora } from '../../store/buildoraContext';
import { DEPARTMENTS_DATA } from '../../data/mockData';
import {
  Building2,
  Sliders,
  Calculator,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Users,
  HardHat,
  Award,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab } = useBuildora();

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-20 px-4 lg:px-8">
        <div className="glow-background" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs md:text-sm font-semibold tracking-wide shadow-lg shadow-amber-500/5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>ONE TEAM. ONE VISION. ONE PERFECT HOME.</span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Everything Your Home Needs.{' '}
              <span className="gradient-text-gold">One Trusted Company.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-normal max-w-3xl mx-auto leading-relaxed">
              Buildora is not an open worker marketplace. We recruit, equip, verify, and operate our entire workforce under one brand. You hire <strong className="text-amber-400 font-semibold">Buildora</strong>—and we take complete ownership from blueprint to final handover.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('package_builder')}
              className="btn-primary text-base px-8 py-4 shadow-xl"
            >
              <Sliders className="w-5 h-5 text-black" />
              Build My Home
              <ArrowRight className="w-5 h-5 text-black" />
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className="btn-secondary text-base px-8 py-4"
            >
              <Wrench className="w-5 h-5 text-amber-400" />
              Book a Service
            </button>

            <button
              onClick={() => setActiveTab('ai_estimator')}
              className="px-6 py-4 rounded-xl text-base font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 transition-all"
            >
              <Calculator className="w-5 h-5 text-cyan-400" />
              Get Free AI Estimate
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-10">
            <div className="glass-panel p-5 text-center">
              <div className="text-2xl md:text-3xl font-extrabold font-heading gradient-text-gold">100%</div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">Direct Employed Staff</div>
            </div>
            <div className="glass-panel p-5 text-center">
              <div className="text-2xl md:text-3xl font-extrabold font-heading text-white">10,000+</div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">Projects Delivered</div>
            </div>
            <div className="glass-panel p-5 text-center">
              <div className="text-2xl md:text-3xl font-extrabold font-heading text-emerald-400">25 Years</div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">Structural Warranty</div>
            </div>
            <div className="glass-panel p-5 text-center">
              <div className="text-2xl md:text-3xl font-extrabold font-heading text-amber-400">4.95 / 5</div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">Customer Audit Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY BUILDORA vs TRADITIONAL MARKETPLACES */}
      <section className="px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="badge-gold">The Buildora Difference</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
            Why Homeowners Choose Buildora
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Say goodbye to unreliable individual workers, hidden costs, and delayed projects. Experience the corporate standard in construction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card-sm p-8 border-red-500/20 bg-red-950/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-300 font-heading">Traditional Marketplace / Contractor Model</h3>
            </div>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Unverified Workers:</strong> You take personal risks hiring unvetted random individuals.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Uncertain Pricing:</strong> Estimates balloon mid-way through construction with surprise extras.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Lack of Supervision:</strong> Nobody supervises quality except the customer themselves.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>No Post-Work Warranty:</strong> Workers disappear after receiving final payment.</span>
              </li>
            </ul>
          </div>

          <div className="glass-panel p-8 border-amber-500/40 bg-amber-500/5 space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold uppercase rounded-bl-xl tracking-wider">
              The Apple of Construction
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">The Buildora Managed Model</h3>
            </div>
            <ul className="space-y-4 text-sm text-gray-200">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>100% In-House Verified Workforce:</strong> Every worker is background checked, trained, and uniformed.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Dynamic Locked Pricing:</strong> Transparent itemized estimates calculated before work starts.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Dedicated Team Leaders:</strong> On-site supervisors conduct safety checks and upload daily site logs.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Up to 25-Year Written Warranty:</strong> Backed directly by Buildora Corporate, not individuals.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* TWO PRIMARY SERVICE DIVISIONS */}
      <section className="px-4 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="badge-cyan">Service Divisions</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
            End-to-End Construction & On-Demand Care
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 space-y-6 group hover:border-amber-500/40">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building2 className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase font-bold tracking-wider">DIVISION 01</span>
              <h3 className="text-2xl font-bold text-white font-heading mt-1">Complete Construction & Renovation</h3>
              <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                Hire Buildora for turnkey residential and commercial projects. From architecture blueprints and soil testing to civil structure, interiors, marble flooring, and handover.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 pt-2 border-t border-white/10">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Luxury Villas</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Apartment Complexes</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Commercial Offices</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Complete Renovations</span>
            </div>
            <button
              onClick={() => setActiveTab('package_builder')}
              className="btn-primary w-full justify-center"
            >
              Configure Construction Package
            </button>
          </div>

          <div className="glass-panel p-8 space-y-6 group hover:border-cyan-500/40">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Wrench className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">DIVISION 02</span>
              <h3 className="text-2xl font-bold text-white font-heading mt-1">Individual Home Services</h3>
              <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                Instantly book single maintenance or repair services without a full project. Delivered by uniformed Buildora specialists with upfront transparent pricing.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 pt-2 border-t border-white/10">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Plumbing & Drainage</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Electrical Panel Check</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Dust-Free Painting</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Solar & Smart Security</span>
            </div>
            <button
              onClick={() => setActiveTab('services')}
              className="btn-secondary w-full justify-center text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10"
            >
              Browse Instant Services
            </button>
          </div>
        </div>
      </section>

      {/* SPECIALIZED DEPARTMENTS SHOWCASE */}
      <section className="px-4 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="badge-gold">Structured Workforce</span>
            <h2 className="text-3xl font-bold font-heading text-white mt-2">
              Organized Department Structure
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Every specialized discipline operates under dedicated Team Leaders and quality protocols.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DEPARTMENTS_DATA.map((dept, idx) => (
            <div key={idx} className="glass-panel p-5 space-y-4 hover:border-amber-500/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/5 text-amber-400 border border-amber-500/20">
                  {dept.activeProjects} Active Sites
                </span>
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  ★ {dept.satisfactionRating}
                </span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white font-heading">{dept.name}</h4>
                <p className="text-xs text-gray-400 mt-1">
                  {dept.teamLeaderCount} Team Leaders • {dept.skilledWorkerCount} Verified Workers
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <img
                  src={dept.leadAvatar}
                  alt={dept.leadName}
                  className="w-8 h-8 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <div className="text-xs font-semibold text-gray-200">{dept.leadName}</div>
                  <div className="text-[10px] text-gray-400">Department Lead</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BUILDORA UNIFORM & BRANDING VERIFICATION */}
      <section className="px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-panel p-8 lg:p-12 relative overflow-hidden bg-gradient-to-br from-gray-900 via-amber-950/20 to-black border-amber-500/30">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <span className="badge-gold">Brand Identity</span>
              <h2 className="text-3xl lg:text-4xl font-bold font-heading text-white">
                The Buildora Official Uniform Standard
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                When a Buildora professional arrives at your site, you will recognize them instantly. Every employee wears official high-visibility branded gear, safety helmets, steel-toe shoes, and digital QR identification badges.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-gray-200">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <HardHat className="w-5 h-5 text-amber-400" />
                  <span>Branded Safety Helmet</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>Verified QR ID Card</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>Buildora High-Vis Jacket</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Users className="w-5 h-5 text-amber-400" />
                  <span>Steel-Toe Safety Shoes</span>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl max-w-md">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80"
                  alt="Buildora Team Leader On Site"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 flex flex-col justify-end">
                  <div className="badge-gold inline-self-start mb-2">Verified Team Leader</div>
                  <h4 className="text-xl font-bold text-white font-heading">Rajesh Kumar</h4>
                  <p className="text-xs text-amber-300 font-mono">Civil Department • 14 Yrs Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
