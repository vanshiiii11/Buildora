import React, { useState } from 'react';
import { useBuildora } from '../../store/buildoraContext';
import { INDIVIDUAL_SERVICES } from '../../data/mockData';
import type { IndividualService } from '../../types/buildora';
import {
  Wrench,
  Zap,
  Paintbrush,
  Hammer,
  Wind,
  ShieldCheck,
  Camera,
  Sun,
  Search,
  Clock,
  CheckCircle2,
  X,
  ArrowRight,
} from 'lucide-react';

export const HomeServicesCatalog: React.FC = () => {
  const { bookIndividualService } = useBuildora();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBookingService, setActiveBookingService] = useState<IndividualService | null>(null);

  // Booking Form State
  const [customerName, setCustomerName] = useState('Pooja Nair');
  const [customerPhone, setCustomerPhone] = useState('+91 99880 77665');
  const [customerAddress, setCustomerAddress] = useState('Plot 88, Road No. 12, Jubilee Hills, Hyderabad');
  const [preferredDate, setPreferredDate] = useState('2026-08-03');
  const [preferredSlot, setPreferredSlot] = useState('10:00 AM - 01:00 PM');
  const [notes, setNotes] = useState('');

  const [bookingConfirmedId, setBookingConfirmedId] = useState<string | null>(null);

  const categories = ['All', 'Plumbing & Drainage', 'Electrical & Power', 'Painting & Coating', 'Carpentry & Woodwork', 'HVAC & AC Systems', 'Smart Home & Security'];

  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    Wrench,
    Zap,
    Paintbrush,
    Hammer,
    Wind,
    ShieldCheck,
    Camera,
    Sun,
  };

  const filteredServices = INDIVIDUAL_SERVICES.filter((srv) => {
    const matchesCat = selectedCategory === 'All' || srv.category === selectedCategory;
    const matchesSearch = srv.title.toLowerCase().includes(searchQuery.toLowerCase()) || srv.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBookingService) return;

    const bId = bookIndividualService({
      serviceId: activeBookingService.id,
      serviceTitle: activeBookingService.title,
      category: activeBookingService.category,
      customerName,
      customerPhone,
      customerAddress,
      preferredDate,
      preferredSlot,
      notes,
      estimatedPrice: activeBookingService.startingPrice,
    });

    setBookingConfirmedId(bId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-10 pb-20">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <Wrench className="w-4 h-4 text-cyan-400" />
          <span>INSTANT BUILDORA HOME SERVICES</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-white">
          On-Demand Repair & Installation Services
        </h1>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Need a quick fix? Book single home services delivered exclusively by uniformed Buildora specialists with transparent upfront pricing.
        </p>
      </div>

      {/* SEARCH & CATEGORY FILTERS */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search plumbing, AC, electrical, painting..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto justify-start md:justify-center py-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((srv) => {
          const IconComponent = iconMap[srv.iconName] || Wrench;
          return (
            <div
              key={srv.id}
              className="glass-panel p-6 space-y-5 flex flex-col justify-between hover:border-cyan-500/40 group transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-cyan-400" />
                  </div>
                  {srv.popular && (
                    <span className="badge-gold">Popular Service</span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">{srv.category}</span>
                  <h3 className="text-lg font-bold text-white font-heading mt-0.5">{srv.title}</h3>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed">{srv.description}</p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs text-gray-300">
                  {srv.includedFeatures.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase block">Starting From</span>
                    <span className="text-2xl font-extrabold text-white font-heading">₹{srv.startingPrice.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 font-semibold uppercase block">Est. Time</span>
                    <span className="text-xs font-bold text-gray-200 flex items-center gap-1"><Clock className="w-3 h-3 text-cyan-400" /> {srv.estimatedHours}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveBookingService(srv)}
                  className="btn-primary w-full justify-center text-xs py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/20"
                >
                  Book Service Now
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* BOOKING MODAL */}
      {activeBookingService && (
        <div className="modal-overlay">
          <div className="glass-panel p-6 md:p-8 max-w-lg w-full space-y-6 border-cyan-500/40 bg-gray-900 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => {
                setActiveBookingService(null);
                setBookingConfirmedId(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingConfirmedId ? (
              <>
                <div className="space-y-1">
                  <span className="badge-cyan">Direct Company Booking</span>
                  <h3 className="text-xl font-bold text-white font-heading">{activeBookingService.title}</h3>
                  <p className="text-xs text-gray-400">Fixed rate: <strong className="text-white">₹{activeBookingService.startingPrice}</strong> • Dispatched by Buildora Operations</p>
                </div>

                <form onSubmit={handleCreateBooking} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Preferred Time Slot</label>
                    <select
                      value={preferredSlot}
                      onChange={(e) => setPreferredSlot(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-white"
                    >
                      <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM (Morning)</option>
                      <option value="12:00 PM - 03:00 PM">12:00 PM - 03:00 PM (Afternoon)</option>
                      <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM (Evening)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Service Address</label>
                    <textarea
                      rows={2}
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Notes / Specific Problem Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Kitchen tap leak near filter line"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-gray-300 text-[11px] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Buildora operations will assign a verified Team Leader & issue official SMS details.</span>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center text-sm py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                  >
                    Confirm Booking Request
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-5 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <span className="badge-emerald">Booking Confirmed</span>
                  <h3 className="text-2xl font-bold text-white font-heading">Service Booking Received!</h3>
                  <p className="text-xs text-gray-300">
                    Booking ID <strong className="text-cyan-400 font-mono">{bookingConfirmedId}</strong> has been logged into the Buildora Operations dispatch system.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveBookingService(null);
                    setBookingConfirmedId(null);
                  }}
                  className="btn-primary w-full justify-center"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
