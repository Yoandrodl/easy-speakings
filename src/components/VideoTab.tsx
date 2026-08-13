import { PlayCircle } from 'lucide-react';

export default function VideoTab() {
  const videos = [
    { id: '3uZfhHMEj2w', title: 'Materi Pembelajaran 1' },
    { id: 'UDh5OVaNCZ4', title: 'Materi Pembelajaran 2' },
    { id: 'e-fqbBg-XRI', title: 'Materi Pembelajaran 3' },
    { id: 'LiKTDfgl3Dw', title: 'Materi Pembelajaran 4' },
    { id: 'ypu3x6Vvc-A', title: 'Materi Pembelajaran 5' },
    { id: 'hS9VVq8-fnc', title: 'Materi Pembelajaran 6' },
    { id: 'v-2ov9GfPDk', title: 'Materi Pembelajaran 7' },
    { id: '6sGUz_TnoTM', title: 'Materi Pembelajaran 8' },
  ];

  return (
    <div className="page-container animate-fade-in" style={{ paddingTop: '40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
          Galeri Video
        </h1>
        <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Kumpulan materi video lengkap.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '30px' }}>
        {videos.map((video, index) => (
          <div key={index} className="card" style={{ padding: '0', overflow: 'hidden', borderRadius: '16px' }}>
            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
              <iframe 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                src={`https://www.youtube.com/embed/${video.id}?rel=0`} 
                title={video.title} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <PlayCircle size={24} color="#3b82f6" />
              <h3 style={{ fontSize: '1rem', color: '#1e293b', margin: 0 }}>{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
