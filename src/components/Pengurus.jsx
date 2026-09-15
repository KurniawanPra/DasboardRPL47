import { useRef } from 'react';
import { ArrowDownRight, ArrowUpRight, BadgeCheck } from 'lucide-react';
import Avatar from './Avatar';
import useReveal from '../hooks/useReveal';
import siswa from '../data/siswa.json';
import { titleCase } from '../utils/format';

const order = ['Ketua', 'Wakil Ketua', 'Sekretaris', 'Wakil Sekretaris', 'Bendahara 1', 'Bendahara 2'];
const roleNotes = { Ketua: 'Menyatukan langkah, menjaga arah.', 'Wakil Ketua': 'Selalu siap bergerak bersama.', Sekretaris: 'Merangkai catatan, merawat rencana.', 'Wakil Sekretaris': 'Menjaga setiap detail tetap rapi.', 'Bendahara 1': 'Mengelola amanah dengan teliti.', 'Bendahara 2': 'Mendukung kebutuhan bersama.' };

export default function Pengurus({ onSelect }) {
  const scope = useRef();
  useReveal(scope);
  const pengurus = order.map((role) => siswa.find((s) => s.jabatan === role));
  return <section id="pengurus" className="organization section-pad" ref={scope}>
    <div className="container">
      <div className="section-kicker" data-reveal><span className="section-number">02</span> STRUKTUR ORGANISASI <span className="kicker-line" /></div>
      <div className="section-heading" data-reveal><h2>Di balik kelas<br />yang <span className="serif-accent">kompak.</span></h2><p>Enam teman yang mengambil peran lebih.<br />Menggerakkan, mendengarkan, dan saling menjaga.<ArrowDownRight size={34} /></p></div>
      <div className="officer-grid">
        {pengurus.map((member, index) => <button key={member.no} className={`officer-card ${index < 2 ? 'officer-lead' : ''}`} onClick={() => onSelect(member)} data-reveal aria-label={`Lihat profil ${titleCase(member.nama)}, ${member.jabatan}`}>
          <div className="officer-photo"><Avatar siswa={member} /><span className="officer-photo-number">0{index + 1}</span></div>
          <div className="officer-info"><span className="role-badge"><BadgeCheck size={13} /> {member.jabatan}</span><h3>{titleCase(member.nama)}</h3><p>{roleNotes[member.jabatan]}</p><span className="officer-link">Kenali lebih dekat <ArrowUpRight size={18} /></span></div>
        </button>)}
      </div>
      <div className="organization-note" data-reveal><span className="tiny-dot" /> Peran boleh berbeda. Semangat tetap sama.</div>
    </div>
  </section>;
}
