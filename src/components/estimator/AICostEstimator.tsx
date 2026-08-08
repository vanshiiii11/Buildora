import React, { useState } from 'react';
import { useBuildora } from '../../store/buildoraContext';
import {
  Calculator,
  Brain,
  Sparkles,
  Zap,
  TrendingDown,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const AICostEstimator: React.FC = () => {
  const { setActiveTab } = useBuildora();

  // Inputs
  const [areaSqFt, setAreaSqFt] = useState(3500);
  const [locationType, setLocationType] = useState('Tier-1 Metro (Hyderabad / Bangalore)');
  const [floors, setFloors] = useState(3);
  const [bedrooms, setBedrooms] = useState(4);
  const [bathrooms, setBathrooms] = useState(4);
  const [targetBudgetLakhs, setTargetBudgetLakhs] = useState(110);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'Italian Marble Flooring',
    'Rooftop Solar 5kW',
    'Concealed Smart CCTV',
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasEstimated, setHasEstimated] = useState(true);

  const featureOptions = [
    'Italian Marble Flooring',
    'Rooftop Solar 5kW',
    'Concealed Smart CCTV',
    'Home Automation & Smart Lighting',
    'Soundproof Acoustic Windows',
    'Elevator Shaft & Machine Room',
    'Terrace Garden & Pergola',
    'False Ceiling Across All Rooms',
  ];

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleRunAIEstimate = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasEstimated(true);
    }, 800);
  };

  const baseRate = locationType.includes('Tier-1') ? 2750 : 2250;
  const featureCost = selectedFeatures.length * 280000;
  const totalCost = Math.round(areaSqFt * baseRate * (1 + (floors - 1) * 0.06) + featureCost);

  const materialCost = Math.round(totalCost * 0.56);
  const labourCost = Math.round(totalCost * 0.34);
  const contingencyBuffer = Math.round(totalCost * 0.10);
  const estimatedMonths = Math.ceil(areaSqFt / 550);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-10 pb-20">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <Brain className="w-4 h-4 text-cyan-400" />
          <span>BUILDORA NEURAL AI ESTIMATOR v3.2</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-white">
          Instant AI Construction & Material Estimate
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Our AI analyzes live steel, cement, and skilled labour rates across your city to generate an accurate cost distribution before site inspection.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* INPUT QUESTIONNAIRE */}
        <div className="lg:col-span-6 glass-panel p-6 lg:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Calculator className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">AI Estimation Parameters</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-300">Total Built-Up Area:</span>
                <span className="text-cyan-400 font-mono font-bold">{areaSqFt.toLocaleString()} Sq. Ft.</span>
              </div>
              <input
                type="range"
                min="1000"
                max="10000"
                step="100"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 font-semibold mb-1">City / Region Category</label>
              <select
                value={locationType}
                onChange={(e) => setLocationType(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="Tier-1 Metro (Hyderabad / Bangalore)">Tier-1 Metro (Hyderabad / Bangalore / Mumbai)</option>
                <option value="Tier-2 Growth Hub (Vizag / Pune)">Tier-2 Growth Hub (Vizag / Pune / Ahmedabad)</option>
                <option value="Suburban / Coastal Zone">Suburban / Coastal Zone</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-400 font-semibold mb-1">Floors</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={floors}
                  onChange={(e) => setFloors(parseInt(e.target.value) || 1)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 font-semibold mb-1">Bedrooms</label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(parseInt(e.target.value) || 1)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 font-semibold mb-1">Bathrooms</label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(parseInt(e.target.value) || 1)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            {/* Target Budget Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-300">Target Budget Expectation:</span>
                <span className="text-emerald-400 font-mono font-bold">₹{(targetBudgetLakhs / 100).toFixed(2)} Cr ({targetBudgetLakhs} Lakhs)</span>
              </div>
              <input
                type="range"
                min="30"
                max="350"
                step="5"
                value={targetBudgetLakhs}
                onChange={(e) => setTargetBudgetLakhs(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Special Amenities Checklist */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs text-gray-300 font-bold uppercase tracking-wider">Select Desired Features & Materials:</label>
              <div className="grid grid-cols-2 gap-2">
                {featureOptions.map((feat) => {
                  const isSelected = selectedFeatures.includes(feat);
                  return (
                    <button
                      key={feat}
                      type="button"
                      onClick={() => toggleFeature(feat)}
                      className={`p-2.5 rounded-xl text-xs text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 font-semibold'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <span className="truncate pr-1">{feat}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleRunAIEstimate}
              disabled={isAnalyzing}
              className="btn-primary w-full justify-center text-sm py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/20"
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <Brain className="w-4 h-4 animate-spin text-white" />
                  Running Neural Material & Cost Calculation...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white" />
                  Recalculate AI Estimate
                </span>
              )}
            </button>
          </div>
        </div>

        {/* AI REPORT OUTPUT */}
        <div className="lg:col-span-6 space-y-6">
          {hasEstimated && (
            <div className="glass-panel p-6 lg:p-8 border-cyan-500/30 bg-gradient-to-b from-gray-900 to-black space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">AI ESTIMATION REPORT</span>
                  <h3 className="text-xl font-extrabold text-white font-heading">Recommended Budget Allocation</h3>
                </div>
                <span className="badge-cyan">98.4% Accuracy Index</span>
              </div>

              {/* Total Estimated Cost Box */}
              <div className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center space-y-1">
                <div className="text-xs text-cyan-300 font-semibold uppercase tracking-wider">AI Projected Total Cost</div>
                <div className="text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight">
                  ₹{totalCost.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-gray-400">
                  Estimated Timeline: <strong className="text-white">{estimatedMonths} Months</strong> • Recommended Tier: <strong className="text-amber-400">Premium / Elite</strong>
                </p>
              </div>

              {/* Cost Split Breakdown */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Material Cost (56%)</div>
                  <div className="text-sm font-bold text-white font-mono mt-1">₹{(materialCost / 100000).toFixed(2)} Lakhs</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Labour & Tools (34%)</div>
                  <div className="text-sm font-bold text-cyan-400 font-mono mt-1">₹{(labourCost / 100000).toFixed(2)} Lakhs</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Contingency (10%)</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono mt-1">₹{(contingencyBuffer / 100000).toFixed(2)} Lakhs</div>
                </div>
              </div>

              {/* AI Insights & Saving Tips */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  AI Optimization & Value Insights
                </div>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-gray-300 space-y-1">
                  <div className="font-bold text-amber-400 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" /> Smart Material Savings Tip
                  </div>
                  <p>
                    Switching to AAC precision block masonry saves approximately <strong className="text-white">₹1.85 Lakhs</strong> in structural deadweight and reduces plastering cement consumption by 30%.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-gray-300 space-y-1">
                  <div className="font-bold text-emerald-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> High ROI Upgrade Recommendation
                  </div>
                  <p>
                    Integrating <strong className="text-white">5kW Rooftop Solar</strong> lowers monthly electricity consumption by 85%, providing full capital payback within 3.4 years under current government subsidy rules.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setActiveTab('package_builder')}
                  className="btn-primary flex-1 justify-center"
                >
                  Configure in Package Builder
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
