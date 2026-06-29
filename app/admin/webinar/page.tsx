"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";

interface CollectionItem {
  _id: string;
  title: string;
  category: string;
}

export default function AdminWebinarPage() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    speaker: "",
    image: "",
    whatsappNumber: "+919531769585",
    hasCollectionToggle: false,
    collectionId: "",
    showEthics: true,
    ethicsContent:
      "Our wildlife photography masterclasses strictly adhere to ethical field practices—zero baiting, respecting natural animal corridors, and minimal habitat footprint.",
  });

  useEffect(() => {
    // Fetch uploaded collections for admin dropdown
    fetch("/api/collection")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCollections(data);
      })
      .catch((err) => console.error("Failed to fetch collections", err));
  }, []);

  // Handle Banner Image File Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);

      const res = await axios.post("/api/collection/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data && res.data.url) {
        setFormData((prev) => ({ ...prev, image: res.data.url }));
      }
    } catch (err) {
      console.warn("Upload warning, using local file preview fallback:", err);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormData((prev) => ({ ...prev, image: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/webinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✅ Webinar published successfully!");
        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          speaker: "",
          image: "",
          whatsappNumber: "+919876543210",
          hasCollectionToggle: false,
          collectionId: "",
          showEthics: true,
          ethicsContent:
            "Our wildlife photography masterclasses strictly adhere to ethical field practices—zero baiting, respecting natural animal corridors, and minimal habitat footprint.",
        });
      } else {
        setMessage("❌ Failed to publish webinar.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error publishing webinar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extralight uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
        Admin Portal · Post Live Webinar
      </h1>

      {message && (
        <div className="mb-6 p-4 rounded bg-white/10 text-white border border-white/20">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-neutral-900/50 p-8 border border-white/10 rounded-xl backdrop-blur-md"
      >
        <div>
          <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
            Webinar Title
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-black/60 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-white"
            placeholder="e.g. Masterclass: Himalayan Wildlife Expeditions"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
              Live Date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-black/60 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-white"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
              Live Time
            </label>
            <input
              type="text"
              required
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full bg-black/60 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-white"
              placeholder="e.g. 06:00 PM IST"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
              Speaker / Host
            </label>
            <input
              type="text"
              required
              value={formData.speaker}
              onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
              className="w-full bg-black/60 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-white"
              placeholder="e.g. Lead Photographer"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
              WhatsApp Contact Number
            </label>
            <input
              type="text"
              required
              value={formData.whatsappNumber}
              onChange={(e) =>
                setFormData({ ...formData, whatsappNumber: e.target.value })
              }
              className="w-full bg-black/60 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-white"
              placeholder="e.g. +919876543210"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
            Upload Webinar Banner Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full bg-black/60 border border-white/20 rounded px-4 py-2 text-xs text-white file:mr-4 file:py-1 file:px-3 file:border-0 file:text-xs file:bg-white/10 file:text-white cursor-pointer"
          />
          {uploading && (
            <p className="text-[10px] uppercase tracking-widest text-white/50 animate-pulse mt-1">
              Uploading banner image...
            </p>
          )}
          {formData.image && !uploading && (
            <p className="text-[10px] uppercase tracking-widest text-emerald-400 mt-1 flex items-center gap-1">
              <FaCheckCircle /> Banner image attached successfully
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
            Description
          </label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full bg-black/60 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-white"
            placeholder="Overview of the live session..."
          />
        </div>

        {/* Collection Toggle Option */}
        <div className="border-t border-white/10 pt-4 space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="collectionToggle"
              checked={formData.hasCollectionToggle}
              onChange={(e) =>
                setFormData({ ...formData, hasCollectionToggle: e.target.checked })
              }
              className="w-4 h-4 accent-white cursor-pointer"
            />
            <label
              htmlFor="collectionToggle"
              className="text-sm font-medium text-white cursor-pointer"
            >
              Connect Upload Collection to this Webinar?
            </label>
          </div>

          {formData.hasCollectionToggle && (
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
                Choose Uploaded Collection
              </label>
              <select
                value={formData.collectionId}
                onChange={(e) =>
                  setFormData({ ...formData, collectionId: e.target.value })
                }
                className="w-full bg-black/80 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-white"
              >
                <option value="">-- Select Collection --</option>
                {collections.map((col) => (
                  <option key={col._id} value={col._id}>
                    {col.title} ({col.category})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Ethics Option */}
        <div className="border-t border-white/10 pt-4 space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="ethicsToggle"
              checked={formData.showEthics}
              onChange={(e) =>
                setFormData({ ...formData, showEthics: e.target.checked })
              }
              className="w-4 h-4 accent-white cursor-pointer"
            />
            <label
              htmlFor="ethicsToggle"
              className="text-sm font-medium text-white cursor-pointer"
            >
              Show Ethics Part on Webinar Card?
            </label>
          </div>

          {formData.showEthics && (
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
                Ethics Statement / Guidelines
              </label>
              <textarea
                rows={2}
                value={formData.ethicsContent}
                onChange={(e) =>
                  setFormData({ ...formData, ethicsContent: e.target.value })
                }
                className="w-full bg-black/60 border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-white text-sm"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-white text-black font-semibold uppercase tracking-widest rounded hover:bg-neutral-200 transition-all duration-300 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Publishing..." : "Publish Live Webinar"}
        </button>
      </form>
    </div>
  );
}
