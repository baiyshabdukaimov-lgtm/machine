import { Bell, ChevronDown, Menu, Moon, Sun, UserRound, Wrench, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../providers/ThemeProvider';
import NotificationList from './NotificationList';
import CurrencyWidget from './CurrencyWidget';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const switchLanguage = () => i18n.changeLanguage(i18n.language === 'ru' ? 'ky' : 'ru');
  const link = (href, label) => <a href={href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300">{label}</a>;

  return <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75">
    <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 md:px-8">
      <Link to="/" className="flex items-center gap-2.5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/20"><Wrench size={20} /></span><span className="text-lg font-bold tracking-tight">{t('brand')}</span></Link>
      <nav className="hidden items-center gap-1 lg:flex">{link('/#stations', t('nav.stations'))}{link('/#booking', t('nav.booking'))}<Link to="/profile" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300">{t('nav.profile')}</Link></nav>
      <div className="flex items-center gap-1.5">
        <CurrencyWidget />
        <button onClick={switchLanguage} title={t('header.language')} className="inline-flex h-10 items-center gap-1 rounded-xl px-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10">{i18n.language.toUpperCase()}<ChevronDown size={14} /></button>
        <button onClick={toggleTheme} title={t('header.theme')} className="grid h-10 w-10 place-items-center rounded-xl text-slate-600 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
        <div className="relative"><button onClick={() => setNotificationsOpen((open) => !open)} title={t('header.notifications')} className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-600 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"><Bell size={18} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-500" /></button><NotificationList open={notificationsOpen} onClose={() => setNotificationsOpen(false)} /></div>
        <Link to="/profile" className="hidden h-10 items-center gap-2 rounded-xl bg-slate-900 px-3 text-sm font-medium text-white dark:bg-white dark:text-slate-900 sm:inline-flex"><UserRound size={17} />{location.pathname === '/profile' ? t('nav.profile') : t('nav.profile')}</Link>
        <button onClick={() => setMenuOpen((open) => !open)} aria-label={t('header.openMenu')} className="grid h-10 w-10 place-items-center rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10 lg:hidden">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </div>
    {menuOpen && <nav className="border-t border-slate-100 px-4 py-2 dark:border-white/10 lg:hidden">{link('/#stations', t('nav.stations'))}{link('/#booking', t('nav.booking'))}<Link to="/profile" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300">{t('nav.profile')}</Link></nav>}
  </header>;
}
