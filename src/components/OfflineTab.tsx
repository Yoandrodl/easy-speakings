import { MapPin, Phone, CheckCircle } from 'lucide-react';
import headerImg from '../assets/offline_header.jpg';

export default function OfflineTab() {
  const waNumber = "6285721070453";
  const waMessage = "Halo, saya tertarik untuk ikut kelas offline public speaking.";
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  const mindsetList = [
    'Cara mengatasi setiap kegugupan yang pernah kamu alami',
    'Cara cepat percaya diri',
    'Cara agar tidak lupa materi'
  ];

  const strukturList = [
    'Cara membuka presentasi',
    'Cara membuat materi yang mudah dipahami penonton',
    'Teknik V-O-I-C-E',
    'Cara menutup presentasi agar selalu diingat'
  ];

  const gayaList = [
    'Postur presentasi yang percaya diri',
    'Gesture tangan yang deskriptif',
    'Cara presentasi menarik perhatian penonton',
    'Cara interaksi dengan penonton'
  ];

  const renderList = (items: string[]) => (
    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
      {items.map((item, idx) => (
        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
          <div style={{ marginTop: '2px' }}><CheckCircle size={16} color="#10b981" /></div>
          <span style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="page-container animate-fade-in" style={{ paddingTop: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
          Kelas Offline
        </h1>
        <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Belajar langsung secara tatap muka.</p>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden', marginBottom: '24px' }}>
        {/* Header Image */}
        <div style={{ width: '100%', height: '180px', backgroundImage: `url(${headerImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>

        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#1e293b', textAlign: 'center' }}>
            Tingkatkan Kepercayaan Diri Anda!
          </h2>
          
          <p style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center', marginBottom: '24px', lineHeight: '1.6' }}>
            Bergabunglah dengan kelas tatap muka kami dan dapatkan *feedback* langsung dari mentor berpengalaman. Praktik langsung, evaluasi langsung!
          </p>

          <h3 style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '12px', borderBottom: '2px solid #eff6ff', paddingBottom: '8px' }}>Mindset & Persiapan</h3>
          {renderList(mindsetList)}

          <h3 style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '12px', borderBottom: '2px solid #eff6ff', paddingBottom: '8px' }}>Struktur & Penyampaian</h3>
          {renderList(strukturList)}

          <h3 style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '12px', borderBottom: '2px solid #eff6ff', paddingBottom: '8px' }}>Gaya Tubuh & Interaksi</h3>
          {renderList(gayaList)}

          <h3 style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '12px', marginTop: '24px' }}>Lokasi Kelas:</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <MapPin color="#3b82f6" size={20} />
              <span style={{ fontWeight: 500, color: '#1e293b' }}>Bandung</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <MapPin color="#3b82f6" size={20} />
              <span style={{ fontWeight: 500, color: '#1e293b' }}>Jakarta Selatan</span>
            </div>
          </div>

          <a 
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <button className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '16px' }}>
              <Phone size={18} /> Hubungi via WhatsApp
            </button>
          </a>
          
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '16px', textAlign: 'center' }}>
            Atau simpan nomor admin: <strong style={{ color: '#64748b' }}>0857-2107-0453</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
