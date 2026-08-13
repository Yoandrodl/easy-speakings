import { useState } from 'react';
import { ChevronLeft, PlayCircle, Star, Target, MessageSquare } from 'lucide-react';

const modules = [
  {
    id: 1,
    title: "Atasi Gugup",
    description: "Teknik & Mindset",
    icon: <Target size={24} />,
    content: "Rasa gugup adalah reaksi alami tubuh saat menghadapi audiens. Untuk mengatasinya, tarik napas dalam-dalam melalui hidung selama 4 detik, tahan 4 detik, dan hembuskan perlahan melalui mulut selama 4 detik. Lakukan ini 3 kali sebelum naik panggung."
  },
  {
    id: 2,
    title: "Struktur Pidato",
    description: "Hook, Body, CTA",
    icon: <Star size={24} />,
    content: "Sebuah pidato yang baik memiliki struktur yang jelas. 1) Hook: Awali dengan kutipan, pertanyaan, atau cerita mengejutkan. 2) Body: Sampaikan maksimal 3 poin utama. 3) Call to Action: Tutup dengan ajakan bertindak."
  },
  {
    id: 3,
    title: "Body Language",
    description: "Gestur & Kontak Mata",
    icon: <PlayCircle size={24} />,
    content: "Tubuh Anda berbicara lebih keras daripada kata-kata. Berdirilah tegak, buka bahu Anda. Gunakan tangan Anda untuk menekankan poin. Bagi audiens menjadi 3 zona dan tatap satu orang di setiap zona secara bergantian."
  },
  {
    id: 4,
    title: "Filler Words",
    description: "Hindari 'Eee'",
    icon: <MessageSquare size={24} />,
    content: "Kata pengisi seperti 'eee' muncul karena otak berpikir lebih lambat dari mulut berbicara. Solusinya? JEDA. Lebih baik diam 2-3 detik saat berpikir daripada mengisinya dengan 'eee'."
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
          <div style={{ 
            position: 'absolute', top: '-32px', left: '50%', transform: 'translateX(-50%)',
            width: '64px', height: '64px', borderRadius: '50%', background: '#eff6ff', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}>
            {mod?.icon}
          </div>
          
          <h3 style={{ marginBottom: '16px', color: '#1e293b', textAlign: 'center' }}>Materi Lengkap</h3>
          <p style={{ lineHeight: '1.8', fontSize: '0.95rem', color: '#64748b' }}>
            {mod?.content}
          </p>
          
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
        
        <div className="horizontal-scroll">
          {modules.map((mod) => (
            <div key={mod.id} className="module-card-v" onClick={() => setSelectedModule(mod.id)}>
              <div className="module-icon">
                {mod.icon}
              </div>
              <h3 style={{ fontSize: '0.95rem', color: '#1e293b', marginBottom: '4px' }}>{mod.title}</h3>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{mod.description}</p>
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
