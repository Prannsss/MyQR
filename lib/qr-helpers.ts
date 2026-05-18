export type QRDataType = 'url' | 'text' | 'wifi' | 'email' | 'phone' | 'sms' | 'vcard' | 'event';

export function generateWifiString(ssid: string, password?: string, encryption: 'WEP' | 'WPA' | 'nopass' | '' = 'WPA', hidden: boolean = false) {
  let str = `WIFI:T:${encryption};S:${ssid};`;
  if (encryption !== 'nopass' && password) {
    str += `P:${password};`;
  }
  if (hidden) {
    str += `H:true;`;
  }
  str += `;`;
  return str;
}

export function generateEmailString(email: string, subject?: string, body?: string) {
  let str = `mailto:${email}`;
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  if (params.length > 0) str += `?${params.join('&')}`;
  return str;
}

export function generateSmsString(phone: string, message?: string) {
  return `smsto:${phone}${message ? `:${message}` : ''}`;
}

export function generateVCardString(card: {
  firstName: string;
  lastName: string;
  org?: string;
  title?: string;
  phone?: string;
  email?: string;
  website?: string;
}) {
  return `BEGIN:VCARD
VERSION:3.0
N:${card.lastName};${card.firstName};;;
FN:${card.firstName} ${card.lastName}
${card.org ? `ORG:${card.org}\n` : ''}${card.title ? `TITLE:${card.title}\n` : ''}${card.phone ? `TEL;TYPE=work,voice:${card.phone}\n` : ''}${card.email ? `EMAIL;TYPE=work:${card.email}\n` : ''}${card.website ? `URL:${card.website}\n` : ''}END:VCARD`;
}

export function generateEventString(event: {
  summary: string;
  start: Date;
  end: Date;
  location?: string;
  description?: string;
}) {
  const formatDT = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.summary}
DTSTART:${formatDT(event.start)}
DTEND:${formatDT(event.end)}
${event.location ? `LOCATION:${event.location}\n` : ''}${event.description ? `DESCRIPTION:${event.description}\n` : ''}END:VEVENT
END:VCALENDAR`;
}
