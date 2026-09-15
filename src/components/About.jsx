import { useRef } from 'react';
import { ArrowUpRight, CodeXml, Heart, Sparkles } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import { kelas } from '../data/kelas';
import siswa from '../data/siswa.json';

export default function About() {
  const scope = useRef();
  useReveal(scope);
  return <section id="tentang" className="about section-pad" ref={scope}>
    <div className="container">
      <div className="section-kicker" data-reveal><span className="section-number">01</span> TENTANG KAMI <span className="kicker-line" /></div>
      <div className="about-layout">
        <div data-reveal><h2>Lebih dari<br />sekadar <span className="serif-accent">sekelas.</span></h2><div className="about-doodle" aria-hidden="true"><CodeXml size={27} /><span className="doodle-line" /><Heart size={26} /><span className="doodle-line" /><Sparkles size={28} /></div></div>
        <div className="about-copy" data-reveal><p>{kelas.deskripsi}</p><p className="secondary-copy">Di {kelas.sekolah}, kami belajar bahwa karya terbaik selalu dimulai dari rasa ingin tahu — dan teman yang saling mendukung.</p>{kelas.angkatan && <p className="secondary-copy">Angkatan {kelas.angkatan}</p>}<a className="text-link dark-link" href={kelas.instagram} target="_blank" rel="noreferrer">Ikuti keseharian kami <ArrowUpRight size={18} /><span>{kelas.instagramHandle}</span></a></div>
      </div>
      <div className="stats-row" data-reveal>
        <div className="stat"><strong>{siswa.length}<span>↗</span></strong><p>Siswa, banyak warna</p></div>
        <div className="stat"><strong>{siswa.filter((s) => s.jabatan).length}<span>✳</span></strong><p>Pengurus, satu tujuan</p></div>
        <div className="stat"><strong>01<span>♡</span></strong><p>Keluarga besar</p></div>
        <div className="stat stat-note"><span className="code-comment">// our kind of teamwork</span><p>Different minds.<br /><strong>Shared dreams.</strong></p></div>
      </div>
    </div>
  </section>;
}
