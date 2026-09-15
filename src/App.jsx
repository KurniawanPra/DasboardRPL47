import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Pengurus from './components/Pengurus';
import MemberGrid from './components/MemberGrid';
import MemberDialog from './components/MemberDialog';
import Footer from './components/Footer';

export default function App() {
  const [selected, setSelected] = useState(null);
  return <>
    <a className="skip-link" href="#tentang">Langsung ke konten</a>
    <Navbar />
    <main><Hero /><About /><Pengurus onSelect={setSelected} /><MemberGrid onSelect={setSelected} /></main>
    <Footer />
    {selected && <MemberDialog key={selected.no} siswa={selected} onClose={() => setSelected(null)} />}
  </>;
}
