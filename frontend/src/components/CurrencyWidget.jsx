import { Banknote, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';

const fallbackRates = { USD: 87.45, EUR: 95.2 };

export default function CurrencyWidget() {
  const { t } = useTranslation();
  const [rates, setRates] = useState(fallbackRates);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const data = await api.get('/exchange-rates/');
        if (active) { setRates(data.rates); setUpdatedAt(data.updated_at); }
      } catch { /* The compact fallback keeps the header useful while the provider is unreachable. */ }
      finally { if (active) setLoading(false); }
    };
    load();
    const timer = window.setInterval(load, 30 * 60 * 1000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  return <div title={t('header.exchangeRates')} className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs dark:border-white/10 dark:bg-white/5 xl:flex">
    <Banknote size={16} className="text-cyan-600 dark:text-cyan-300" />
    <div className="flex gap-2 font-semibold tabular-nums"><span>USD {rates.USD?.toFixed(2)}</span><span className="text-slate-400">|</span><span>EUR {rates.EUR?.toFixed(2)}</span></div>
    <RefreshCw size={12} className={`text-slate-400 ${loading ? 'animate-spin' : ''}`} />
    {updatedAt && <time className="sr-only">{t('header.currencyUpdated')} {new Date(updatedAt).toLocaleTimeString()}</time>}
  </div>;
}
