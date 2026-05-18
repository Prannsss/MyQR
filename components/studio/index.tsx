"use client";
import { motion } from "motion/react";
import { useState, useRef, useEffect, useCallback } from "react";
import type QRCodeStyling from "qr-code-styling";
import type { Options } from "qr-code-styling";
import { DataInputPanel } from "./data-input";
import { StylingPanel } from "./styling-panel";
import { PreviewPanel } from "./preview-panel";
import { Header } from "./header";
import { Footer } from "./footer";
import { Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEFAULT_OPTIONS: Options = {
  width: 400,
  height: 400,
  data: "",
  margin: 10,
  qrOptions: {
    typeNumber: 0,
    mode: "Byte",
    errorCorrectionLevel: "H",
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 10,
    crossOrigin: "anonymous",
  },
  dotsOptions: {
    type: "rounded",
    color: "#000000",
  },
  backgroundOptions: {
    color: "#ffffff",
  },
  cornersSquareOptions: {
    type: "extra-rounded",
    color: "#000000",
  },
  cornersDotOptions: {
    type: "dot",
    color: "#000000",
  },
};

export function Studio() {
  const [options, setOptions] = useState<Options>(DEFAULT_OPTIONS);
  const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);
  const [hasScannabilityWarning, setHasScannabilityWarning] = useState(false);
  const [downloading, setDownloading] = useState("");

  const handleDataChange = useCallback((data: string) => {
    setOptions(prev => prev.data === data ? prev : { ...prev, data });
  }, []);

  const handleOptionsChange = useCallback((newOptions: Partial<Options>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  }, []);

  useEffect(() => {
    // Import and initialize on client side only
    import('qr-code-styling').then(({ default: QRCodeStylingClass }) => {
      setQrCode(new QRCodeStylingClass(DEFAULT_OPTIONS));
    });
  }, []);

  // Update QR Code exactly when options change
  useEffect(() => {
    if (!qrCode) return;

    // Naive scannability check
    const bg = options.backgroundOptions?.color || '';
    const fg = options.dotsOptions?.color || '';
    
    // Very simple heuristic: warn if colors are identical or very similar hex (e.g. both start with #000 or #FFF)
    if (bg !== 'transparent' && bg.length >= 4 && fg.length >= 4 && bg.slice(0,3).toLowerCase() === fg.slice(0,3).toLowerCase()) {
      setHasScannabilityWarning(true);
    } else {
      setHasScannabilityWarning(false);
    }

    const timeoutId = setTimeout(() => {
      qrCode.update(options);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [qrCode, options]);

  const handleDownload = async (ext: any) => {
    if (!qrCode) return;
    setDownloading(ext);
    await new Promise(r => setTimeout(r, 400));
    qrCode.download({ name: "MyQR", extension: ext });
    setDownloading("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 flex flex-col lg:flex-row relative z-0 mt-0 lg:mt-4 p-4 gap-4 max-w-[1600px] mx-auto w-full">
        {/* Left Sidebar - Data */}
        <motion.aside 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full lg:w-[350px] shrink-0 border border-black/5 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 flex flex-col gap-4 z-10 hidden-scrollbar overflow-y-auto max-h-[calc(100vh-8rem)]"
        >
          <DataInputPanel 
            data={options.data as string} 
            onChange={handleDataChange} 
          />
        </motion.aside>

        {/* Center - Preview */}
        <div className="flex-1 flex flex-col gap-4">
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex flex-col items-center justify-center min-h-[500px] border border-black/5 bg-black/[0.02] rounded-2xl p-8 relative overflow-hidden glass"
          >
             <PreviewPanel 
                qrCode={qrCode} 
                options={options} 
                warning={hasScannabilityWarning} 
                onOptionsChange={setOptions}
             />
          </motion.section>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-3 bg-white/90 backdrop-blur-xl p-2 rounded-2xl border border-black/10 shadow-sm mx-auto"
           >
             <div className="px-4 text-sm font-medium text-zinc-500 border-r border-black/10">Export</div>
             <Button 
               variant="ghost" 
               size="sm" 
               className="text-zinc-700 hover:bg-black/5 rounded-xl"
               onClick={() => handleDownload("png")}
               disabled={!!downloading}
             >
               {downloading === "png" ? <Check className="size-4 mr-2 text-green-600" /> : <Download className="size-4 mr-2" />}
               PNG
             </Button>
             <Button 
               variant="ghost" 
               size="sm" 
               className="text-zinc-700 hover:bg-black/5 rounded-xl"
               onClick={() => handleDownload("svg")}
               disabled={!!downloading}
             >
               {downloading === "svg" ? <Check className="size-4 mr-2 text-green-600" /> : <Download className="size-4 mr-2" />}
               SVG
             </Button>
             <Button 
               variant="ghost" 
               size="sm" 
               className="text-zinc-700 hover:bg-black/5 rounded-xl"
               onClick={() => handleDownload("webp")}
               disabled={!!downloading}
             >
               {downloading === "webp" ? <Check className="size-4 mr-2 text-green-600" /> : <Download className="size-4 mr-2" />}
               WEBP
             </Button>
          </motion.div>
        </div>

        {/* Right Sidebar - Styling */}
        <motion.aside 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full lg:w-[400px] shrink-0 border border-black/5 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 flex flex-col gap-4 z-10 hidden-scrollbar overflow-y-auto max-h-[calc(100vh-8rem)]"
        >
          <StylingPanel 
            options={options} 
            onChange={handleOptionsChange} 
          />
        </motion.aside>
      </main>

      <Footer />
    </div>
  );
}
