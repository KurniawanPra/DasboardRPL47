import { useEffect, useState } from 'react';
import { ArrowUpRight, CodeXml, Menu, X } from 'lucide-react';
import { kelas } from '../data/kelas';

const links = [ ['beranda', 'Beranda'], ['tentang', 'Tentang'], ['pengurus', 'Pengurus'], ['anggota', 'Anggota'] ];

export default function Navbar() {
  const [active, setActive] = useState('beranda');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-18% 0px -62% 0px' });
    links.forEach(([id]) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    function closeOnEscape(event) { if (event.key === 'Escape') setOpen(false); }
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <a className="brand" href="#beranda" aria-label="XII-1 RPL, beranda" onClick={() => setOpen(false)}>
          <span className="brand-mark"><CodeXml size={23} strokeWidth={2.3} /></span>
          <span>XII—1 <strong>RPL</strong><small>THE CLASS COLLECTIVE</small></span>
        </a>
        <nav className={`nav-links ${open ? 'is-open' : ''}`} id="main-navigation" aria-label="Navigasi utama">
          {links.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-instagram" href={kelas.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={15} /></a>
        </nav>
        <a className="nav-contact" href={kelas.instagram} target="_blank" rel="noreferrer">Temui kami <ArrowUpRight size={15} /></a>
        <button className="menu-toggle icon-button" aria-label={open ? 'Tutup navigasi' : 'Buka navigasi'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}
