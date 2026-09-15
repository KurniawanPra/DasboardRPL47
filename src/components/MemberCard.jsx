import { ArrowUpRight, MapPin } from 'lucide-react';
import Avatar from './Avatar';
import { titleCase } from '../utils/format';

export default function MemberCard({ siswa, onSelect }) {
  return <button className="member-card" data-reveal onClick={() => onSelect(siswa)} aria-label={`Lihat profil ${titleCase(siswa.nama)}`}>
    <div className="member-photo"><Avatar siswa={siswa} /><span className="member-number">{String(siswa.no).padStart(2, '0')}</span>{siswa.jabatan && <span className="member-role">{siswa.jabatan}</span>}<span className="member-arrow"><ArrowUpRight size={19} /></span></div>
    <div className="member-info"><span className="member-category">XII-1 RPL <span>·</span> {siswa.jk === 'L' ? 'Siswa' : 'Siswi'}</span><h3>{titleCase(siswa.nama)}</h3><p><MapPin size={12} /><span>{titleCase(siswa.tempat_lahir)}</span></p><time>{titleCase(siswa.tanggal_lahir)}</time></div>
  </button>;
}
