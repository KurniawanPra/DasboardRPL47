import { useState } from 'react';
import { initials, titleCase } from '../utils/format';

export default function Avatar({ siswa, className = '', priority = false }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const hasPhoto = Boolean(siswa.foto?.trim()) && !failed;
  return (
    <div className={`avatar avatar-tone-${siswa.no % 5} ${className}`}>
      <div className="avatar-fallback" role={!hasPhoto ? 'img' : undefined} aria-label={!hasPhoto ? `Avatar ${titleCase(siswa.nama)}` : undefined}>
        <span className="avatar-monogram" aria-hidden="true">{initials(siswa.nama)}</span>
        <span className="avatar-caption" aria-hidden="true">XII—1 / RPL</span>
      </div>
      {hasPhoto && <img src={siswa.foto} alt={titleCase(siswa.nama)} loading={priority ? 'eager' : 'lazy'} decoding="async" referrerPolicy="no-referrer" className={loaded ? 'is-loaded' : ''} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />}
    </div>
  );
}
