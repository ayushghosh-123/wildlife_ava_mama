"use client";

import React, { useEffect, useState } from "react";
import {
  FaShieldAlt,
  FaImages,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaExternalLinkAlt,
} from "react-icons/fa";

interface CollectionData {
  _id: string;
  title: string;
  category: string;
  src: string;
}

interface WebinarItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  speaker: string;
  image?: string;
  googleFormUrl?: string;
  whatsappNumber?: string;
  hasCollectionToggle: boolean;
  collectionId?: CollectionData;
  showEthics: boolean;
  ethicsContent?: string;
}

export default function WebinarSection() {
  const [webinars, setWebinars] = useState<WebinarItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/webinar")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setWebinars(data);
      })
      .catch((err) => console.error("Failed to load webinars", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-black w-full py-16 sm:py-24 border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">
              Live Expeditions & Masterclasses
            </p>
            <h2 className="font-sans text-[28px] sm:text-[36px] font-extralight uppercase tracking-tight text-white">
              Scheduled Webinars
            </h2>
          </div>
          <p className="text-xs text-white/40 max-w-md">
            Join live date-wise interactive masterclasses with ethical wildlife practice standards and direct Google Form registration.
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center text-white/40 tracking-widest text-sm uppercase">
            Loading scheduled webinars...
          </div>
        ) : webinars.length === 0 ? (
          <div className="py-12 text-center text-white/40 border border-dashed border-white/10 rounded-xl">
            No live webinars currently scheduled. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {webinars.map((webinar) => {
              const formattedDate = new Date(webinar.date).toLocaleDateString(
                "en-US",
                {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              );

              const formUrl = webinar.googleFormUrl || "#";

              return (
                <div
                  key={webinar._id}
                  className="bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-white/30 transition-all duration-500 shadow-xl"
                >
                  {/* Card Image */}
                  <div className="relative h-[220px] w-full bg-neutral-900 overflow-hidden">
                    <img
                      src={webinar.image || "/Images/bird1.jpeg"}
                      alt={webinar.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />

                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/15 flex items-center gap-2 text-xs text-white/90">
                      <FaCalendarAlt className="text-white/60" />
                      <span>{formattedDate}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-white/50">
                        <span className="flex items-center gap-1.5">
                          <FaClock className="text-white/40" /> {webinar.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FaUser className="text-white/40" /> {webinar.speaker}
                        </span>
                      </div>

                      <h3 className="text-xl font-light uppercase tracking-tight text-white group-hover:text-white/90 transition-colors">
                        {webinar.title}
                      </h3>

                      <p className="text-xs text-white/60 leading-relaxed font-light line-clamp-3">
                        {webinar.description}
                      </p>
                    </div>

                    {/* Collection Connection Badge */}
                    {webinar.hasCollectionToggle && webinar.collectionId && (
                      <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-center gap-3">
                        <FaImages className="text-white/70 shrink-0" />
                        <div className="overflow-hidden text-xs">
                          <span className="text-[10px] uppercase tracking-widest text-white/40 block">
                            Connected Collection
                          </span>
                          <span className="text-white font-medium truncate block">
                            {webinar.collectionId.title} (
                            {webinar.collectionId.category})
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Ethics Section */}
                    {webinar.showEthics && (
                      <div className="bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-lg flex items-start gap-2.5">
                        <FaShieldAlt className="text-emerald-400 shrink-0 mt-0.5 text-sm" />
                        <div className="text-[11px] text-emerald-200/80 leading-relaxed">
                          <strong className="text-emerald-400 font-medium block mb-0.5">
                            Ethics Code:
                          </strong>
                          {webinar.ethicsContent}
                        </div>
                      </div>
                    )}

                    {/* Google Form Registration Button */}
                    <div className="pt-2">
                      <a
                        href={formUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2.5 bg-white hover:bg-neutral-200 text-black py-3 px-4 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg cursor-pointer"
                      >
                        <span>Register via Google Form</span>
                        <FaExternalLinkAlt className="text-xs text-black/70" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
