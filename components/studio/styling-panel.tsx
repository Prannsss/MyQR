"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import type { Options } from "qr-code-styling";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface StylingPanelProps {
  options: Options;
  onChange: (options: Partial<Options>) => void;
}

const DOT_TYPES = ['rounded', 'dots', 'classy', 'classy-rounded', 'square', 'extra-rounded'];
const CORNER_SQUARE_TYPES = ['dot', 'square', 'extra-rounded'];
const CORNER_DOT_TYPES = ['dot', 'square'];

export function StylingPanel({ options, onChange }: StylingPanelProps) {

  const handleColorChange = (key: 'dotsOptions' | 'backgroundOptions' | 'cornersSquareOptions' | 'cornersDotOptions', color: string) => {
    onChange({
      [key]: {
        ...(options[key] as any),
        color
      }
    });
  };

  const handleTypeChange = (key: 'dotsOptions' | 'cornersSquareOptions' | 'cornersDotOptions', type: string) => {
     onChange({
      [key]: {
        ...(options[key] as any),
        type
      }
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
       onChange({
         image: event.target?.result as string
       });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-full">
       <Tabs defaultValue="design" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-zinc-100 p-1 rounded-xl mb-4">
          <TabsTrigger value="design" className="rounded-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white">Design</TabsTrigger>
          <TabsTrigger value="colors" className="rounded-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white">Colors</TabsTrigger>
          <TabsTrigger value="logo" className="rounded-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white">Logo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="design" className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
           
           <Accordion type="single" collapsible>
              <AccordionItem value="pattern" className="border-black/10">
                <AccordionTrigger className="hover:no-underline hover:text-purple-600">Body Pattern</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {DOT_TYPES.map(type => (
                      <Button 
                        key={type}
                        variant="outline" 
                        size="sm"
                        className={`capitalize h-16 ${options.dotsOptions?.type === type ? 'border-purple-500 bg-purple-500/10' : 'border-black/10 bg-black/5 hover:bg-black/10'}`}
                        onClick={() => handleTypeChange('dotsOptions', type)}
                      >
                        {type.replace("-", " ")}
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="eye-frame" className="border-black/10">
                <AccordionTrigger className="hover:no-underline hover:text-purple-600">Eye Frame Shape</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {CORNER_SQUARE_TYPES.map(type => (
                      <Button 
                        key={type}
                        variant="outline" 
                        size="sm"
                        className={`capitalize h-16 ${options.cornersSquareOptions?.type === type ? 'border-purple-500 bg-purple-500/10' : 'border-black/10 bg-black/5 hover:bg-black/10'}`}
                        onClick={() => handleTypeChange('cornersSquareOptions', type)}
                      >
                        {type.replace("-", " ")}
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="eye-ball" className="border-black/10">
                <AccordionTrigger className="hover:no-underline hover:text-purple-600">Eye Ball Shape</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {CORNER_DOT_TYPES.map(type => (
                      <Button 
                        key={type}
                        variant="outline" 
                        size="sm"
                        className={`capitalize h-16 ${options.cornersDotOptions?.type === type ? 'border-purple-500 bg-purple-500/10' : 'border-black/10 bg-black/5 hover:bg-black/10'}`}
                        onClick={() => handleTypeChange('cornersDotOptions', type)}
                      >
                        {type.replace("-", " ")}
                      </Button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
           </Accordion>

        </TabsContent>

         <TabsContent value="colors" className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
           <div className="space-y-3">
             <Label>Body Color</Label>
             <div className="flex items-center gap-3">
               <Input 
                 type="color" 
                 value={options.dotsOptions?.color || "#000000"} 
                 onChange={(e) => handleColorChange('dotsOptions', e.target.value)}
                 className="w-12 h-12 p-1 rounded-xl cursor-pointer bg-zinc-100 border-black/10"
               />
               <Input 
                 type="text" 
                 value={options.dotsOptions?.color || "#000000"} 
                 onChange={(e) => handleColorChange('dotsOptions', e.target.value)}
                 className="flex-1 font-mono uppercase bg-black/5 border-black/10"
               />
             </div>
           </div>

           <div className="space-y-3">
             <Label>Background Color</Label>
             <div className="flex items-center gap-3">
               <Input 
                 type="color" 
                 value={options.backgroundOptions?.color === "transparent" ? "#ffffff" : (options.backgroundOptions?.color || "#ffffff")} 
                 onChange={(e) => handleColorChange('backgroundOptions', e.target.value)}
                 className="w-12 h-12 p-1 rounded-xl cursor-pointer bg-zinc-100 border-black/10"
               />
               <Button 
                 variant="outline"
                 className={`flex-1 ${options.backgroundOptions?.color === "transparent" ? 'bg-purple-600/20 text-purple-600 border-purple-500/30' : 'bg-transparent border-black/10 text-foreground'}`}
                 onClick={() => handleColorChange('backgroundOptions', 'transparent')}
               >
                 Transparent
               </Button>
             </div>
           </div>

           <div className="space-y-3">
             <Label>Eye Frame Color</Label>
             <div className="flex items-center gap-3">
               <Input 
                 type="color" 
                 value={options.cornersSquareOptions?.color || "#000000"} 
                 onChange={(e) => handleColorChange('cornersSquareOptions', e.target.value)}
                 className="w-12 h-12 p-1 rounded-xl cursor-pointer bg-zinc-100 border-black/10"
               />
               <Input 
                 type="text" 
                 value={options.cornersSquareOptions?.color || "#000000"} 
                 onChange={(e) => handleColorChange('cornersSquareOptions', e.target.value)}
                 className="flex-1 font-mono uppercase bg-black/5 border-black/10"
               />
             </div>
           </div>

           <div className="space-y-3">
             <Label>Eye Ball Color</Label>
             <div className="flex items-center gap-3">
               <Input 
                 type="color" 
                 value={options.cornersDotOptions?.color || "#000000"} 
                 onChange={(e) => handleColorChange('cornersDotOptions', e.target.value)}
                 className="w-12 h-12 p-1 rounded-xl cursor-pointer bg-zinc-100 border-black/10"
               />
               <Input 
                 type="text" 
                 value={options.cornersDotOptions?.color || "#000000"} 
                 onChange={(e) => handleColorChange('cornersDotOptions', e.target.value)}
                 className="flex-1 font-mono uppercase bg-black/5 border-black/10"
               />
             </div>
           </div>
        </TabsContent>

        <TabsContent value="logo" className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
           <div className="space-y-4">
              <Label>Upload Logo</Label>
              <div className="border-2 border-dashed border-black/10 rounded-xl p-8 hover:bg-black/5 hover:border-purple-500/50 transition-colors flex flex-col items-center justify-center text-center cursor-pointer relative">
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  accept="image/png, image/jpeg, image/svg+xml, image/webp"
                  onChange={handleLogoUpload}
                />
                <span className="text-sm font-medium text-foreground mb-1">Click to upload</span>
                <span className="text-xs text-muted-foreground">PNG, JPG, SVG, WEBP</span>
              </div>
              
              {options.image && (
                 <Button variant="destructive" size="sm" className="w-full" onClick={() => onChange({ image: undefined })}>
                   Remove Logo
                 </Button>
              )}
           </div>

           {options.image && (
             <div className="space-y-4 pt-4 border-t border-black/10">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Logo Size</Label>
                    <span className="text-xs text-muted-foreground">{Math.round((options.imageOptions?.imageSize || 0.4) * 100)}%</span>
                  </div>
                  <Slider 
                    value={[options.imageOptions?.imageSize || 0.4]} 
                    min={0.1} max={0.7} step={0.05}
                    onValueChange={(val: any) => {
                      const v = Array.isArray(val) ? val[0] : val;
                      onChange({ imageOptions: { ...options.imageOptions!, imageSize: v } })
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Logo Margin</Label>
                    <span className="text-xs text-muted-foreground">{options.imageOptions?.margin || 0}px</span>
                  </div>
                  <Slider 
                    value={[options.imageOptions?.margin || 0]} 
                    min={0} max={20} step={1}
                    onValueChange={(val: any) => {
                      const v = Array.isArray(val) ? val[0] : val;
                      onChange({ imageOptions: { ...options.imageOptions!, margin: v } })
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Hide Background Dots behind Logo</Label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={options.imageOptions?.hideBackgroundDots} 
                      onChange={(e) => onChange({ imageOptions: { ...options.imageOptions!, hideBackgroundDots: e.target.checked } })}
                      className="w-4 h-4 rounded bg-zinc-100 border-black/10 text-purple-600 focus:ring-purple-600 focus:ring-offset-white"
                    />
                  </div>
                </div>
             </div>
           )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
