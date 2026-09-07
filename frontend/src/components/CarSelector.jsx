import { Search } from 'lucide-react';
import { carBrands, findCarBrand } from '../data/cars';

export default function CarSelector({ value, onChange }) {
  const brand = findCarBrand(value);
  const suggestions = value.trim() ? carBrands.filter((item) => `${item.name} ${item.models.join(' ')}`.toLowerCase().includes(value.toLowerCase())).slice(0, 5) : [];

  return <div className="relative">
    <div className="relative"><Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input required value={value} onChange={(event) => onChange(event.target.value)} placeholder="Toyota Camry 2020" className="!pl-9" /></div>
    {brand && <div className="mt-2 flex items-center gap-2 text-xs text-slate-400"><span className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${brand.tone} text-[10px] font-bold text-white shadow-lg`}>{brand.badge}</span><span><strong className="text-slate-200">{brand.name}</strong> распознана</span></div>}
    {suggestions.length > 0 && <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl">{suggestions.map((item) => <button type="button" key={item.name} onClick={() => onChange(`${item.name} ${item.models[0]}`)} className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-white transition hover:bg-white/10"><span className={`grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br ${item.tone} text-[9px] font-bold`}>{item.badge}</span>{item.name}<span className="ml-auto text-xs text-slate-400">{item.models.slice(0, 3).join(' · ')}</span></button>)}</div>}
  </div>;
}
