import React, { useState } from 'react';
import { useBuildora } from '../../store/buildoraContext';
import type { TeamTier, PackageOptions } from '../../types/buildora';
import {
  Sliders,
  ShieldCheck,
  Award,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Building,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export const DynamicPackageBuilder: React.FC = () => {
  const { calculatePackage, addNewProject, setActiveTab } = useBuildora();

  // Form states
  const [customerName, setCustomerName] = useState('Anand Rao');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 11223');
  const [customerEmail, setCustomerEmail] = useState('anand.rao@outlook.com');
  const [projectTitle, setProjectTitle] = useState('My Custom Buildora Residence');
  const [propertyType, setPropertyType] = useState<'Luxury Villa' | 'Residential Apartment' | 'Commercial Office' | 'Custom Duplex'>('Luxury Villa');
  const [location, setLocation] = useState('Jubilee Hills, Hyderabad');
  const [plotSizeSqFt, setPlotSizeSqFt] = useState(3000);
  const [builtUpAreaSqFt, setBuiltUpAreaSqFt] = useState(4200);
  const [floors, setFloors] = useState(3);

  // Tiers state
  const [packageOptions, setPackageOptions] = useState<PackageOptions>({
    architectureTier: 'Premium',
    civilStructureTier: 'Premium',
    flooringTier: 'Premium',
    kitchenInteriorTier: 'Premium',
    electricalTier: 'Elite',
    plumbingTier: 'Premium',
    paintingTier: 'Standard',
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState<string | null>(null);

  // Calculate live estimates based on plot size, built up area, floors, tiers, AND property type!
  const calculation = calculatePackage(
    plotSizeSqFt,
    builtUpAreaSqFt,
    floors,
    packageOptions,
    propertyType
  );

  const tiersList: TeamTier[] = ['Basic', 'Standard', 'Premium', 'Elite'];

  const departmentKeys: {
    key: keyof PackageOptions;
    label: string;
    description: string;
  }[] = [
    { key: 'architectureTier', label: 'Architecture & Structural Design', description: '3D Elevation, Soil Load Calculation & Municipal Approval Drawings' },
    { key: 'civilStructureTier', label: 'Civil Masonry & Foundation', description: 'RCC Column Footings, Fe550 Steel, AAC Blocks & Curing Protocols' },
    { key: 'flooringTier', label: 'Flooring & Marble Finish', description: 'Vitrified GVT, Italian Marble Precision Laser Alignment & Grouting' },
    { key: 'kitchenInteriorTier', label: 'Modular Kitchen & Interior Carpentry', description: 'German Blum/Hettich Soft-Close Hardware, Termite Resistance' },
    { key: 'electricalTier', label: 'Electrical Wiring & Power Automation', description: 'FRLS Copper Conduits, Thermal MCB Distribution & Smart Lighting' },
    { key: 'plumbingTier', label: 'Plumbing & Drainage Systems', description: 'Concealed Noise-Free CPVC Stack, Kohler/Jaquar Thermostats' },
    { key: 'paintingTier', label: 'Painting & Waterproof Coating', description: 'Dust-Free Sanding, Royal Emulsion Finish & Elastomeric Sealer' },
  ];

  const handleTierChange = (key: keyof PackageOptions, tier: TeamTier) => {
    setPackageOptions((prev) => ({
      ...prev,
      [key]: tier,
    }));
  };

  const handleApplyPreset = (tier: TeamTier) => {
    setPackageOptions({
      architectureTier: tier,
      civilStructureTier: tier,
      flooringTier: tier,
      kitchenInteriorTier: tier,
      electricalTier: tier,
      plumbingTier: tier,
      paintingTier: tier,
    });
  };

  const handleConfirmProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = addNewProject({
      customerName,
      customerPhone,
      customerEmail,
      projectTitle,
      propertyType,
      location,
      plotSizeSqFt,
      builtUpAreaSqFt,
      floors,
      totalBudget: calculation.totalEstimatedCost,
      paidAmount: Math.round(calculation.totalEstimatedCost * 0.15),
      estimatedCompletionDate: new Date(Date.now() + calculation.estimatedMonths * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      assignedTeamLeaderId: calculation.assignedTeamLeader.id,
      assignedTeamLeader: calculation.assignedTeamLeader,
      packageDetails: packageOptions,
    });

    setCreatedProjectId(newId);
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-10 pb-20">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Sliders className="w-3.5 h-3.5" />
          <span>BUILDORA DYNAMIC PACKAGE BUILDER</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-white">
          Customize Your Dream Build in Real Time
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Tailor department tiers according to your preferences. Watch costs, warranties, material specifications, and assigned Buildora teams update live.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider mr-2">Quick Presets:</span>
        {tiersList.map((t) => (
          <button
            key={t}
            onClick={() => handleApplyPreset(t)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-amber-400 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Set All to {t} Tier
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Configuration Controls */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Property Dimensions & Info */}
          <div className="glass-panel p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Building className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">1. Property Specifications</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 font-semibold mb-1">Project Name</label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 font-semibold mb-1">Property Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 font-semibold mb-1">Property Type (Rate Multiplier)</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as any)}
                  className="w-full bg-black/40 border border-amber-500/40 rounded-xl px-3.5 py-2.5 text-sm text-amber-400 font-bold focus:border-amber-500 focus:outline-none"
                >
                  <option value="Luxury Villa">Luxury Villa (1.30x Multiplier)</option>
                  <option value="Custom Duplex">Custom Duplex (1.18x Multiplier)</option>
                  <option value="Commercial Office">Commercial Office (1.10x Multiplier)</option>
                  <option value="Residential Apartment">Residential Apartment (1.00x Base)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 font-semibold mb-1">Number of Floors ({floors} Floors)</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={floors}
                  onChange={(e) => setFloors(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer mt-2"
                />
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-300">Plot Size (Site Excavation & Boundary Prep):</span>
                  <span className="text-amber-400 font-mono font-bold">{plotSizeSqFt.toLocaleString()} Sq. Ft.</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="10000"
                  step="100"
                  value={plotSizeSqFt}
                  onChange={(e) => setPlotSizeSqFt(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-300">Total Built-Up Area (Structure & Interiors):</span>
                  <span className="text-amber-400 font-mono font-bold">{builtUpAreaSqFt.toLocaleString()} Sq. Ft.</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="100"
                  value={builtUpAreaSqFt}
                  onChange={(e) => setBuiltUpAreaSqFt(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Department Tier Selectors */}
          <div className="glass-panel p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">2. Select Department Tiers</h3>
              </div>
              <span className="text-xs text-gray-400">All Tiers Pass Buildora Safety Quality</span>
            </div>

            <div className="space-y-6">
              {departmentKeys.map((dept) => {
                const currentSelectedTier = packageOptions[dept.key];
                return (
                  <div key={dept.key} className="space-y-2.5 bg-black/20 p-4 rounded-xl border border-white/5">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white">{dept.label}</h4>
                        <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                          {currentSelectedTier} Tier
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{dept.description}</p>
                    </div>

                    <div className="grid grid-cols-4 gap-2 pt-1">
                      {tiersList.map((tier) => {
                        const isSelected = currentSelectedTier === tier;
                        return (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => handleTierChange(dept.key, tier)}
                            className={`py-2 px-2 rounded-lg text-xs font-bold transition-all text-center border ${
                              isSelected
                                ? 'bg-amber-500 text-black border-amber-400 shadow-md font-extrabold'
                                : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                            }`}
                          >
                            {tier}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Calculation & Confirmation Sticky Card */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          
          {/* Real-time Calculation Summary Card */}
          <div className="glass-panel p-6 border-amber-500/40 bg-gradient-to-b from-gray-900 to-black space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> LIVE CALCULATION ENGINE
                </span>
                <h3 className="text-xl font-extrabold text-white font-heading">Estimated Investment</h3>
              </div>
              <span className="badge-gold">{calculation.overallTier} Tier</span>
            </div>

            {/* Total Cost Display */}
            <div>
              <div className="text-4xl font-extrabold font-heading gradient-text-gold tracking-tight">
                ₹{calculation.totalEstimatedCost.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                @ ~₹{Math.round(calculation.totalEstimatedCost / builtUpAreaSqFt)} / sq. ft. built-up • <strong className="text-amber-400 font-semibold">{propertyType}</strong>
              </p>
            </div>

            {/* Itemized Calculation Formula Breakdown Card */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">Itemized Cost Factors</div>
              <div className="flex justify-between text-gray-300">
                <span>Built-Up Structure ({builtUpAreaSqFt.toLocaleString()} sq ft):</span>
                <span className="font-mono font-bold text-white">₹{calculation.builtUpCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Plot Site & Boundary ({plotSizeSqFt.toLocaleString()} sq ft):</span>
                <span className="font-mono font-bold text-white">₹{calculation.plotDevelopmentCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Property Multiplier ({propertyType}):</span>
                <span className="font-mono font-bold text-amber-400">{calculation.propertyTypeMultiplier}x</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Floors Factor ({floors} Floors):</span>
                <span className="font-mono font-bold text-amber-400">{calculation.floorMultiplier.toFixed(2)}x</span>
              </div>
            </div>

            {/* Cost Breakdown Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-gray-300">
                <span>Materials (58%)</span>
                <span>Labour (32%)</span>
                <span>Mgmt (10%)</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden flex">
                <div style={{ width: '58%' }} className="bg-amber-500 h-full" title="Materials: 58%" />
                <div style={{ width: '32%' }} className="bg-cyan-500 h-full" title="Labour: 32%" />
                <div style={{ width: '10%' }} className="bg-emerald-500 h-full" title="Management: 10%" />
              </div>
            </div>

            {/* Key Project Guarantees */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Timeline</span>
                </div>
                <div className="text-sm font-bold text-white">{calculation.estimatedMonths} Months</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Company Warranty</span>
                </div>
                <div className="text-sm font-bold text-emerald-400">{calculation.warrantyYears} Years</div>
              </div>
            </div>

            {/* Assigned Buildora Team Leader */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-400 font-bold uppercase tracking-wider">ASSIGNED TEAM LEADER</span>
                <span className="flex items-center gap-1 text-emerald-400 font-semibold"><ShieldCheck className="w-3.5 h-3.5" /> Verified Staff</span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={calculation.assignedTeamLeader.avatar}
                  alt={calculation.assignedTeamLeader.name}
                  className="w-12 h-12 rounded-xl object-cover border-2 border-amber-500/50"
                />
                <div>
                  <div className="text-sm font-bold text-white">{calculation.assignedTeamLeader.name}</div>
                  <div className="text-xs text-gray-300">{calculation.assignedTeamLeader.role} • {calculation.assignedTeamLeader.experienceYears} Yrs Exp</div>
                  <div className="text-[10px] text-amber-400 font-mono mt-0.5">Rating: ★ {calculation.assignedTeamLeader.rating} / 5</div>
                </div>
              </div>
            </div>

            {/* Material Brands Table */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-gray-300 uppercase tracking-wider text-[10px]">Verified Material Brands Included:</div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300">
                <div className="bg-white/5 p-2 rounded border border-white/5">
                  <span className="text-gray-400 block text-[9px]">CEMENT</span> {calculation.materialBrands.cement}
                </div>
                <div className="bg-white/5 p-2 rounded border border-white/5">
                  <span className="text-gray-400 block text-[9px]">STEEL</span> {calculation.materialBrands.steel}
                </div>
                <div className="bg-white/5 p-2 rounded border border-white/5">
                  <span className="text-gray-400 block text-[9px]">FLOORING</span> {calculation.materialBrands.tiles}
                </div>
                <div className="bg-white/5 p-2 rounded border border-white/5">
                  <span className="text-gray-400 block text-[9px]">PAINT</span> {calculation.materialBrands.paint}
                </div>
              </div>
            </div>

            {/* Customer Information & Submit */}
            <form onSubmit={handleConfirmProject} className="space-y-3 pt-2">
              <div className="text-xs font-bold text-white">Enter Your Details to Lock Package:</div>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
              <input
                type="tel"
                required
                placeholder="Phone Number"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
              <button
                type="submit"
                className="btn-primary w-full justify-center py-3.5 text-sm shadow-xl"
              >
                Confirm Package & Launch Project
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* CONFIRMATION SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="glass-panel p-8 max-w-md w-full text-center space-y-6 border-amber-500/50 bg-gray-900 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <span className="badge-gold">Project Launched</span>
              <h3 className="text-2xl font-bold text-white font-heading">Buildora Project Created!</h3>
              <p className="text-xs text-gray-300">
                Your custom construction package <strong className="text-amber-400 font-mono">{createdProjectId}</strong> has been initialized and assigned to <strong className="text-white">{calculation.assignedTeamLeader.name}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Investment:</span>
                <span className="text-amber-400 font-bold font-mono">₹{calculation.totalEstimatedCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Estimated Duration:</span>
                <span className="text-white font-bold">{calculation.estimatedMonths} Months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Warranty Coverage:</span>
                <span className="text-emerald-400 font-bold">{calculation.warrantyYears} Years Written</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                setActiveTab('customer_dashboard');
              }}
              className="btn-primary w-full justify-center"
            >
              Open Live Customer Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
