import { useState } from 'react';
import { ChevronLeft, PlayCircle, Star, Target, MessageSquare } from 'lucide-react';

import mascotGugup from '../assets/mascots/gugup.jpg';
import mascotStruktur from '../assets/mascots/struktur.jpg';
import mascotBody from '../assets/mascots/body.jpg';
import mascotFiller from '../assets/mascots/filler.jpg';

const modules = [
  {
    id: 1,
    title: "Atasi Gugup",
    description: "Teknik & Mindset",
    icon: <Target size={24} />,
    image: mascotGugup,
    content: (
      <>
        <p style={{ marginBottom: '8px' }}>Rasa gugup adalah reaksi alami tubuh saat menghadapi audiens. Untuk mengatasinya:</p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Tarik napas melalui hidung <strong>4 detik</strong></li>
          <li>Tahan selama <strong>4 detik</strong></li>
          <li>Hembuskan perlahan selama <strong>4 detik</strong></li>
        </ul>
        <p style={{ marginTop: '8px' }}>Lakukan 3 kali sebelum tampil.</p>
      </>
    )
  },
  {
    id: 2,
    title: "Struktur Pidato",
    description: "Hook, Body, CTA",
    icon: <Star size={24} />,
    image: mascotStruktur,
    content: (
      <>
        <p style={{ marginBottom: '12px' }}>Sebuah pidato yang baik memiliki struktur yang jelas:</p>
        <ol style={{ paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}><strong>Hook:</strong> Awali dengan kutipan, pertanyaan, atau cerita mengejutkan.</li>
          <li style={{ marginBottom: '8px' }}><strong>Perkenalan:</strong> Perkenalkan nama Anda, keahlian/profesi Anda, dan sebutkan kontrak waktu. (Misal: "Perkenalkan saya X, seorang praktisi Y, dan dalam 5 menit saya akan menjelaskan tentang Z").</li>
          <li style={{ marginBottom: '8px' }}><strong>Body:</strong> Sampaikan maksimal 3 poin utama.</li>
          <li><strong>Call to Action:</strong> Tutup dengan ajakan bertindak yang jelas.</li>
        </ol>
      </>
    )
  },
  {
    id: 3,
    title: "Body Language",
    description: "Gestur & Kontak Mata",
    icon: <PlayCircle size={24} />,
    image: mascotBody,
    content: (
      <>
        <p style={{ marginBottom: '12px' }}>Tubuh Anda berbicara lebih keras daripada kata-kata:</p>
        <ul style={{ paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>Berdirilah tegak, buka bahu Anda.</li>
          <li style={{ marginBottom: '8px' }}>Gunakan tangan untuk menekankan poin.</li>
          <li>Bagi audiens menjadi 3 zona dan tatap secara bergantian.</li>
        </ul>
      </>
    )
  },
  {
    id: 4,
    title: "Filler Words",
    description: "Hindari 'Eee'",
    icon: <MessageSquare size={24} />,
    image: mascotFiller,
    content: (
      <>
        <p style={{ marginBottom: '12px' }}>Kata pengisi seperti 'eee' muncul karena otak berpikir lebih lambat dari mulut berbicara.</p>
        <p style={{ marginBottom: '8px', color: '#3b82f6', fontWeight: 600 }}>Solusinya? JEDA.</p>
        <p>Lebih baik diam 2-3 detik saat berpikir daripada mengisinya dengan 'eee'.</p>
      </>
    )
  },
  {
    id: 5,
    title: "Video Materi",
    description: "Kumpulan Video Lengkap",
    icon: <PlayCircle size={24} />,
    image: mascotStruktur, // Reusing an image
    content: (
      <>
        <p style={{ marginBottom: '16px' }}>Tonton kumpulan video pembelajaran di bawah ini untuk memperdalam pemahaman Anda.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { id: '3uZfhHMEj2w', title: 'Materi Pembelajaran 1' },
            { id: 'UDh5OVaNCZ4', title: 'Materi Pembelajaran 2' },
            { id: 'e-fqbBg-XRI', title: 'Materi Pembelajaran 3' },
            { id: 'LiKTDfgl3Dw', title: 'Materi Pembelajaran 4' },
            { id: 'ypu3x6Vvc-A', title: 'Materi Pembelajaran 5' },
            { id: 'hS9VVq8-fnc', title: 'Materi Pembelajaran 6' },
            { id: 'v-2ov9GfPDk', title: 'Materi Pembelajaran 7' },
            { id: '6sGUz_TnoTM', title: 'Materi Pembelajaran 8' },
          ].map((video, index) => (
            <div key={index} style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
                <iframe 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  src={`https://www.youtube.com/embed/${video.id}?rel=0`} 
                  title={video.title} 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PlayCircle size={18} color="#3b82f6" />
                <h4 style={{ fontSize: '0.9rem', color: '#1e293b', margin: 0 }}>{video.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }
];

export default function LearnTab() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  if (selectedModule !== null) {
    const mod = modules.find(m => m.id === selectedModule);
    return (
      <div className="page-container animate-fade-in" style={{ paddingTop: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', color: 'white' }}>
          <button onClick={() => setSelectedModule(null)} style={{ padding: '8px', marginRight: '16px' }}>
            <ChevronLeft size={24} color="white" />
          </button>
          <div style={{ textAlign: 'center', flex: 1, paddingRight: '40px' }}>
            <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{mod?.title}</h2>
            <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Modul Pembelajaran</span>
          </div>
        </div>
        
        <div className="card" style={{ marginTop: '40px', padding: '24px', paddingTop: '40px', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginTop: '-70px', marginBottom: '16px' }}>
            <img src={mod?.image} alt={mod?.title} style={{ width: '130px', height: '130px', borderRadius: '50%', border: '4px solid white', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', objectFit: 'cover' }} />
          </div>
          
          <h3 style={{ marginBottom: '16px', color: '#1e293b', textAlign: 'center' }}>Materi Lengkap</h3>
          <div style={{ lineHeight: '1.6', fontSize: '0.95rem', color: '#64748b', textAlign: 'left' }}>
            {mod?.content}
          </div>
          
          <div style={{ marginTop: '30px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <h4 style={{ color: '#3b82f6', marginBottom: '8px', fontSize: '0.9rem' }}>Tantangan:</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Praktikkan teori ini di menu <strong>Practice</strong> sekarang juga!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in" style={{ paddingTop: '50px' }}>
      <div style={{ color: 'white', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Apa yang ingin Anda pelajari?</h1>
        <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Pilih modul untuk meningkatkan skill Anda.</p>
      </div>

      <div className="card" style={{ padding: '24px 0', marginTop: '20px' }}>
        <h3 style={{ padding: '0 24px', marginBottom: '16px', fontSize: '1.1rem' }}>Materi Dasar</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', padding: '0 24px' }}>
          {modules.map((mod) => (
            <div key={mod.id} onClick={() => setSelectedModule(mod.id)} 
                 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#f8fafc', padding: '20px 12px', borderRadius: '16px', border: '1px solid #e2e8f0', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                {mod.icon}
              </div>
              <h3 style={{ fontSize: '0.95rem', color: '#1e293b', margin: '0 0 6px 0' }}>{mod.title}</h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>{mod.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card" style={{ marginTop: '16px' }}>
         <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>Progres Belajar</h3>
         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px', color: '#64748b' }}>
           <span>Terselesaikan</span>
           <span style={{ color: '#3b82f6', fontWeight: 600 }}>0 / {modules.length}</span>
         </div>
         <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
           <div style={{ width: '10%', height: '100%', background: '#3b82f6', borderRadius: '99px' }}></div>
         </div>
      </div>
    </div>
  );
}
