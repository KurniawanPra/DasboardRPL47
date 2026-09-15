import { useEffect, useRef } from 'react';
import { BadgeCheck, CalendarDays, MapPin, X } from 'lucide-react';
import Avatar from './Avatar';
import { titleCase } from '../utils/format';

export default function MemberDialog({ siswa, onClose }) {
  const dialog = useRef();
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element.close(); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, []);
  return <dialog className="member-dialog" ref={dialog} aria-labelledby="member-dialog-title" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="dialog-layout"><button autoFocus className="dialog-close icon-button" onClick={onClose} aria-label="Tutup profil"><X size={20} /></button><Avatar siswa={siswa} priority className="dialog-photo" /><div className="dialog-content"><span className="eyebrow">TEMAN SEKELAS / {String(siswa.no).padStart(2, '0')}</span><h2 id="member-dialog-title">{titleCase(siswa.nama)}</h2><span className="role-badge"><BadgeCheck size={14} /> {siswa.jabatan || 'Anggota Kelas'}</span><dl><div><dt><MapPin size={17} /> Tempat lahir</dt><dd>{titleCase(siswa.tempat_lahir)}</dd></div><div><dt><CalendarDays size={17} /> Tanggal lahir</dt><dd>{titleCase(siswa.tanggal_lahir)}</dd></div></dl><p className="dialog-class">Bagian dari keluarga <strong>XII-1 RPL.</strong></p></div></div>
  </dialog>;
}
