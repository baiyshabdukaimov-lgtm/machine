import { useState } from 'react';
import { CreditCard, Plus, Trash2, Wallet } from 'lucide-react';
import { getPaymentMethods, savePaymentMethods } from '../services/preferences';

const providers = [
  { id: 'mbank', name: 'MBank', mark: 'M', tone: 'from-emerald-400 to-teal-700' },
  { id: 'optima', name: 'Optima Bank', mark: 'O', tone: 'from-orange-400 to-red-600' },
  { id: 'bakai', name: 'Bakai Bank', mark: 'B', tone: 'from-blue-400 to-indigo-700' },
  { id: 'obank', name: 'O!Bank', mark: 'O!', tone: 'from-yellow-300 to-orange-500' },
  { id: 'visa', name: 'Visa', mark: 'VISA', tone: 'from-blue-700 to-blue-950' },
  { id: 'mastercard', name: 'Mastercard', mark: 'MC', tone: 'from-red-500 to-orange-500' },
];

export default function PaymentMethods({ t }) {
  const [methods, setMethods] = useState(getPaymentMethods);
  const [form, setForm] = useState({ provider: 'mbank', number: '', label: '' });
  const addMethod = (event) => { event.preventDefault(); if (!form.number.trim()) return; const next = [...methods, { ...form, id: Date.now(), number: form.number.replace(/\s+/g, '') }]; setMethods(next); savePaymentMethods(next); setForm({ provider: 'mbank', number: '', label: '' }); };
  const removeMethod = (id) => { const next = methods.filter((item) => item.id !== id); setMethods(next); savePaymentMethods(next); };
  return <div><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300"><Wallet /></span><div><h2 className="text-2xl font-bold">Платежи</h2><p className="text-sm text-slate-500 dark:text-slate-400">Ваши карты и банковские счета</p></div></div>
    <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{methods.map((method) => { const provider = providers.find((item) => item.id === method.provider) || providers[0]; return <div key={method.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-4 text-white shadow-lg"><div className={`absolute -right-5 -top-7 h-24 w-24 rounded-full bg-gradient-to-br ${provider.tone} opacity-25 blur-2xl`} /><div className="relative flex items-start justify-between"><span className={`grid h-9 min-w-9 place-items-center rounded-lg bg-gradient-to-br ${provider.tone} px-1 text-[10px] font-bold`}>{provider.mark}</span><button type="button" onClick={() => removeMethod(method.id)} aria-label="Удалить способ оплаты" className="text-slate-500 transition hover:text-red-400"><Trash2 size={16} /></button></div><p className="relative mt-7 font-mono tracking-widest">•••• {method.number.slice(-4).padStart(4, '•')}</p><p className="relative mt-2 text-xs text-slate-400">{method.label || provider.name}</p></div>; })}</div>
    <form onSubmit={addMethod} className="mt-6 grid gap-3 rounded-2xl border border-slate-200 p-4 dark:border-white/10 sm:grid-cols-[1fr_1fr_auto]"><label className="grid gap-1 text-xs font-semibold"><span>Банк или система</span><select value={form.provider} onChange={(event) => setForm({ ...form, provider: event.target.value })}>{providers.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="grid gap-1 text-xs font-semibold"><span>Номер карты или счёта</span><input required inputMode="numeric" value={form.number} onChange={(event) => setForm({ ...form, number: event.target.value })} placeholder="•••• 1234" /></label><label className="grid gap-1 text-xs font-semibold"><span>Название</span><input value={form.label} onChange={(event) => setForm({ ...form, label: event.target.value })} placeholder="Моя карта" /></label><button className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:col-span-3"><Plus size={17} />Добавить способ</button></form>
    <p className="mt-3 flex items-center gap-2 text-xs text-slate-500"><CreditCard size={14} />Данные сохраняются только в этом браузере и не отправляются на сервер.</p>
  </div>;
}
