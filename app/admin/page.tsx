"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaImages, FaVideo, FaShieldAlt, FaUpload, FaCheckCircle } from "react-icons/fa";

interface CollectionItem {
  _id: string;
  title: string;
  category: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"collection" | "webinar">("collection");

  // Collection state
  const [colTitle, setColTitle] = useState("");
  const [colCategory, setColCategory] = useState("");
  const [colLocation, setColLocation] = useState("");
  const [colEdition, setColEdition] = useState("Limited 10 Prints");
  const [colSrc, setColSrc] = useState("");
  const [colUploading, setColUploading] = useState(false);
  const [colMessage, setColMessage] = useState("");

  // Webinar state
  const [collectionsList, setCollectionsList] = useState<CollectionItem[]>([]);
  const [webLoading, setWebLoading] = useState(false);
  const [webUploading, setWebUploading] = useState(false);
  const [webMessage, setWebMessage] = useState("");
  const [webData, setWebData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    speaker: "",
    image: "",
    googleFormUrl: "",
    hasCollectionToggle: false,
    collectionId: "",
    showEthics: true,
    ethicsContent:
      "Our wildlife photography masterclasses strictly adhere to ethical field practices—zero baiting, respecting natural animal corridors, and minimal habitat footprint.",
  });

  useEffect(() => {
    // Fetch collections for webinar dropdown
    fetch("/api/collection")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCollectionsList(data);
      })
      .catch((err) => console.error("Failed to fetch collections", err));
  }, []);

  // Handle Collection File Upload
  const handleColFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setColUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/api/collection/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data && res.data.url) {
        setColSrc(res.data.url);
      }
    } catch (err) {
      console.warn("Upload warning, using local file preview fallback:", err);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setColSrc(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setColUploading(false);
    }
  };

  // Handle Webinar Banner Image Upload
  const handleWebFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setWebUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/api/collection/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data && res.data.url) {
        setWebData((prev) => ({ ...prev, image: res.data.url }));
      }
    } catch (err) {
      console.warn("Upload warning, using local file preview fallback:", err);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setWebData((prev) => ({ ...prev, image: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setWebUploading(false);
    }
  };

  // Handle Collection Submit
  const handleCollectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!colTitle || !colCategory) return;
    setColMessage("");

    const fileInput = document.getElementById("adminColFileInput") as HTMLInputElement;
    const file = fileInput?.files?.[0];

    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("title", colTitle);
    formData.append("category", colCategory);
    formData.append("location", colLocation || "Wild Habitat");
    formData.append("edition", colEdition);
    if (colSrc) formData.append("src", colSrc);

    try {
      const res = await axios.post("/api/collection/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200 || res.status === 201) {
        setColMessage("✅ Collection uploaded successfully!");
        setColTitle("");
        setColCategory("");
        setColLocation("");
        setColSrc("");
      }
    } catch (err) {
      console.error("Error uploading collection:", err);
      setColMessage("❌ Failed to upload collection.");
    }
  };

  // Handle Webinar Submit
  const handleWebinarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWebLoading(true);
    setWebMessage("");

    try {
      const res = await fetch("/api/webinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webData),
      });

      if (res.ok) {
        setWebMessage("✅ Webinar published successfully!");
        setWebData({
          title: "",
          description: "",
          date: "",
          time: "",
          speaker: "",
          image: "",
          googleFormUrl: "",
          hasCollectionToggle: false,
          collectionId: "",
          showEthics: true,
          ethicsContent:
            "Our wildlife photography masterclasses strictly adhere to ethical field practices—zero baiting, respecting natural animal corridors, and minimal habitat footprint.",
        });
      } else {
        setWebMessage("❌ Failed to publish webinar.");
      }
    } catch (err) {
      console.error(err);
      setWebMessage("❌ Error publishing webinar.");
    } finally {
      setWebLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-12 max-w-5xl mx-auto">
      {/* Page Title */}
      <div className="text-center mb-10">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">
          Master Admin Control Panel
        </p>
        <h1 className="font-sans text-3xl sm:text-4xl font-extralight uppercase tracking-tight text-white">
          Admin Portal
        </h1>
      </div>

      {/* Two Option Selection Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-neutral-900 border border-white/10 p-1.5 rounded-2xl flex items-center gap-2">
          <button
            onClick={() => setActiveTab("collection")}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === "collection"
                ? "bg-white text-black shadow-lg"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <FaImages className="text-sm" />
            <span>Upload Collection</span>
          </button>

          <button
            onClick={() => setActiveTab("webinar")}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer ${
              activeTab === "webinar"
                ? "bg-white text-black shadow-lg"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <FaVideo className="text-sm" />
            <span>Upload Webinar</span>
          </button>
        </div>
      </div>

      {/* OPTION 1: Collection Upload Form */}
      {activeTab === "collection" && (
        <div className="bg-neutral-950 border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-md space-y-6">
          <div className="border-b border-white/10 pb-4 flex items-center justify-between">
            <h2 className="text-xl font-light uppercase tracking-wide text-white flex items-center gap-3">
              <FaImages className="text-white/70" /> Upload Fine Art Collection
            </h2>
            <span className="text-xs text-white/40 uppercase tracking-widest">Option 1</span>
          </div>

          {colMessage && (
            <div className="p-4 rounded bg-white/10 border border-white/20 text-sm text-white">
              {colMessage}
            </div>
          )}

          <form onSubmit={handleCollectionSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
                  Artwork Title
                </label>
                <input
                  type="text"
                  required
                  value={colTitle}
                  onChange={(e) => setColTitle(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                  placeholder="e.g. Apex Monarch"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  required
                  value={colCategory}
                  onChange={(e) => setColCategory(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                  placeholder="e.g. Wildlife, Big Cats, Marine"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={colLocation}
                  onChange={(e) => setColLocation(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                  placeholder="e.g. Spiti Valley"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
                  Edition Type
                </label>
                <input
                  type="text"
                  value={colEdition}
                  onChange={(e) => setColEdition(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                  placeholder="e.g. Limited 10 Prints"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
                  Upload Image File
                </label>
                <input
                  id="adminColFileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleColFileChange}
                  className="w-full bg-black border border-white/20 rounded px-4 py-2 text-xs text-white file:mr-4 file:py-1 file:px-3 file:border-0 file:text-xs file:bg-white/10 file:text-white cursor-pointer"
                />
                {colUploading && (
                  <p className="text-[10px] uppercase tracking-widest text-white/50 animate-pulse mt-1">
                    Uploading image...
                  </p>
                )}
                {colSrc && !colUploading && (
                  <p className="text-[10px] uppercase tracking-widest text-emerald-400 mt-1 flex items-center gap-1">
                    <FaCheckCircle /> Ready to submit
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
                  Or Image URL Preview
                </label>
                <input
                  type="text"
                  value={colSrc}
                  onChange={(e) => setColSrc(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                  placeholder="/Images/cat1.jpeg or URL"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-white text-black font-semibold uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <FaUpload />
              <span>Publish Collection to Website</span>
            </button>
          </form>
        </div>
      )}

      {/* OPTION 2: Webinar Upload Form */}
      {activeTab === "webinar" && (
        <div className="bg-neutral-950 border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-md space-y-6">
          <div className="border-b border-white/10 pb-4 flex items-center justify-between">
            <h2 className="text-xl font-light uppercase tracking-wide text-white flex items-center gap-3">
              <FaVideo className="text-emerald-400" /> Upload Live Webinar
            </h2>
            <span className="text-xs text-emerald-400 uppercase tracking-widest">Option 2</span>
          </div>

          {webMessage && (
            <div className="p-4 rounded bg-white/10 border border-white/20 text-sm text-white">
              {webMessage}
            </div>
          )}

          <form onSubmit={handleWebinarSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
                Webinar Title
              </label>
              <input
                type="text"
                required
                value={webData.title}
                onChange={(e) => setWebData({ ...webData, title: e.target.value })}
                className="w-full bg-black border border-white/20 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                placeholder="e.g. Masterclass: Himalayan Wildlife Tracking"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
                  Live Date
                </label>
                <input
                  type="date"
                  required
                  value={webData.date}
                  onChange={(e) => setWebData({ ...webData, date: e.target.value })}
                  className="w-full bg-black border border-white/20 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
                  Live Time
                </label>
                <input
                  type="text"
                  required
                  value={webData.time}
                  onChange={(e) => setWebData({ ...webData, time: e.target.value })}
                  className="w-full bg-black border border-white/20 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                  placeholder="e.g. 06:00 PM IST"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
                  Host / Speaker Name
                </label>
                <input
                  type="text"
                  required
                  value={webData.speaker}
                  onChange={(e) => setWebData({ ...webData, speaker: e.target.value })}
                  className="w-full bg-black border border-white/20 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                  placeholder="e.g. Lead Photographer"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
                  Attach Google Form Link (Registration URL)
                </label>
                <input
                  type="url"
                  required
                  value={webData.googleFormUrl}
                  onChange={(e) => setWebData({ ...webData, googleFormUrl: e.target.value })}
                  className="w-full bg-black border border-white/20 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                  placeholder="https://forms.google.com/..."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
                Upload Webinar Banner Image
              </label>
              <input
                id="adminWebFileInput"
                type="file"
                accept="image/*"
                onChange={handleWebFileChange}
                className="w-full bg-black border border-white/20 rounded px-4 py-2 text-xs text-white file:mr-4 file:py-1 file:px-3 file:border-0 file:text-xs file:bg-white/10 file:text-white cursor-pointer"
              />
              {webUploading && (
                <p className="text-[10px] uppercase tracking-widest text-white/50 animate-pulse mt-1">
                  Uploading banner image...
                </p>
              )}
              {webData.image && !webUploading && (
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
                value={webData.description}
                onChange={(e) => setWebData({ ...webData, description: e.target.value })}
                className="w-full bg-black border border-white/20 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                placeholder="Overview of the live masterclass..."
              />
            </div>

            {/* Toggle Collection Connection */}
            <div className="border-t border-white/10 pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="hasColToggle"
                  checked={webData.hasCollectionToggle}
                  onChange={(e) => setWebData({ ...webData, hasCollectionToggle: e.target.checked })}
                  className="w-4 h-4 accent-white cursor-pointer"
                />
                <label htmlFor="hasColToggle" className="text-sm font-medium text-white cursor-pointer">
                  Connect Upload Collection to this Webinar?
                </label>
              </div>

              {webData.hasCollectionToggle && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
                    Choose Collection
                  </label>
                  <select
                    value={webData.collectionId}
                    onChange={(e) => setWebData({ ...webData, collectionId: e.target.value })}
                    className="w-full bg-black border border-white/20 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                  >
                    <option value="">-- Select Collection --</option>
                    {collectionsList.map((col) => (
                      <option key={col._id} value={col._id}>
                        {col.title} ({col.category})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Toggle Ethics Section */}
            <div className="border-t border-white/10 pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="showEthToggle"
                  checked={webData.showEthics}
                  onChange={(e) => setWebData({ ...webData, showEthics: e.target.checked })}
                  className="w-4 h-4 accent-white cursor-pointer"
                />
                <label htmlFor="showEthToggle" className="text-sm font-medium text-white cursor-pointer flex items-center gap-2">
                  <FaShieldAlt className="text-emerald-400" /> Show Ethics Part on Webinar Card?
                </label>
              </div>

              {webData.showEthics && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/70 mb-2">
                    Ethics Guidelines / Statement
                  </label>
                  <textarea
                    rows={2}
                    value={webData.ethicsContent}
                    onChange={(e) => setWebData({ ...webData, ethicsContent: e.target.value })}
                    className="w-full bg-black border border-white/20 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={webLoading}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold uppercase tracking-widest rounded-xl transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-lg"
            >
              <FaVideo />
              <span>{webLoading ? "Publishing..." : "Publish Webinar to Website"}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
