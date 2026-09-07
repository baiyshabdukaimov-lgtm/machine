const logoData = {
  mbank: { label: 'MBANK', colors: ['#18b977', '#087c68'], shape: 'mbank' },
  optima: { label: 'Optima', colors: ['#e63946', '#f4a261'], shape: 'optima' },
  bakai: { label: 'bakai', colors: ['#0c67c5', '#18a8e0'], shape: 'bakai' },
  obank: { label: 'O!Bank', colors: ['#ffd21f', '#f7941d'], shape: 'obank' },
  visa: { label: 'VISA', colors: ['#1434cb', '#0b1f83'], shape: 'visa' },
  mastercard: { label: 'mastercard', colors: ['#eb001b', '#f79e1b'], shape: 'mastercard' },
};

export function BrandLogo({ provider, compact = false }) {
  const item = logoData[provider] || logoData.mbank;
  const width = compact ? 64 : 116;
  return <svg viewBox="0 0 180 58" width={width} height={compact ? 22 : 34} role="img" aria-label={item.label} className="shrink-0">
    <defs><linearGradient id={`brand-${provider}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={item.colors[0]} /><stop offset="1" stopColor={item.colors[1]} /></linearGradient></defs>
    {item.shape === 'mbank' && <><circle cx="27" cy="29" r="21" fill={`url(#brand-${provider})`} /><path d="M16 36V21l11 9 11-9v15h-7V30l-4 3-4-3v6z" fill="white" /><text x="55" y="37" fill="currentColor" fontSize="25" fontWeight="800" letterSpacing="1">MBANK</text></>}
    {item.shape === 'optima' && <><path d="M8 43 28 8l20 35H37l-4-8H23l-4 8zM27 27h4l-2-6z" fill={`url(#brand-${provider})`} /><text x="56" y="36" fill="currentColor" fontSize="24" fontWeight="700">Optima</text></>}
    {item.shape === 'bakai' && <><circle cx="28" cy="29" r="21" fill={`url(#brand-${provider})`} /><path d="m17 35 7-18 5 9 5-9 7 18h-8l-4-10-4 10z" fill="white" /><text x="58" y="36" fill="currentColor" fontSize="25" fontWeight="700">bakai</text></>}
    {item.shape === 'obank' && <><circle cx="28" cy="29" r="21" fill={`url(#brand-${provider})`} /><text x="13" y="37" fill="#202020" fontSize="22" fontWeight="900">O!</text><text x="57" y="36" fill="currentColor" fontSize="24" fontWeight="800">Bank</text></>}
    {item.shape === 'visa' && <><path d="M10 42 22 14h12L22 42z" fill={item.colors[0]} /><path d="m32 42 12-28h12L44 42z" fill="#f7b600" /><text x="66" y="39" fill="currentColor" fontSize="31" fontStyle="italic" fontWeight="900">VISA</text></>}
    {item.shape === 'mastercard' && <><circle cx="25" cy="29" r="17" fill="#eb001b" /><circle cx="43" cy="29" r="17" fill="#f79e1b" fillOpacity=".95" /><text x="67" y="35" fill="currentColor" fontSize="17" fontWeight="700">mastercard</text></>}
  </svg>;
}

export function BrandMark({ provider }) {
  return <div className="flex h-11 w-[116px] items-center justify-center rounded-xl bg-white/95 px-2 text-slate-900 shadow-inner"><BrandLogo provider={provider} /></div>;
}
