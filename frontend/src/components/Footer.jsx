import { Instagram, Mail, MapPin, Phone, Send, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();
  return <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950"><div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.5fr_1fr_1fr] md:px-8"><div><div className="flex items-center gap-2 font-bold"><Wrench className="text-cyan-500" size={20} />{t('brand')}</div><p className="mt-3 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">{t('footer.description')}</p></div><div><p className="font-semibold">{t('footer.quickLinks')}</p><div className="mt-3 flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400"><a href="/#stations">{t('nav.stations')}</a><a href="/#booking">{t('nav.booking')}</a><Link to="/profile">{t('nav.profile')}</Link></div></div><div><p className="font-semibold">{t('footer.contacts')}</p><div className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400"><p className="flex gap-2"><Phone size={16} />+996 555 123 456</p><p className="flex gap-2"><Mail size={16} />hello@mehanik.kg</p><p className="flex gap-2"><MapPin size={16} />{t('footer.address')}</p><div className="flex gap-3 pt-2"><Instagram size={18} /><Send size={18} /></div></div></div></div><div className="border-t border-slate-100 py-5 text-center text-xs text-slate-400 dark:border-white/10">© 2026 {t('brand')}. {t('footer.rights')}</div></footer>;
}
