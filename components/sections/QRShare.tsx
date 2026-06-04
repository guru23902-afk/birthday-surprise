"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Download, QrCode } from "lucide-react";

export default function QRShare() {
  const [qrUrl, setQrUrl] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const url = window.location.href;
    setPageUrl(url);
    // Use QR server API for the QR code image
    const encoded = encodeURIComponent(url);
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}&color=f43f5e&bgcolor=fff1f2`);
  }, []);

  const download = () => {
    if (!qrUrl) return;
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "birthday-qr.png";
    a.click();
  };

  return (
    <section
      id="qr"
      ref={ref}
      className="py-16 px-4"
      style={{ background: "linear-gradient(180deg, #f5f3ff 0%, #fdf2f8 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="max-w-sm mx-auto text-center"
      >
        <h2 className="font-display text-3xl gradient-text font-bold mb-2">
          Share This Page 💌
        </h2>
        <p className="text-gray-500 font-body text-sm mb-6">Scan the QR code to share this birthday surprise</p>

        <div className="glass rounded-3xl p-6 shadow-glass inline-block">
          <div className="flex items-center justify-center mb-4">
            <QrCode size={20} className="text-rose-500 mr-2" />
            <span className="font-body text-gray-600 text-sm">Scan to open</span>
          </div>

          {qrUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrUrl}
              alt="QR code for this page"
              width={180}
              height={180}
              className="mx-auto rounded-xl"
            />
          ) : (
            <div className="w-[180px] h-[180px] mx-auto rounded-xl bg-rose-50 animate-pulse flex items-center justify-center">
              <QrCode size={40} className="text-rose-300" />
            </div>
          )}

          <p className="text-xs text-gray-400 mt-3 break-all max-w-[180px] mx-auto">{pageUrl}</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={download}
          className="mt-4 flex items-center gap-2 mx-auto px-6 py-2 rounded-full text-white font-body text-sm shadow-glow"
          style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899)" }}
          aria-label="Download QR code"
        >
          <Download size={16} />
          Download QR Code
        </motion.button>
      </motion.div>
    </section>
  );
}
