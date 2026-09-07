import { CheckCheck, Gift, Megaphone, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const items = [
  { key: 'booking', icon: CheckCheck, color: 'text-emerald-500' },
  { key: 'bonus', icon: Gift, color: 'text-amber-500' },
  { key: 'promo', icon: Megaphone, color: 'text-violet-500' },
];

export default function NotificationList({ open, onClose, enabled, onToggle }) {
  const { t } = useTranslation();
  if (!open) return null;

  return (
    <div className="notification-enter absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[min(23rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-white/10">
        <p className="font-semibold">{t('notifications.title')}</p>
        <button aria-label={t('header.openMenu')} onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"><X size={17} /></button>
      </div>
      <div className="p-2">
        {items.map(({ key, icon: Icon, color }) => <div key={key} className="flex gap-3 rounded-xl p-3 transition hover:bg-slate-50 dark:hover:bg-white/5">
          <div className={`mt-0.5 rounded-xl bg-slate-100 p-2 dark:bg-white/10 ${color}`}><Icon size={17} /></div>
          <div><p className="text-sm font-medium">{t(`notifications.${key}`)}</p><p className="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">{t(`notifications.${key}Text`)}</p></div>
        </div>)}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 dark:border-white/10"><span className="text-xs font-medium">{t('header.notifications')}</span><button type="button" aria-pressed={enabled} onClick={onToggle} className={`h-6 w-11 rounded-full p-1 transition ${enabled ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-white/20'}`}><span className={`block h-4 w-4 rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-5' : ''}`} /></button></div>
    </div>
  );
}
