import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Send, Compass, MessageCircle, CheckCircle2 } from 'lucide-react';

export const CustomOrderModal: React.FC = () => {
  const { customModalOpen, setCustomModalOpen, submitCustomOrder, showToast } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [bowType, setBowType] = useState('Takedown Recurve Bow');
  const [preferredWood, setPreferredWood] = useState('Royal Padauk Wood');
  const [drawWeight, setDrawWeight] = useState('32 lbs (Medium / Sports)');
  const [userHeight, setUserHeight] = useState("5'8\" - 5'11\"");
  const [dominantHand, setDominantHand] = useState<'Right' | 'Left'>('Right');
  const [arrowQuantity, setArrowQuantity] = useState(12);
  const [arrowTipType, setArrowTipType] = useState('Leaf Blade Broadhead');
  const [customEngraving, setCustomEngraving] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!customModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      showToast('Please provide your name and phone number');
      return;
    }

    submitCustomOrder({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      city: city.trim(),
      bowType,
      preferredWood,
      drawWeight,
      userHeight,
      dominantHand,
      arrowQuantity,
      arrowTipType,
      customEngraving: customEngraving.trim() || undefined,
      notes: notes.trim() || undefined
    });

    setSubmitted(true);
  };

  const whatsappMsg = `*Custom Archery Commission Request*
Archer Name: ${fullName}
Phone: ${phone}
City: ${city}
Bow Style: ${bowType}
Preferred Wood: ${preferredWood}
Draw Weight: ${drawWeight}
Orientation: ${dominantHand} Handed
Arrows: ${arrowQuantity}x ${arrowTipType}
Engraving: ${customEngraving || 'None'}
Notes: ${notes || 'None'}`;

  const whatsappUrl = `https://wa.me/919571030853?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-xs transition-opacity"
        onClick={() => setCustomModalOpen(false)}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative bg-white w-full max-w-2xl border border-neutral-300 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#171717] text-white flex items-center justify-between border-b border-[#D4AF37]/40">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <h2 className="font-display font-bold text-lg uppercase tracking-wide">
                  Custom Archery Commission
                </h2>
                <p className="text-[11px] text-neutral-300">
                  Direct consultation with Master Bowmaker Himanshu Tirgar
                </p>
              </div>
            </div>
            <button
              onClick={() => setCustomModalOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl uppercase text-neutral-900">
                Inquiry Received by Workshop
              </h3>
              <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                Thank you, {fullName}. Himanshu Tirgar will review your draw specifications and contact you at +91 {phone} to discuss wood selection and crafting timeline.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-[#25D366] hover:bg-[#1ebc59] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send Specs Directly to WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setCustomModalOpen(false);
                  }}
                  className="px-5 py-3 border border-neutral-300 text-neutral-700 text-xs font-semibold uppercase hover:bg-neutral-100"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs max-h-[80vh] overflow-y-auto">
              {/* Archer Details */}
              <div className="space-y-3">
                <h4 className="font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1.5">
                  1. Archer Contact Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Maharana Pratap Academy"
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="e.g. 9829012345"
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="archer@example.com"
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      City & State
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="e.g. Bikaner, Rajasthan"
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Bow Specifications */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1.5">
                  2. Bow Architecture & Wood
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Bow Style
                    </label>
                    <select
                      value={bowType}
                      onChange={e => setBowType(e.target.value)}
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Takedown Recurve Bow">Takedown Recurve Bow (Tournament / Sport)</option>
                      <option value="Traditional Monolithic Bamboo Dhanush">Traditional Monolithic Bamboo Dhanush</option>
                      <option value="Longbow Heritage Model">Longbow Heritage Model</option>
                      <option value="Compact Horsebow / Short Bow">Compact Horsebow / Short Bow</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Riser Timber
                    </label>
                    <select
                      value={preferredWood}
                      onChange={e => setPreferredWood(e.target.value)}
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Royal Padauk Wood (Crimson Grain)">Royal Padauk Wood (Crimson Grain)</option>
                      <option value="Seasoned Indian Sheesham (Dark Brown)">Seasoned Indian Sheesham (Dark Brown)</option>
                      <option value="Golden Banswara Teak">Golden Banswara Teak</option>
                      <option value="Smoked Forest Oak">Smoked Forest Oak</option>
                      <option value="Emerald Mineral Lacquer Finish">Emerald Mineral Lacquer Finish</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Draw Weight
                    </label>
                    <select
                      value={drawWeight}
                      onChange={e => setDrawWeight(e.target.value)}
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="20-24 lbs (Beginner / Youth)">20-24 lbs (Beginner / Youth)</option>
                      <option value="26-30 lbs (Standard Practice)">26-30 lbs (Standard Practice)</option>
                      <option value="32-38 lbs (Medium / Sports)">32-38 lbs (Medium / Sports)</option>
                      <option value="40-48 lbs (Heavy / Field Archery)">40-48 lbs (Heavy / Field Archery)</option>
                      <option value="50-60+ lbs (Master Heavy Draw)">50-60+ lbs (Master Heavy Draw)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Shooting Orientation
                    </label>
                    <div className="flex gap-4 pt-1">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="hand"
                          checked={dominantHand === 'Right'}
                          onChange={() => setDominantHand('Right')}
                          className="accent-[#D4AF37]"
                        />
                        <span>Right Hand (Hold in Left)</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="hand"
                          checked={dominantHand === 'Left'}
                          onChange={() => setDominantHand('Left')}
                          className="accent-[#D4AF37]"
                        />
                        <span>Left Hand (Hold in Right)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow Match & Personalization */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1.5">
                  3. Arrow Pairing & Custom Inscription
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Matched Arrow Tip Style
                    </label>
                    <select
                      value={arrowTipType}
                      onChange={e => setArrowTipType(e.target.value)}
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Leaf Blade Broadhead">Leaf Blade Broadhead (Razor Hammered)</option>
                      <option value="Twisted Spiral Steel Point">Twisted Spiral Steel Point (Target Shooting)</option>
                      <option value="Barbed Harpoon Tip">Barbed Harpoon Tip (Heritage Tribal)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Arrow Quantity
                    </label>
                    <select
                      value={arrowQuantity}
                      onChange={e => setArrowQuantity(Number(e.target.value))}
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value={6}>6 Arrows (Starter Set)</option>
                      <option value={12}>12 Arrows (Full Dozen Quiver)</option>
                      <option value={20}>20 Arrows (Tournament Pack)</option>
                      <option value={36}>36 Arrows (Academy Bundle)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Custom Inscription / Riser Engraving (Optional)
                    </label>
                    <input
                      type="text"
                      value={customEngraving}
                      onChange={e => setCustomEngraving(e.target.value)}
                      placeholder="e.g. 'Arjun Singh' or 'Victory to Dharma'"
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Special Workshop Requests
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="Specify any special limb finish, target distance, or packaging preferences..."
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCustomModalOpen(false)}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 font-semibold uppercase text-xs hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#171717] hover:bg-[#D4AF37] hover:text-neutral-950 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Submit Commission Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
