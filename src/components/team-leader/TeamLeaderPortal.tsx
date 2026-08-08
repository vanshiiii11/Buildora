import React, { useState } from 'react';
import { useBuildora } from '../../store/buildoraContext';
import {
  HardHat,
  Camera,
  ShieldCheck,
  CheckCircle2,
  Send,
} from 'lucide-react';

export const TeamLeaderPortal: React.FC = () => {
  const { employees, projects, addDailySiteLog, setActiveTab } = useBuildora();

  // Select Active Team Leader
  const teamLeaders = employees.filter((e) => e.role === 'Team Leader' || e.role === 'Senior Architect');
  const [selectedLeaderId, setSelectedLeaderId] = useState(teamLeaders[0]?.id || 'EMP-101');
  const currentLeader = teamLeaders.find((l) => l.id === selectedLeaderId) || teamLeaders[0];

  // Selected site for log submission
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || 'PROJ-901');

  // Form states
  const [logTitle, setLogTitle] = useState('AAC Block Wall Masonry & Beam Reinforcement Audit');
  const [logNotes, setLogNotes] = useState('Ground floor boundary walls completed using M20 mortar. Curing sensors attached with automated sprinkler timer. Zero cracks recorded on ultrasonic test.');
  const [progressPct, setProgressPct] = useState(68);
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80');
  const [weatherCondition] = useState('Clear 32°C');
  const [workersCount, setWorkersCount] = useState(16);

  // Safety checks
  const [helmetChecked, setHelmetChecked] = useState(true);
  const [jacketChecked, setJacketChecked] = useState(true);
  const [tshirtChecked, setTshirtChecked] = useState(true);
  const [shoesChecked, setShoesChecked] = useState(true);
  const [idCardChecked, setIdCardChecked] = useState(true);

  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handleSubmitLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentLeader) return;

    const nowStr = new Date().toISOString().split('T')[0];

    addDailySiteLog(selectedProjectId, {
      date: nowStr,
      time: '17:45 IST',
      authorName: currentLeader.name,
      authorRole: `${currentLeader.department} Lead`,
      authorAvatar: currentLeader.avatar,
      title: logTitle,
      notes: logNotes,
      photoUrl,
      progressPercentage: progressPct,
      safetyAudited: true,
      uniformsVerified: helmetChecked && jacketChecked && tshirtChecked && shoesChecked && idCardChecked,
      weatherCondition,
      workersOnSite: workersCount,
    });

    setSubmittedMessage('Daily Site Log successfully uploaded & synced to Customer Dashboard!');
    setTimeout(() => setSubmittedMessage(null), 4000);
  };

  const samplePhotos = [
    { label: 'Brickwork / Masonry', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80' },
    { label: 'Plumbing & Diverters', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80' },
    { label: 'Electrical Server Rack', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
    { label: 'Foundation Steel Cages', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 lg:p-8 space-y-6 border-amber-500/40 bg-gradient-to-r from-gray-900 via-amber-950/20 to-black">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <HardHat className="w-4 h-4" />
              <span>SUPERVISOR MANAGEMENT PORTAL</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold font-heading text-white mt-2">
              Team Leader Site Console
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              Supervise worker safety, verify uniform compliance, and publish daily progress updates directly to customers.
            </p>
          </div>

          {/* Supervisor Switcher */}
          <div className="flex items-center gap-3 bg-black/40 p-3 rounded-2xl border border-white/10">
            <img
              src={currentLeader.avatar}
              alt={currentLeader.name}
              className="w-10 h-10 rounded-xl object-cover border border-amber-500/50"
            />
            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase">Logged in Supervisor:</label>
              <select
                value={selectedLeaderId}
                onChange={(e) => setSelectedLeaderId(e.target.value)}
                className="bg-transparent text-xs font-bold text-amber-400 focus:outline-none cursor-pointer"
              >
                {teamLeaders.map((tl) => (
                  <option key={tl.id} value={tl.id} className="bg-gray-900 text-white">
                    {tl.name} ({tl.department})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Daily Log Submission Form */}
        <div className="lg:col-span-7 glass-panel p-6 lg:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Camera className="w-4 h-4 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Submit Daily Site Log</h3>
            </div>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Direct Sync to Customer
            </span>
          </div>

          {submittedMessage && (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-300 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{submittedMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmitLog} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Select Assigned Construction Site</label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:border-amber-500 focus:outline-none"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.projectTitle} - {p.location} ({p.id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Update Headline / Activity Title</label>
              <input
                type="text"
                required
                value={logTitle}
                onChange={(e) => setLogTitle(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Supervisor Notes & Quality Observations</label>
              <textarea
                rows={3}
                required
                value={logNotes}
                onChange={(e) => setLogNotes(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Updated Overall Site Progress ({progressPct}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressPct}
                  onChange={(e) => setProgressPct(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Workers On Site Today</label>
                <input
                  type="number"
                  value={workersCount}
                  onChange={(e) => setWorkersCount(parseInt(e.target.value) || 1)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            {/* Site Photo Selection */}
            <div className="space-y-2">
              <label className="block text-gray-300 font-bold uppercase tracking-wider text-[10px]">Attach Site Photo Preview:</label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300"
              />
              <div className="grid grid-cols-4 gap-2 pt-1">
                {samplePhotos.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPhotoUrl(item.url)}
                    className="p-1 rounded-lg border border-white/10 hover:border-amber-500 bg-black/40 text-[10px] text-gray-400 text-center truncate"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* UNIFORM & SAFETY AUDIT CHECKBOX MATRIX */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Buildora Uniform & Safety Compliance Check
                </span>
                <span className="text-[10px] text-gray-400">Mandatory Daily Verification</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={helmetChecked}
                    onChange={(e) => setHelmetChecked(e.target.checked)}
                    className="accent-amber-500 w-4 h-4"
                  />
                  <span>Branded Safety Helmet</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={jacketChecked}
                    onChange={(e) => setJacketChecked(e.target.checked)}
                    className="accent-amber-500 w-4 h-4"
                  />
                  <span>High-Vis Jacket</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tshirtChecked}
                    onChange={(e) => setTshirtChecked(e.target.checked)}
                    className="accent-amber-500 w-4 h-4"
                  />
                  <span>Official T-Shirt</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shoesChecked}
                    onChange={(e) => setShoesChecked(e.target.checked)}
                    className="accent-amber-500 w-4 h-4"
                  />
                  <span>Steel-Toe Safety Shoes</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer col-span-2">
                  <input
                    type="checkbox"
                    checked={idCardChecked}
                    onChange={(e) => setIdCardChecked(e.target.checked)}
                    className="accent-amber-500 w-4 h-4"
                  />
                  <span>Verified QR Employee Identification Card</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full justify-center text-sm py-3"
            >
              <Send className="w-4 h-4 text-black" />
              Publish Daily Log to Customer Feed
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Supervisor Guidance & Uniform Standard */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 space-y-4">
            <h4 className="text-base font-bold text-white font-heading">Buildora Team Leader Protocol</h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>No Unregistered Workers:</strong> Only employees listed in the Buildora Operations directory are allowed on site.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Daily 09:00 AM Safety Briefing:</strong> Conduct helmet and boot checks before starting heavy machinery.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Customer Communication:</strong> Team Leaders act as the primary single point of contact for the client.</span>
              </li>
            </ul>

            <button
              onClick={() => setActiveTab('customer_dashboard')}
              className="btn-secondary w-full justify-center text-xs mt-2"
            >
              Preview Live Customer View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
