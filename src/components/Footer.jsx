import { ArrowUp, ArrowUpRight, CodeXml } from 'lucide-react';
import { kelas } from '../data/kelas';

function Instagram({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
}

export default function Footer() {
  return <footer className="footer">
    <div className="container"><div className="footer-main"><div><span className="eyebrow"><span className="status-dot" /> CERITA KITA BELUM SELESAI</span><h2>Sampai ketemu<br />di <span className="serif-accent">cerita berikutnya.</span><span className="orange-dot">↗</span></h2><p>Potongan keseharian, karya, dan kenangan kelas kami.</p><a className="button button-primary" href={kelas.instagram} target="_blank" rel="noreferrer"><Instagram size={18} /> {kelas.instagramHandle}<ArrowUpRight size={18} /></a></div><div className="footer-emblem" aria-hidden="true"><CodeXml /><span>KEEP CREATING<br />KEEP CONNECTING</span></div></div><div className="footer-bottom"><a className="footer-brand" href="#beranda"><CodeXml size={23} /> XII—1 RPL</a><p>© {new Date().getFullYear()} XII-1 RPL. Dibuat dengan semangat kebersamaan.</p><a className="back-top" href="#beranda">Kembali ke atas <ArrowUp size={16} /></a></div></div>
  </footer>;
}
