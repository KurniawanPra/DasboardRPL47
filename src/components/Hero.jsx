import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowDownRight, ArrowUpRight, CodeXml, Pause, Play } from 'lucide-react';
import Avatar from './Avatar';
import useMediaQuery from '../hooks/useMediaQuery';
import siswa from '../data/siswa.json';
import { kelas } from '../data/kelas';

const Scene3D = lazy(() => import('./Scene3D'));

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function Hero() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const compact = useMediaQuery('(max-width: 700px)');
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  const section = useRef();

  useEffect(() => {
    // Hentikan render berulang saat hero di luar layar atau tab tidak aktif.
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(section.current);
    const handleVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', handleVisibility); };
  }, []);

  const staticScene = reducedMotion || failed;
  return <section id="beranda" className="hero" ref={section}>
    <div className="hero-grid container">
      <div className="hero-copy">
        <div className="eyebrow hero-eyebrow"><span className="status-dot" /> SATU KELAS. BANYAK CERITA.</div>
        <h1>Kelas<br /><span>XII-1 <span className="hero-outline">RPL</span><span className="orange-dot">.</span></span></h1>
        <p className="hero-school">{kelas.sekolah}</p>
        <p className="hero-description">Berawal dari satu ruang kelas.<br />Bersama, kita menulis cerita dan menciptakan masa depan.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#anggota">Kenalan, yuk! <ArrowUpRight size={19} /></a>
          <a className="text-link" href="#tentang">Cerita kelas kami <ArrowDownRight size={18} /></a>
        </div>
        <div className="hero-social-proof">
          <div className="avatar-stack">{[siswa[17], siswa[0], siswa[2], siswa[8]].map((member) => <Avatar key={member.no} siswa={member} priority />)}<span>+31</span></div>
          <p><strong>35 karakter, satu keluarga.</strong><span>Belajar. Berkarya. Bertumbuh.</span></p>
        </div>
      </div>
      <div className="hero-art">
        <div className="art-topline"><span>BUILT DIFFERENT. BUILT TOGETHER.</span><span>01 / 35</span></div>
        <span className="art-cross cross-one" aria-hidden="true">+</span><span className="art-cross cross-two" aria-hidden="true">+</span>
        <div className="scene-container">
          {(!ready || staticScene) && <div className={`scene-placeholder ${staticScene ? 'is-static' : ''}`} aria-hidden="true"><div className="fallback-orbit" /><div className="fallback-code"><CodeXml /></div><span className="fallback-sphere" /></div>}
          {!staticScene && <SceneBoundary onFailure={() => setFailed(true)}><Suspense fallback={null}><Scene3D compact={compact} paused={paused || !visible || !tabVisible} onReady={() => setReady(true)} onFailure={() => setFailed(true)} /></Suspense></SceneBoundary>}
          {!ready && !staticScene && <span className="scene-loading" role="status">Menyiapkan ruang kreatif…</span>}
        </div>
        <div className="art-sticker"><span className="sticker-dot" /> ideas into reality <ArrowUpRight size={15} /></div>
        <div className="art-bottomline"><span><span className="tiny-dot" /> {staticScene ? 'RUANG KREATIF XII-1' : 'GERAKKAN KURSOR, LIHAT YANG TERJADI'}</span>{!staticScene && <button className="scene-pause" aria-label={paused ? 'Putar animasi 3D' : 'Jeda animasi 3D'} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={13} /> : <Pause size={13} />}<span>{paused ? 'Putar' : 'Jeda'}</span></button>}</div>
      </div>
    </div>
    <div className="container hero-bottom"><a href="#tentang"><span className="scroll-icon"><ArrowDown size={16} /></span> SCROLL UNTUK KENAL LEBIH DEKAT</a><span>REKAYASA PERANGKAT LUNAK <span className="hero-bottom-star">✳</span> PERDAGANGAN, SUMATERA UTARA</span></div>
  </section>;
}
