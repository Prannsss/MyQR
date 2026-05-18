"use client";
import { useEffect, useRef, useState } from "react";
import type QRCodeStyling from "qr-code-styling";
import type { Options } from "qr-code-styling";
import { AlertCircle, ZoomIn, ZoomOut, RotateCcw, RotateCw, QrCode } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "motion/react";

interface PreviewPanelProps {
  qrCode: QRCodeStyling | null;
  options: Options;
  warning: boolean;
  onOptionsChange: (options: Options) => void;
}

export function PreviewPanel({ qrCode, options, warning, onOptionsChange }: PreviewPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (ref.current && qrCode && options.data) {
      ref.current.innerHTML = '';
      qrCode.append(ref.current);
    }
  }, [qrCode, ref, options.data]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-8">
      {warning && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-orange-500/10 text-orange-600 px-4 py-2 rounded-lg border border-orange-500/20 z-20 text-sm">
          <AlertCircle className="size-4" />
          <span>Low contrast may affect scannability</span>
        </div>
      )}

      {/* Main Canvas Area */}
      <div className="flex-1 flex items-center justify-center w-full relative overflow-hidden min-h-[300px]">
        <motion.div 
          drag={!!options.data}
          dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
          dragElastic={0.2}
          whileTap={options.data ? { cursor: "grabbing" } : undefined}
          style={{ cursor: options.data ? 'grab' : 'default' }}
          className="flex items-center justify-center drop-shadow-2xl"
          animate={{ scale, rotate: rotation }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Glass background for the QR container to make it look premium */}
          <div className="p-8 rounded-3xl bg-black/5 backdrop-blur-sm border border-black/10 overflow-hidden relative group">
             {/* The actual QR Code injects here */}
             {options.data ? (
               <div ref={ref} className="pointer-events-none qr-container-override" />
             ) : (
               <div className="w-[300px] h-[300px] flex items-center justify-center bg-white rounded-2xl shadow-sm border border-black/5">
                 <QrCode className="size-32 text-black/10" strokeWidth={1} />
               </div>
             )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Zoom & Rotate Bar */}
      <div className="flex flex-wrap shadow-xl items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/10 z-20">
        <Tooltip>
          <TooltipTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full" })} onClick={() => setScale(s => Math.max(0.5, s - 0.1))}>
            <ZoomOut className="size-4" />
          </TooltipTrigger>
          <TooltipContent>Zoom Out</TooltipContent>
        </Tooltip>
        
        <span className="text-xs font-medium w-12 text-center text-zinc-700">
          {Math.round(scale * 100)}%
        </span>

        <Tooltip>
          <TooltipTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full" })} onClick={() => setScale(s => Math.min(2, s + 0.1))}>
            <ZoomIn className="size-4" />
          </TooltipTrigger>
          <TooltipContent>Zoom In</TooltipContent>
        </Tooltip>

        <div className="w-[1px] h-4 bg-black/20 mx-1" />

        <Tooltip>
          <TooltipTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full" })} onClick={() => setRotation(r => r - 90)}>
            <RotateCcw className="size-4" />
          </TooltipTrigger>
          <TooltipContent>Rotate Left</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full" })} onClick={() => setRotation(r => r + 90)}>
            <RotateCw className="size-4" />
          </TooltipTrigger>
          <TooltipContent>Rotate Right</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
