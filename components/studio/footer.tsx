import { Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-zinc-50 py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10 pointer-events-none" />
      <div className="container max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 z-10 relative">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="size-6 rounded-md bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-xs">QR</div>
          <span>MyQR &copy; {new Date().getFullYear()}</span>
        </div>
        
        <div className="text-sm text-muted-foreground max-w-md text-center">
          Open-source, free forever. Built for the community, ensuring high-quality, heavily customizable QR codes without subscriptions.
        </div>

        <div className="flex items-center gap-4">
          <Link href="https://github.com/Prannsss?utm_source=chatgpt.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm">
            <Github className="size-4" />
            <span>Prannsss</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
