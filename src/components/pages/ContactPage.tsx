import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, showToast } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Bulk Order Inquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast('Please fill in your name, contact phone and inquiry message');
      return;
    }
    setSent(true);
    showToast('Your message has been sent to Himanshu Tirgar!');
  };

  const whatsappMessage = `*New Contact Inquiry - TIRGAR Archery*
Name: ${name}
Phone: ${phone}
Subject: ${subject}
Message: ${message}`;

  const whatsappUrl = `https://wa.me/919571030853?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#937418]">
              Workshop & Inquiries
            </span>
            <span className="h-px w-8 bg-[#D4AF37]" />
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-neutral-900 tracking-wide uppercase">
            Contact Himanshu Tirgar
          </h1>
          <p className="text-xs text-neutral-600">
            Reach out directly to the workshop for wholesale archery supplies, custom bowmaking, or tournament equipment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info & Address (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F7F4ED] p-6 sm:p-8 border border-neutral-300 space-y-6 shadow-sm">
              <h2 className="font-display font-bold text-lg uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-3">
                Workshop Location
              </h2>

              <div className="space-y-4 text-xs text-neutral-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#937418] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-950 block text-xs uppercase tracking-wide">
                      TIRGAR Manufacturing Unit
                    </strong>
                    <p className="mt-1 leading-relaxed">
                      Village - Chandu ji ka gara,<br />
                      VPO - Chandu ji ka gara,<br />
                      Tahsil - Ganoda, Dist - Banswara,<br />
                      State - Rajasthan, PIN - 327001, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Phone className="w-5 h-5 text-[#937418] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-950 block text-xs uppercase tracking-wide">
                      Direct Phone & WhatsApp
                    </strong>
                    <a
                      href={`tel:${settings.phone}`}
                      className="text-neutral-900 font-bold hover:text-[#937418] block text-sm mt-0.5 font-mono"
                    >
                      {settings.phone} (Himanshu Tirgar)
                    </a>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Laxman Tirgar: 9828576885, 8829025588
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Mail className="w-5 h-5 text-[#937418] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-950 block text-xs uppercase tracking-wide">
                      Email Address
                    </strong>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-neutral-900 hover:text-[#937418] block mt-0.5"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Clock className="w-5 h-5 text-[#937418] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-950 block text-xs uppercase tracking-wide">
                      Workshop Consultation Hours
                    </strong>
                    <p className="mt-0.5 text-neutral-600">
                      Monday to Saturday: 8:00 AM – 8:00 PM IST<br />
                      Sunday: 10:00 AM – 4:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="pt-2 border-t border-neutral-300">
                <a
                  href={`https://wa.me/919571030853?text=${encodeURIComponent('Hello Himanshu ji, I would like to inquire about Tirgar bows and arrows.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#1ebc59] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp (+91 95710 30853)</span>
                </a>
              </div>
            </div>

            {/* Pan-India Delivery Assurance */}
            <div className="bg-[#171717] text-white p-5 border border-[#D4AF37]/30 space-y-2">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                Pan-India Express Delivery
              </h3>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
                We deliver to all states and union territories across India through specialized courier partners. High-durability wooden casing protects bows from bend or impact during transit.
              </p>
            </div>
          </div>

          {/* Right: Working Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 border border-neutral-200 shadow-sm">
              <h2 className="font-display font-bold text-lg uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-3 mb-6">
                Send an Inquiry to the Workshop
              </h2>

              {sent ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-lg uppercase text-neutral-900">
                    Inquiry Transmitted
                  </h3>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                    Thank you, {name}. Himanshu Tirgar will respond to your inquiry via phone or WhatsApp shortly.
                  </p>
                  <div className="pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-[#1ebc59] transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>Also Open in WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Maharana Pratap Academy"
                        className="w-full bg-[#F7F4ED] border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                        Mobile Number / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="e.g. 9829012345"
                        className="w-full bg-[#F7F4ED] border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Bulk Order Inquiry">Bulk Academy / Club Order</option>
                      <option value="Custom Bow Commission">Custom Bow Commission</option>
                      <option value="Arrow Spine & Tips Inquiry">Arrow Spine & Tips Inquiry</option>
                      <option value="Workshop Visit Appointment">Workshop Visit Appointment (Banswara)</option>
                      <option value="Order Dispatch Status">Order Dispatch Status</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Message / Requirement Details *
                    </label>
                    <textarea
                      rows={5}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Describe what you are looking for: number of bows, draw weight, target range, or specific wood finish..."
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-3 text-xs focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#171717] hover:bg-[#D4AF37] hover:text-neutral-950 text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                      <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Send Workshop Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
