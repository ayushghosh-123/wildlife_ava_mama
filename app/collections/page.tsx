"use client";

import { useState, useEffect , Suspense} from "react";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface WorkItem {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  src: string;
  edition: string;
  location: string;
}

function CollectionsInner() {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/api/collection/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data && res.data.url) {
        setNewSrc(res.data.url);
      } else {
        throw new Error("No URL returned from upload");
      }
    } catch (err) {
      console.warn("ImageKit upload warning, using local file preview fallback:", err);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setNewSrc(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("admin") === "true") {
      setIsAdmin(true);
      setIsAdminOpen(true);
      window.history.replaceState({}, "", "/collections");
    }
  }, [searchParams]);


  useEffect(() => {
    async function fetchCollections() {
      try {
        setLoading(true);
        const res = await axios.get("/api/collection");
        if (Array.isArray(res.data) && res.data.length > 0) {
          setWorks(res.data);
        }
      } catch (err) {
        console.error("Failed to load collections via Axios", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
  }, []);

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newEdition, setNewEdition] = useState("Limited 10 Prints");
  const [newSrc, setNewSrc] = useState("");

  const dynamicCategories = ["All", ...Array.from(new Set(works.map((w) => w.category).filter(Boolean)))];

  const filteredWorks = works.filter((work) => {
    const matchesCategory =
      selectedCategory === "All" || work.category.toLowerCase() === selectedCategory.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      work.title.toLowerCase().includes(q) ||
      work.location.toLowerCase().includes(q) ||
      work.category.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const handleAddWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCategory) return;

    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file) {
      alert("Please select an image file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", newTitle);
    formData.append("category", newCategory);
    formData.append("location", newLocation || "Wild Habitat");
    formData.append("edition", newEdition);

    try {
      const res = await axios.post("/api/collection/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.collection) {
        setWorks([res.data.collection, ...works]);
      }
    } catch (err) {
      console.error("Error uploading:", err);
    }

    setNewTitle("");
    setNewCategory("");
    setNewLocation("");
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col font-sans">
      <main className="flex-1 pt-32 pb-24 px-6 sm:px-12 max-w-7xl mx-auto w-full">

        {/* Page Header */}
        <div className="mb-12 border-b border-white/10 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/50 mb-2">
              Complete Archive
            </p>
            <h1 className="font-sans text-[36px] sm:text-[48px] font-extralight uppercase tracking-tight text-white">
              Fine Art Collections
            </h1>
          </div>

          <div className="flex flex-col sm:items-end gap-3">
            <p className="font-sans text-[12px] text-white/40 max-w-xs font-light leading-relaxed">
              Every photograph is printed on Museum-grade Hahnemühle Photo Rag paper.
            </p>
            {isAdmin && (
              <button
                onClick={() => setIsAdminOpen(!isAdminOpen)}
                className="font-sans text-[9px] uppercase tracking-[0.2em] px-4 py-2 border border-white/20 hover:border-white text-white/70 hover:text-white transition-colors self-start sm:self-auto"
              >
                {isAdminOpen ? "✕ Close Admin Panel" : "+ Admin Upload Panel"}
              </button>
            )}
          </div>
        </div>

        {/* Admin Upload Panel */}
        {isAdminOpen && (
          <div className="mb-12 bg-white/[0.04] border border-white/20 p-6 sm:p-8 rounded-none space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-sans text-[14px] uppercase tracking-[0.2em] text-white font-semibold">
                Admin — Upload New Fine Art Print
              </h3>
              <button
                onClick={() => setIsAdminOpen(false)}
                className="text-xs text-white/50 hover:text-white uppercase tracking-wider"
              >
                ✕ Close Panel
              </button>
            </div>

            <form onSubmit={handleAddWork} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-white/50 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Monarch"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-black border border-white/20 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white"
                  required
                />
              </div>

              <div>
                <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-white/50 mb-2">
                  Category (Type Custom Category)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wildlife, Big Cats, Marine"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-black border border-white/20 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white"
                  required
                />
                {dynamicCategories.length > 1 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {dynamicCategories.filter((c) => c !== "All").map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setNewCategory(cat)}
                        className="text-[8px] uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white/70 px-2 py-0.5 rounded-none"
                      >
                        + {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-white/50 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Spiti Valley"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-black border border-white/20 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-white/50 mb-2">
                  Edition Type
                </label>
                <input
                  type="text"
                  placeholder="e.g. Limited 10 Prints"
                  value={newEdition}
                  onChange={(e) => setNewEdition(e.target.value)}
                  className="w-full bg-black border border-white/20 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-white/50 mb-2">
                  Upload Image File
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="w-full bg-black border border-white/20 px-4 py-2.5 text-xs text-white file:mr-4 file:py-1 file:px-3 file:border-0 file:text-xs file:bg-white/10 file:text-white/70"
                />
                {uploading && (
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 animate-pulse mt-1">
                    Uploading to ImageKit...
                  </p>
                )}
                {newSrc && !uploading && (
                  <p className="text-[9px] uppercase tracking-[0.2em] text-green-400 mt-1">
                    ✓ Image uploaded successfully
                  </p>
                )}
              </div>

              <div>
                <label className="block font-sans text-[9px] uppercase tracking-[0.2em] text-white/50 mb-2">
                  Or Image URL
                </label>
                <input
                  type="text"
                  placeholder="e.g. /Images/cat1.jpeg"
                  value={newSrc}
                  onChange={(e) => setNewSrc(e.target.value)}
                  className="w-full bg-black border border-white/20 px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3 pt-2">
                <button
                  type="submit"
                  className="bg-white text-black px-8 py-3 font-sans text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-white/80 transition-colors"
                >
                  Publish to Archive & Database
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Customer Controls */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2">
            {dynamicCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 font-sans text-[9px] uppercase tracking-[0.2em] transition-all ${selectedCategory === cat
                    ? "bg-white text-black font-semibold"
                    : "border border-white/10 text-white/50 hover:text-white hover:border-white/30"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search tags, places, titles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-white/20 px-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40 animate-pulse">
              Loading Fine Art Archive...
            </p>
          </div>
        ) : filteredWorks.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-white/10">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/40">
              No prints found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorks.map((work) => (
              <div
                key={work._id || work.id}
                className="group flex flex-col bg-black border border-white/10 overflow-hidden"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={work.src}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 border border-white/10 z-10">
                    <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/70">
                      {work.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    <h3 className="font-sans text-[18px] font-extralight uppercase tracking-tight text-white">
                      {work.title}
                    </h3>
                    <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/40 mt-1">
                      {work.location}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/50">
                      {work.edition}
                    </span>
                    <Link
                      href="/inquire"
                      className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/80 hover:text-white border-b border-white/30 hover:border-white transition-colors pb-0.5"
                    >
                      Inquire Print →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={null}>
      <CollectionsInner />
    </Suspense>
  );
}