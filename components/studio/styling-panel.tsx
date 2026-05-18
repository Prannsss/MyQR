"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import type { Options } from "qr-code-styling";
import { Button } from "@/components/ui/button";

interface StylingPanelProps {
  options: Options;
  onChange: (options: Partial<Options>) => void;
}

const DOT_TYPES = [
  "rounded",
  "dots",
  "classy",
  "classy-rounded",
  "square",
  "extra-rounded",
];
const CORNER_SQUARE_TYPES = ["dot", "square", "extra-rounded"];
const CORNER_DOT_TYPES = ["dot", "square"];

export function StylingPanel({ options, onChange }: StylingPanelProps) {
  const handleColorChange = (
    key:
      | "dotsOptions"
      | "backgroundOptions"
      | "cornersSquareOptions"
      | "cornersDotOptions",
    color: string,
  ) => {
    onChange({
      [key]: {
        ...(options[key] as any),
        color,
      },
    });
  };

  const handleTypeChange = (
    key: "dotsOptions" | "cornersSquareOptions" | "cornersDotOptions",
    type: string,
  ) => {
    onChange({
      [key]: {
        ...(options[key] as any),
        type,
      },
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      onChange({
        image: event.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col w-full h-full space-y-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-lg font-semibold tracking-tight">
          QR Code Styling
        </h2>
        <p className="text-sm text-zinc-500">
          Customize the appearance of your QR code.
        </p>
      </div>

      <Tabs defaultValue="design" className="w-full flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 bg-zinc-100 p-1 rounded-xl mb-6">
          <TabsTrigger
            value="design"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm px-3 py-2 text-sm font-medium transition-all"
          >
            Design
          </TabsTrigger>
          <TabsTrigger
            value="colors"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm px-3 py-2 text-sm font-medium transition-all"
          >
            Colors
          </TabsTrigger>
          <TabsTrigger
            value="logo"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm px-3 py-2 text-sm font-medium transition-all"
          >
            Logo
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="design"
          className="space-y-6 animate-in fade-in zoom-in-95 duration-200 mt-0 flex-1"
        >
          <div className="space-y-3 p-4 border border-black/10 rounded-xl bg-white/50">
            <Label className="text-sm font-medium text-zinc-700">Body Pattern</Label>
            <div className="grid grid-cols-3 gap-2">
              {DOT_TYPES.map((type) => (
                <Button
                  key={type}
                  variant="outline"
                  size="sm"
                  className={`capitalize h-16 transition-all duration-200 ${options.dotsOptions?.type === type ? "border-purple-600 bg-purple-50 text-purple-700 shadow-sm ring-1 ring-purple-600/20" : "border-zinc-200 bg-zinc-50/50 hover:bg-zinc-100 hover:border-zinc-300 text-zinc-600"}`}
                  onClick={() => handleTypeChange("dotsOptions", type)}
                >
                  {type.replace("-", " ")}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3 p-4 border border-black/10 rounded-xl bg-white/50">
            <Label className="text-sm font-medium text-zinc-700">Eye Frame Shape</Label>
            <div className="grid grid-cols-3 gap-2">
              {CORNER_SQUARE_TYPES.map((type) => (
                <Button
                  key={type}
                  variant="outline"
                  size="sm"
                  className={`capitalize h-16 transition-all duration-200 ${options.cornersSquareOptions?.type === type ? "border-purple-600 bg-purple-50 text-purple-700 shadow-sm ring-1 ring-purple-600/20" : "border-zinc-200 bg-zinc-50/50 hover:bg-zinc-100 hover:border-zinc-300 text-zinc-600"}`}
                  onClick={() =>
                    handleTypeChange("cornersSquareOptions", type)
                  }
                >
                  {type.replace("-", " ")}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3 p-4 border border-black/10 rounded-xl bg-white/50">
            <Label className="text-sm font-medium text-zinc-700">Eye Ball Shape</Label>
            <div className="grid grid-cols-2 gap-2">
              {CORNER_DOT_TYPES.map((type) => (
                <Button
                  key={type}
                  variant="outline"
                  size="sm"
                  className={`capitalize h-16 transition-all duration-200 ${options.cornersDotOptions?.type === type ? "border-purple-600 bg-purple-50 text-purple-700 shadow-sm ring-1 ring-purple-600/20" : "border-zinc-200 bg-zinc-50/50 hover:bg-zinc-100 hover:border-zinc-300 text-zinc-600"}`}
                  onClick={() => handleTypeChange("cornersDotOptions", type)}
                >
                  {type.replace("-", " ")}
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="colors"
          className="space-y-4 animate-in fade-in zoom-in-95 duration-200 mt-0 flex-1"
        >
          <div className="space-y-3 p-4 border border-black/10 rounded-xl bg-white/50">
            <Label className="text-sm font-medium text-zinc-700">
              Body Color
            </Label>
            <div className="flex items-center gap-3">
              <Input
                type="color"
                value={options.dotsOptions?.color || "#000000"}
                onChange={(e) =>
                  handleColorChange("dotsOptions", e.target.value)
                }
                className="w-12 h-12 p-0.5 rounded-lg cursor-pointer bg-zinc-100 border-black/10 shadow-sm"
              />
              <Input
                type="text"
                value={options.dotsOptions?.color || "#000000"}
                onChange={(e) =>
                  handleColorChange("dotsOptions", e.target.value)
                }
                className="flex-1 font-mono uppercase bg-zinc-50 border-black/10 focus-visible:ring-purple-500"
              />
            </div>
          </div>

          <div className="space-y-3 p-4 border border-black/10 rounded-xl bg-white/50">
            <Label className="text-sm font-medium text-zinc-700">
              Background Color
            </Label>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Input
                  type="color"
                  value={
                    options.backgroundOptions?.color === "transparent"
                      ? "#ffffff"
                      : options.backgroundOptions?.color || "#ffffff"
                  }
                  onChange={(e) =>
                    handleColorChange("backgroundOptions", e.target.value)
                  }
                  className="w-12 h-12 p-0.5 rounded-lg cursor-pointer bg-zinc-100 border-black/10 shadow-sm"
                  disabled={options.backgroundOptions?.color === "transparent"}
                />
                <Button
                  variant="outline"
                  className={`flex-1 transition-all duration-200 ${options.backgroundOptions?.color === "transparent" ? "bg-purple-50 text-purple-700 border-purple-600 ring-1 ring-purple-600/20" : "bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-600"}`}
                  onClick={() =>
                    handleColorChange(
                      "backgroundOptions",
                      options.backgroundOptions?.color === "transparent"
                        ? "#ffffff"
                        : "transparent",
                    )
                  }
                >
                  {options.backgroundOptions?.color === "transparent"
                    ? "Solid Background"
                    : "Make Background Transparent"}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 border border-black/10 rounded-xl bg-white/50">
            <Label className="text-sm font-medium text-zinc-700">
              Eye Frame Color
            </Label>
            <div className="flex items-center gap-3">
              <Input
                type="color"
                value={options.cornersSquareOptions?.color || "#000000"}
                onChange={(e) =>
                  handleColorChange("cornersSquareOptions", e.target.value)
                }
                className="w-12 h-12 p-0.5 rounded-lg cursor-pointer bg-zinc-100 border-black/10 shadow-sm"
              />
              <Input
                type="text"
                value={options.cornersSquareOptions?.color || "#000000"}
                onChange={(e) =>
                  handleColorChange("cornersSquareOptions", e.target.value)
                }
                className="flex-1 font-mono uppercase bg-zinc-50 border-black/10 focus-visible:ring-purple-500"
              />
            </div>
          </div>

          <div className="space-y-3 p-4 border border-black/10 rounded-xl bg-white/50">
            <Label className="text-sm font-medium text-zinc-700">
              Eye Ball Color
            </Label>
            <div className="flex items-center gap-3">
              <Input
                type="color"
                value={options.cornersDotOptions?.color || "#000000"}
                onChange={(e) =>
                  handleColorChange("cornersDotOptions", e.target.value)
                }
                className="w-12 h-12 p-0.5 rounded-lg cursor-pointer bg-zinc-100 border-black/10 shadow-sm"
              />
              <Input
                type="text"
                value={options.cornersDotOptions?.color || "#000000"}
                onChange={(e) =>
                  handleColorChange("cornersDotOptions", e.target.value)
                }
                className="flex-1 font-mono uppercase bg-zinc-50 border-black/10 focus-visible:ring-purple-500"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="logo"
          className="space-y-4 animate-in fade-in zoom-in-95 duration-200 mt-0 flex-1"
        >
          <div className="space-y-4 p-4 border border-black/10 rounded-xl bg-white/50">
            <Label className="text-sm font-medium text-zinc-700">
              Upload Logo
            </Label>
            <div className="border-2 border-dashed border-black/10 rounded-xl p-8 hover:bg-purple-50 hover:border-purple-300 transition-colors flex flex-col items-center justify-center text-center cursor-pointer relative bg-zinc-50">
              <input
                type="file"
                title="Upload Logo"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/png, image/jpeg, image/svg+xml, image/webp"
                onChange={handleLogoUpload}
              />
              <span className="text-sm font-medium text-purple-700 mb-1">
                Click to upload
              </span>
              <span className="text-xs text-zinc-500">PNG, JPG, SVG, WEBP</span>
            </div>

            {options.image && (
              <Button
                variant="outline"
                size="sm"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                onClick={() => onChange({ image: undefined })}
              >
                Remove Logo
              </Button>
            )}
          </div>

          {options.image && (
            <div className="space-y-5 p-4 border border-black/10 rounded-xl bg-white/50">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium text-zinc-700">
                    Logo Size
                  </Label>
                  <span className="text-xs font-mono bg-zinc-100 px-2 py-0.5 rounded text-zinc-600 border border-black/5">
                    {Math.round((options.imageOptions?.imageSize || 0.4) * 100)}
                    %
                  </span>
                </div>
                <Slider
                  value={[options.imageOptions?.imageSize || 0.4]}
                  min={0.1}
                  max={0.7}
                  step={0.05}
                  onValueChange={(val: any) => {
                    const v = Array.isArray(val) ? val[0] : val;
                    onChange({
                      imageOptions: { ...options.imageOptions!, imageSize: v },
                    });
                  }}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium text-zinc-700">
                    Logo Margin
                  </Label>
                  <span className="text-xs font-mono bg-zinc-100 px-2 py-0.5 rounded text-zinc-600 border border-black/5">
                    {options.imageOptions?.margin || 0}px
                  </span>
                </div>
                <Slider
                  value={[options.imageOptions?.margin || 0]}
                  min={0}
                  max={20}
                  step={1}
                  onValueChange={(val: any) => {
                    const v = Array.isArray(val) ? val[0] : val;
                    onChange({
                      imageOptions: { ...options.imageOptions!, margin: v },
                    });
                  }}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Label htmlFor="hide-bg-dots" className="text-sm font-medium text-zinc-700">
                  Hide background dots behind logo
                </Label>
                <input
                  id="hide-bg-dots"
                  type="checkbox"
                  title="Hide background dots behind logo"
                  checked={options.imageOptions?.hideBackgroundDots}
                  onChange={(e) =>
                    onChange({
                      imageOptions: {
                        ...options.imageOptions!,
                        hideBackgroundDots: e.target.checked,
                      },
                    })
                  }
                  className="w-5 h-5 rounded border-black/20 text-purple-600 focus:ring-purple-600 shrink-0"
                />
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
