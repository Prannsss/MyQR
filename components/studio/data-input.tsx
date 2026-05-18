"use client";
import { useState, useEffect } from "react";
import { Link, AlignLeft, Wifi, Mail, Phone, MessageSquare, Contact, Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateWifiString, generateEmailString, generateSmsString, generateVCardString, generateEventString } from "@/lib/qr-helpers";

const TYPES = [
  { id: 'url', label: 'Website', icon: Link },
  { id: 'text', label: 'Text', icon: AlignLeft },
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone', icon: Phone },
  { id: 'sms', label: 'SMS', icon: MessageSquare },
  { id: 'vcard', label: 'vCard', icon: Contact },
  { id: 'event', label: 'Event', icon: Calendar },
] as const;

type DataType = typeof TYPES[number]['id'];

export function DataInputPanel({ data, onChange }: { data: string, onChange: (data: string) => void }) {
  const [activeType, setActiveType] = useState<DataType>('url');
  
  const [url, setUrl] = useState(data || "");
  const [text, setText] = useState("");
  
  const [wifi, setWifi] = useState({ ssid: "", password: "", encryption: "WPA" as any, hidden: false });
  const [email, setEmail] = useState({ address: "", subject: "", body: "" });
  const [phone, setPhone] = useState("");
  const [sms, setSms] = useState({ number: "", message: "" });
  const [vcard, setVcard] = useState({ firstName: "", lastName: "", phone: "", email: "", org: "" });
  const [eventData, setEventData] = useState({ summary: "", start: new Date().toISOString().slice(0,16), end: new Date(Date.now() + 3600000).toISOString().slice(0,16), location: "", description: "" });

  useEffect(() => {
    let newData = "";
    switch (activeType) {
      case 'url': newData = url; break;
      case 'text': newData = text; break;
      case 'wifi': newData = wifi.ssid ? generateWifiString(wifi.ssid, wifi.password, wifi.encryption, wifi.hidden) : ""; break;
      case 'email': newData = email.address ? generateEmailString(email.address, email.subject, email.body) : ""; break;
      case 'phone': newData = phone ? `tel:${phone}` : ""; break;
      case 'sms': newData = sms.number ? generateSmsString(sms.number, sms.message) : ""; break;
      case 'vcard': newData = (vcard.firstName || vcard.lastName || vcard.phone) ? generateVCardString(vcard) : ""; break;
      case 'event': 
        if (eventData.summary && eventData.start && eventData.end) {
          newData = generateEventString({
            summary: eventData.summary,
            start: new Date(eventData.start),
            end: new Date(eventData.end),
            location: eventData.location,
            description: eventData.description
          });
        }
        break; 
    }
    onChange(newData);
  }, [activeType, url, text, wifi, email, phone, sms, vcard, eventData, onChange]);

  return (
    <div className="flex flex-col h-full gap-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground mb-4">Content Type</h2>
        <div className="grid grid-cols-4 gap-2">
          {TYPES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveType(id)}
              className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl border transition-all ${
                activeType === id 
                  ? "bg-purple-100 border-purple-300 text-purple-700 shadow-sm" 
                  : "bg-black/5 border-transparent text-muted-foreground hover:bg-black/10 hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-semibold tracking-tight text-foreground mb-4">Details</h2>
        
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {activeType === 'url' && (
            <div className="space-y-2">
              <Label>Website URL</Label>
              <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" />
            </div>
          )}

          {activeType === 'text' && (
            <div className="space-y-2">
              <Label>Plain Text</Label>
              <Textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter any text here..." className="min-h-[120px]" />
            </div>
          )}

          {activeType === 'wifi' && (
            <>
              <div className="space-y-2">
                <Label>Network Name (SSID)</Label>
                <Input value={wifi.ssid} onChange={e => setWifi({...wifi, ssid: e.target.value})} placeholder="MyHomeNetwork" />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input value={wifi.password} onChange={e => setWifi({...wifi, password: e.target.value})} placeholder="SecretPassword123" />
              </div>
              <div className="space-y-2">
                <Label>Security</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={wifi.encryption} onChange={e => setWifi({...wifi, encryption: e.target.value as any})}
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None</option>
                </select>
              </div>
            </>
          )}

          {activeType === 'email' && (
            <>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" value={email.address} onChange={e => setEmail({...email, address: e.target.value})} placeholder="hello@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Subject (Optional)</Label>
                <Input value={email.subject} onChange={e => setEmail({...email, subject: e.target.value})} placeholder="Inquiry" />
              </div>
              <div className="space-y-2">
                <Label>Body (Optional)</Label>
                <Textarea value={email.body} onChange={e => setEmail({...email, body: e.target.value})} placeholder="Hello, I would like to..." />
              </div>
            </>
          )}

          {activeType === 'vcard' && (
             <>
             <div className="grid grid-cols-2 gap-2">
               <div className="space-y-2">
                 <Label>First Name</Label>
                 <Input value={vcard.firstName} onChange={e => setVcard({...vcard, firstName: e.target.value})} />
               </div>
               <div className="space-y-2">
                 <Label>Last Name</Label>
                 <Input value={vcard.lastName} onChange={e => setVcard({...vcard, lastName: e.target.value})} />
               </div>
             </div>
             <div className="space-y-2">
                 <Label>Phone Number</Label>
                 <Input value={vcard.phone} onChange={e => setVcard({...vcard, phone: e.target.value})} />
             </div>
             <div className="space-y-2">
                 <Label>Email</Label>
                 <Input value={vcard.email} onChange={e => setVcard({...vcard, email: e.target.value})} />
             </div>
             <div className="space-y-2">
                 <Label>Company</Label>
                 <Input value={vcard.org} onChange={e => setVcard({...vcard, org: e.target.value})} />
             </div>
           </>
          )}

          {activeType === 'phone' && (
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1234567890" />
            </div>
          )}

          {activeType === 'sms' && (
            <>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input type="tel" value={sms.number} onChange={e => setSms({...sms, number: e.target.value})} placeholder="+1234567890" />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea value={sms.message} onChange={e => setSms({...sms, message: e.target.value})} placeholder="Hello, I want to..." className="min-h-[80px]" />
              </div>
            </>
          )}

          {activeType === 'event' && (
             <>
               <div className="space-y-2">
                 <Label>Event Title</Label>
                 <Input value={eventData.summary} onChange={e => setEventData({...eventData, summary: e.target.value})} placeholder="Birthday Party" />
               </div>
               <div className="grid grid-cols-2 gap-2">
                 <div className="space-y-2">
                   <Label>Start Date/Time</Label>
                   <Input type="datetime-local" value={eventData.start} onChange={e => setEventData({...eventData, start: e.target.value})} />
                 </div>
                 <div className="space-y-2">
                   <Label>End Date/Time</Label>
                   <Input type="datetime-local" value={eventData.end} onChange={e => setEventData({...eventData, end: e.target.value})} />
                 </div>
               </div>
               <div className="space-y-2">
                 <Label>Location</Label>
                 <Input value={eventData.location} onChange={e => setEventData({...eventData, location: e.target.value})} placeholder="123 Main St" />
               </div>
               <div className="space-y-2">
                 <Label>Description</Label>
                 <Textarea value={eventData.description} onChange={e => setEventData({...eventData, description: e.target.value})} placeholder="Bring food!" />
               </div>
             </>
          )}
        </div>
      </div>
    </div>
  );
}
