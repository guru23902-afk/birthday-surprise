"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Download, Upload, Plus, Trash2, Settings } from "lucide-react";
import type { BirthdayConfig } from "@/types";
import defaultData from "@/config/data.json";

export default function AdminPage() {
  const [config, setConfig] = useState<BirthdayConfig>(defaultData as BirthdayConfig);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "letter" | "photos" | "timeline" | "reasons" | "music" | "gift" | "notes" | "theme">("basic");

  const update = (path: string, value: unknown) => {
    const keys = path.split(".");
    setConfig((prev) => {
      const next = { ...prev };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { key: "basic", label: "Basic Info", icon: "👤" },
    { key: "letter", label: "Letter", icon: "💌" },
    { key: "photos", label: "Photos", icon: "📸" },
    { key: "timeline", label: "Timeline", icon: "🗺️" },
    { key: "reasons", label: "Reasons", icon: "✨" },
    { key: "music", label: "Music", icon: "🎵" },
    { key: "gift", label: "Gift Box", icon: "🎁" },
    { key: "notes", label: "Memory Wall", icon: "📝" },
    { key: "theme", label: "Theme", icon: "🎨" },
  ] as const;

  const inputClass = "w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1";

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="font-display text-3xl gradient-text font-bold">Admin Panel</h1>
            <p className="text-gray-500 text-sm mt-1">Customize your birthday surprise website</p>
          </div>
          <div className="flex gap-3">
            <a
              href="/"
              className="px-4 py-2 rounded-xl glass border border-white/20 text-gray-600 text-sm hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              👁️ Preview
            </a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadJson}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-white text-sm font-medium shadow-glow"
              style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899)" }}
            >
              {saved ? <Save size={16} /> : <Download size={16} />}
              {saved ? "Saved!" : "Download JSON"}
            </motion.button>
          </div>
        </motion.div>

        {/* Instructions */}
        <div className="glass rounded-2xl p-4 mb-6 border border-white/30">
          <div className="flex items-start gap-3">
            <Settings size={18} className="text-rose-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              Edit any field below, then click <strong>Download JSON</strong>. Replace the file at{" "}
              <code className="bg-rose-100 px-1 rounded text-rose-600 text-xs">config/data.json</code> with the downloaded file and redeploy to apply changes.
            </p>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "text-white shadow-glow"
                  : "glass text-gray-600 hover:bg-white/30"
              }`}
              style={activeTab === tab.key ? { background: "linear-gradient(135deg, #f43f5e, #ec4899)" } : {}}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 shadow-glass"
        >
          {/* BASIC INFO */}
          {activeTab === "basic" && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold gradient-text mb-4">Basic Information</h2>
              <div>
                <label className={labelClass}>Person's Name *</label>
                <input className={inputClass} value={config.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Sarah" />
              </div>
              <div>
                <label className={labelClass}>Hero Message</label>
                <input className={inputClass} value={config.heroMessage} onChange={(e) => update("heroMessage", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Hero Subheading</label>
                <textarea className={inputClass} rows={2} value={config.heroSubheading} onChange={(e) => update("heroSubheading", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Birthday Date</label>
                <input type="date" className={inputClass} value={config.birthday} onChange={(e) => update("birthday", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Birthday Wish (after blowing candles)</label>
                <textarea className={inputClass} rows={2} value={config.birthdayWish} onChange={(e) => update("birthdayWish", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Closing Message</label>
                <textarea className={inputClass} rows={2} value={config.closingMessage} onChange={(e) => update("closingMessage", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Number of Candles</label>
                <input type="number" min={1} max={20} className={inputClass} value={config.candles} onChange={(e) => update("candles", parseInt(e.target.value))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Days Known</label>
                  <input type="number" className={inputClass} value={config.stats.daysKnown} onChange={(e) => update("stats.daysKnown", parseInt(e.target.value))} />
                </div>
                <div>
                  <label className={labelClass}>Memories Made</label>
                  <input type="number" className={inputClass} value={config.stats.memoriesMade} onChange={(e) => update("stats.memoriesMade", parseInt(e.target.value))} />
                </div>
              </div>
            </div>
          )}

          {/* LETTER */}
          {activeTab === "letter" && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold gradient-text mb-4">Heartfelt Letter</h2>
              <div>
                <label className={labelClass}>Greeting</label>
                <input className={inputClass} value={config.letter.greeting} onChange={(e) => update("letter.greeting", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Letter Body (use \n for new lines)</label>
                <textarea className={inputClass} rows={8} value={config.letter.body} onChange={(e) => update("letter.body", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Signature</label>
                <input className={inputClass} value={config.letter.signature} onChange={(e) => update("letter.signature", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Signature Name</label>
                <input className={inputClass} value={config.letter.signatureName} onChange={(e) => update("letter.signatureName", e.target.value)} />
              </div>
            </div>
          )}

          {/* PHOTOS */}
          {activeTab === "photos" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold gradient-text">Gallery Photos</h2>
                <button
                  onClick={() => update("photos", [...config.photos, { id: Date.now().toString(), src: "", caption: "", date: "" }])}
                  className="flex items-center gap-1 text-sm text-rose-500 hover:text-rose-600"
                >
                  <Plus size={16} /> Add Photo
                </button>
              </div>
              {config.photos.map((photo, i) => (
                <div key={photo.id} className="bg-white/20 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Photo {i + 1}</span>
                    <button
                      onClick={() => update("photos", config.photos.filter((_, idx) => idx !== i))}
                      className="text-red-400 hover:text-red-500"
                      aria-label={`Remove photo ${i + 1}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <input
                    className={inputClass}
                    placeholder="Image URL (e.g. https://... or /images/photo.jpg)"
                    value={photo.src}
                    onChange={(e) => {
                      const updated = [...config.photos];
                      updated[i] = { ...updated[i], src: e.target.value };
                      update("photos", updated);
                    }}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className={inputClass}
                      placeholder="Caption"
                      value={photo.caption}
                      onChange={(e) => {
                        const updated = [...config.photos];
                        updated[i] = { ...updated[i], caption: e.target.value };
                        update("photos", updated);
                      }}
                    />
                    <input
                      className={inputClass}
                      placeholder="Date (e.g. June 2023)"
                      value={photo.date}
                      onChange={(e) => {
                        const updated = [...config.photos];
                        updated[i] = { ...updated[i], date: e.target.value };
                        update("photos", updated);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TIMELINE */}
          {activeTab === "timeline" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold gradient-text">Timeline Events</h2>
                <button
                  onClick={() => update("timeline", [...config.timeline, { id: Date.now().toString(), date: "", title: "", description: "", emoji: "⭐", photo: null }])}
                  className="flex items-center gap-1 text-sm text-rose-500 hover:text-rose-600"
                >
                  <Plus size={16} /> Add Event
                </button>
              </div>
              {config.timeline.map((item, i) => (
                <div key={item.id} className="bg-white/20 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Event {i + 1}</span>
                    <button
                      onClick={() => update("timeline", config.timeline.filter((_, idx) => idx !== i))}
                      className="text-red-400 hover:text-red-500"
                      aria-label={`Remove event ${i + 1}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <input className={inputClass} placeholder="Date" value={item.date} onChange={(e) => { const u = [...config.timeline]; u[i] = { ...u[i], date: e.target.value }; update("timeline", u); }} />
                    <input className={inputClass} placeholder="Emoji" value={item.emoji} onChange={(e) => { const u = [...config.timeline]; u[i] = { ...u[i], emoji: e.target.value }; update("timeline", u); }} />
                    <input className={inputClass} placeholder="Title" value={item.title} onChange={(e) => { const u = [...config.timeline]; u[i] = { ...u[i], title: e.target.value }; update("timeline", u); }} />
                  </div>
                  <textarea className={inputClass} rows={2} placeholder="Description" value={item.description} onChange={(e) => { const u = [...config.timeline]; u[i] = { ...u[i], description: e.target.value }; update("timeline", u); }} />
                </div>
              ))}
            </div>
          )}

          {/* REASONS */}
          {activeTab === "reasons" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold gradient-text">Flip Cards — Reasons They're Special</h2>
                <button
                  onClick={() => update("specialReasons", [...config.specialReasons, { id: Date.now().toString(), icon: "✨", title: "", message: "" }])}
                  className="flex items-center gap-1 text-sm text-rose-500 hover:text-rose-600"
                >
                  <Plus size={16} /> Add Card
                </button>
              </div>
              {config.specialReasons.map((r, i) => (
                <div key={r.id} className="bg-white/20 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Card {i + 1}</span>
                    <button onClick={() => update("specialReasons", config.specialReasons.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-500" aria-label={`Remove card ${i + 1}`}><Trash2 size={14} /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input className={inputClass} placeholder="Emoji Icon" value={r.icon} onChange={(e) => { const u = [...config.specialReasons]; u[i] = { ...u[i], icon: e.target.value }; update("specialReasons", u); }} />
                    <input className={inputClass} placeholder="Title" value={r.title} onChange={(e) => { const u = [...config.specialReasons]; u[i] = { ...u[i], title: e.target.value }; update("specialReasons", u); }} />
                  </div>
                  <textarea className={inputClass} rows={3} placeholder="Back message" value={r.message} onChange={(e) => { const u = [...config.specialReasons]; u[i] = { ...u[i], message: e.target.value }; update("specialReasons", u); }} />
                </div>
              ))}
            </div>
          )}

          {/* MUSIC */}
          {activeTab === "music" && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold gradient-text mb-4">Background Music</h2>
              <div className="bg-blue-50 rounded-xl p-3 mb-4">
                <p className="text-sm text-blue-600">Place your MP3 file in the <code className="bg-blue-100 px-1 rounded">/public/music/</code> folder and update the path below.</p>
              </div>
              <div>
                <label className={labelClass}>Music File Path</label>
                <input className={inputClass} placeholder="/music/birthday.mp3" value={config.music.src} onChange={(e) => update("music.src", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Song Title</label>
                <input className={inputClass} value={config.music.title} onChange={(e) => update("music.title", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Artist Name</label>
                <input className={inputClass} value={config.music.artist} onChange={(e) => update("music.artist", e.target.value)} />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="autoplay"
                  checked={config.music.autoplay}
                  onChange={(e) => update("music.autoplay", e.target.checked)}
                  className="accent-rose-500 w-4 h-4"
                />
                <label htmlFor="autoplay" className="text-sm text-gray-600">Autoplay on page load</label>
              </div>
            </div>
          )}

          {/* GIFT BOX */}
          {activeTab === "gift" && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold gradient-text mb-4">Surprise Gift Box</h2>
              <div>
                <label className={labelClass}>Gift Title</label>
                <input className={inputClass} value={config.giftBox.title} onChange={(e) => update("giftBox.title", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Gift Message</label>
                <textarea className={inputClass} rows={5} value={config.giftBox.message} onChange={(e) => update("giftBox.message", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Reveal Emoji</label>
                <input className={inputClass} value={config.giftBox.revealEmoji} onChange={(e) => update("giftBox.revealEmoji", e.target.value)} />
              </div>
            </div>
          )}

          {/* MEMORY NOTES */}
          {activeTab === "notes" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold gradient-text">Memory Wall Notes</h2>
                <button
                  onClick={() => update("memoryWall", [...config.memoryWall, { id: Date.now().toString(), note: "", color: "#fce7f3" }])}
                  className="flex items-center gap-1 text-sm text-rose-500 hover:text-rose-600"
                >
                  <Plus size={16} /> Add Note
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {config.memoryWall.map((note, i) => (
                  <div key={note.id} className="rounded-xl p-3 space-y-2" style={{ background: note.color + "80" }}>
                    <div className="flex items-center justify-between">
                      <input type="color" value={note.color} className="w-6 h-6 rounded cursor-pointer" onChange={(e) => { const u = [...config.memoryWall]; u[i] = { ...u[i], color: e.target.value }; update("memoryWall", u); }} aria-label="Note color" />
                      <button onClick={() => update("memoryWall", config.memoryWall.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-500" aria-label={`Remove note ${i + 1}`}><Trash2 size={14} /></button>
                    </div>
                    <textarea
                      className="w-full bg-transparent text-sm text-gray-700 resize-none focus:outline-none font-hand"
                      rows={2}
                      placeholder="Memory note..."
                      value={note.note}
                      onChange={(e) => { const u = [...config.memoryWall]; u[i] = { ...u[i], note: e.target.value }; update("memoryWall", u); }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* THEME */}
          {activeTab === "theme" && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold gradient-text mb-4">Color Theme</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "theme.primaryColor", label: "Primary Color" },
                  { key: "theme.secondaryColor", label: "Secondary Color" },
                  { key: "theme.accentColor", label: "Accent Color" },
                  { key: "theme.bgFrom", label: "Background From" },
                  { key: "theme.bgTo", label: "Background To" },
                ] .map((c) => (
                  <div key={c.key}>
                    <label className={labelClass}>{c.label}</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={c.key.split(".").reduce((obj: Record<string, unknown>, k) => (obj as Record<string, unknown>)[k] as Record<string, unknown>, config as unknown as Record<string, unknown>) as string}
                        onChange={(e) => update(c.key, e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border border-white/20"
                        aria-label={c.label}
                      />
                      <input
                        className={`${inputClass} flex-1`}
                        value={c.key.split(".").reduce((obj: Record<string, unknown>, k) => (obj as Record<string, unknown>)[k] as Record<string, unknown>, config as unknown as Record<string, unknown>) as string}
                        onChange={(e) => update(c.key, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-yellow-50 rounded-xl p-3 mt-4">
                <p className="text-sm text-yellow-700">
                  <Upload size={14} className="inline mr-1" />
                  After updating colors, download the JSON and update the config file. For full theme customization, also update tailwind.config.ts.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm font-body">
          <p>After making changes, download the JSON and replace <code className="bg-rose-100 text-rose-600 px-1 rounded text-xs">config/data.json</code></p>
        </div>
      </div>
    </div>
  );
}
