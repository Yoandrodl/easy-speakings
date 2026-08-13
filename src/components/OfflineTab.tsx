import { MapPin, Users, Phone, CheckCircle } from 'lucide-react';

export default function OfflineTab() {
  const waNumber = "6285721070453";
  const waMessage = "Halo, saya tertarik untuk ikut kelas offline public speaking.";
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="page-container animate-fade-in" style={{ paddingTop: '40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
          Kelas Offline
        </h1>
        <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Belajar langsung secara tatap muka.</p>
      </div>

      <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
           <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
              <Users size={32} />
           </div>
        </div>

        <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#1e293b', textAlign: 'center' }}>
          Tingkatkan Kepercayaan Diri Anda!
        </h2>
        
        <p style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center', marginBottom: '24px', lineHeight: '1.6' }}>
          Bergabunglah dengan kelas tatap muka kami dan dapatkan *feedback* langsung dari mentor berpengalaman. Praktik langsung, evaluasi langsung!
        </p>

        <h3 style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '12px' }}>Lokasi Kelas:</h3>
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

        <h3 style={{ fontSize: '1rem', color: '#1e293b', marginBottom: '12px' }}>Yang Akan Anda Dapatkan:</h3>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
          {[
            'Sesi Praktik Bicara di Depan Kelas',
            'Evaluasi Bahasa Tubuh & Intonasi',
            'Cara Menjawab Pertanyaan Sulit (Q&A)',
            'Grup Komunitas Alumni'
          ].map((item, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <CheckCircle size={18} color="#10b981" />
              <span style={{ fontSize: '0.9rem', color: '#64748b' }}>{item}</span>
            </li>
          ))}
        </ul>

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
  );
}
