import { useMemo, useRef, useState } from 'react';
import { ArrowDownAZ, Search, Users, X } from 'lucide-react';
import MemberCard from './MemberCard';
import useReveal from '../hooks/useReveal';
import siswa from '../data/siswa.json';

export default function MemberGrid({ onSelect }) {
  const [gender, setGender] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('no');
  const scope = useRef();
  const filtered = useMemo(() => siswa.filter((member) => (gender === 'all' || member.jk === gender) && member.nama.toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => sort === 'az' ? a.nama.localeCompare(b.nama, 'id') : a.no - b.no), [gender, query, sort]);
  useReveal(scope, `${gender}|${query}|${sort}`);
  const tabs = [{ value: 'all', label: 'Semua', count: siswa.length }, { value: 'L', label: 'Laki-laki', count: siswa.filter((s) => s.jk === 'L').length }, { value: 'P', label: 'Perempuan', count: siswa.filter((s) => s.jk === 'P').length }];

  return <section id="anggota" className="members section-pad" ref={scope}>
    <div className="container">
      <div className="section-kicker" data-reveal><span className="section-number">03</span> KENALAN LEBIH DEKAT <span className="kicker-line" /></div>
      <div className="section-heading" data-reveal><h2>Setiap wajah,<br />punya <span className="serif-accent">cerita.</span></h2><p>Inilah orang-orang yang membuat<br />XII-1 RPL terasa seperti rumah.<span className="member-total"><Users size={17} /> 35 siswa & siswi</span></p></div>
      <div className="member-toolbar">
        <div className="filter-tabs" role="group" aria-label="Filter jenis kelamin">{tabs.map((tab) => <button key={tab.value} className={gender === tab.value ? 'is-active' : ''} aria-pressed={gender === tab.value} onClick={() => setGender(tab.value)}>{tab.label}<span>{tab.count}</span></button>)}</div>
        <div className="search-sort"><div className="search-field"><Search size={17} /><input type="search" aria-label="Cari nama teman" placeholder="Cari nama teman…" value={query} onChange={(e) => setQuery(e.target.value)} />{query && <button className="clear-search" aria-label="Hapus pencarian" onClick={() => setQuery('')}><X size={14} /></button>}</div><label className="sort-field"><ArrowDownAZ size={18} /><span className="sr-only">Urutkan anggota</span><select aria-label="Urutkan anggota" value={sort} onChange={(e) => setSort(e.target.value)}><option value="no">No. absen</option><option value="az">Nama A–Z</option></select></label></div>
      </div>
      <p className="results-count" role="status">Menampilkan <strong>{filtered.length}</strong> dari {siswa.length} teman</p>
      <div className="member-grid">{filtered.map((member) => <MemberCard key={member.no} siswa={member} onSelect={onSelect} />)}</div>
      {filtered.length === 0 && <div className="empty-state"><Search size={30} /><h3>Temanmu belum ketemu.</h3><p>Coba nama lain atau tampilkan semua anggota.</p><button className="button button-dark" onClick={() => { setQuery(''); setGender('all'); }}>Tampilkan semua teman <ArrowDownAZ size={16} /></button></div>}
      <div className="members-end"><span />{filtered.length === siswa.length ? '35 cerita. Satu XII-1 RPL.' : `${filtered.length} teman, bagian dari cerita kita.`}<span /></div>
    </div>
  </section>;
}
