import { useState } from 'react';
import { ChevronLeft, PlayCircle, Star, Target, MessageSquare } from 'lucide-react';

const modules = [
  {
    id: 1,
    title: "Mengatasi Gugup 101",
    description: "Teknik pernapasan dan mindset sebelum tampil.",
    icon: <Target size={24} />,
    content: "Rasa gugup adalah reaksi alami tubuh saat menghadapi audiens. Untuk mengatasinya, tarik napas dalam-dalam melalui hidung selama 4 detik, tahan 4 detik, dan hembuskan perlahan melalui mulut selama 4 detik. Lakukan ini 3 kali sebelum naik panggung. Selain itu, ubah mindset Anda: audiens hadir bukan untuk menghakimi, melainkan untuk mendengarkan pesan penting Anda."
  },
  {
    id: 2,
    title: "Struktur Pidato Memukau",
    description: "Gunakan rumus Hook, Body, Call to Action.",
    icon: <Star size={24} />,
    content: "Sebuah pidato yang baik memiliki struktur yang jelas. 1) Hook: Awali dengan kutipan, pertanyaan, atau cerita mengejutkan. 2) Body: Sampaikan maksimal 3 poin utama agar audiens mudah mengingatnya. 3) Call to Action: Tutup dengan ajakan bertindak yang spesifik."
  },
  {
    id: 3,
    title: "Bahasa Tubuh (Body Language)",
    description: "Gestur tangan dan kontak mata yang benar.",
    icon: <PlayCircle size={24} />,
    content: "Tubuh Anda berbicara lebih keras daripada kata-kata. Berdirilah dengan tegak, buka bahu Anda. Gunakan tangan Anda untuk menekankan poin, jangan dimasukkan ke dalam saku. Untuk kontak mata, bagi audiens menjadi 3 zona (kiri, tengah, kanan) dan tatap satu orang di setiap zona selama 3-5 detik secara bergantian."
  },
  {
    id: 4,
    title: "Menghindari 'Filler Words'",
    description: "Cara menghilangkan kebiasaan bilang 'Eee' dan 'Umm'.",
    icon: <MessageSquare size={24} />,
    content: "Kata pengisi seperti 'eee' muncul karena otak Anda berpikir lebih lambat dari mulut Anda berbicara. Solusinya? JEDA. Lebih baik Anda diam 2-3 detik saat berpikir daripada mengisinya dengan 'eee'. Jeda juga memberikan kesan berwibawa. Berlatihlah di menu 'Practice' untuk mendeteksi seberapa sering Anda mengucapkannya."
  }
];

export default function LearnTab() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  if (selectedModule !== null) {
    const mod = modules.find(m => m.id === selectedModule);
    return (
      <div className="animate-fade-in">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '10px' }}>
          <button onClick={() => setSelectedModule(null)} style={{ padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
            <ChevronLeft size={20} />
          </button>
          <h2>{mod?.title}</h2>
        </div>
        
        <div className="glass" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
              {mod?.icon}
            </div>
          </div>
          <h3 style={{ marginBottom: '16px', color: '#3b82f6' }}>Materi Pembelajaran</h3>
          <p style={{ lineHeight: '1.8', fontSize: '1.05rem', color: '#e2e8f0' }}>
            {mod?.content}
          </p>
          
          <div style={{ marginTop: '40px', padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <h4 style={{ color: '#10b981', marginBottom: '8px' }}>Tantangan:</h4>
            <p style={{ fontSize: '0.9rem' }}>Praktikkan teori ini di menu <strong>Practice</strong> sekarang juga!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '8px' }}>Public Speaking Mastery</h1>
      <p style={{ marginBottom: '24px' }}>Pelajari pondasi dasar komunikasi memukau secara gratis.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
          <span>Progres Belajar</span>
          <span style={{ color: '#3b82f6' }}>0 / {modules.length} Selesai</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', overflow: 'hidden' }}>
          <div style={{ width: '10%', height: '100%', background: '#3b82f6', borderRadius: '99px' }}></div>
        </div>
      </div>

      <div>
        {modules.map((mod) => (
          <div key={mod.id} className="glass module-card" onClick={() => setSelectedModule(mod.id)}>
            <div className="module-icon">
              {mod.icon}
            </div>
            <div className="module-info">
              <h3>{mod.title}</h3>
              <p>{mod.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
