import { Github, QrCode } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 h-16 flex items-center justify-between mx-auto max-w-7xl">
        <div className="flex items-center gap-2">
          <div className="size-8 flex items-center justify-center">
            <QrCode className="size-6 text-purple-600" />
          </div>
          <span className="font-bold text-xl tracking-tight">MyQR</span>
        </div>
        
        <nav className="flex items-center gap-4">
          <Link 
            href="https://github.com/Prannsss?utm_source=chatgpt.com" 
            target="_blank" 
            rel="noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm", className: "rounded-full border-black/10 hover:border-black/20 bg-black/5 hover:bg-black/10" })}
          >
            <Github className="size-4 mr-2" />
            Source Code
          </Link>
        </nav>
      </div>
    </header>
  );
}
