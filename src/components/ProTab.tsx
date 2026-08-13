import { CheckCircle, ArrowRight } from 'lucide-react';

export default function ProTab() {
  return (
    <div className="page-container animate-fade-in" style={{ paddingTop: '40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
          PRO Member
        </h1>
        <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Tingkatkan skill dengan mentor ahli.</p>
      </div>

      <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#1e293b' }}>Fitur Kelas PRO:</h2>
        
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {[
            'Akses 50+ Video Pembelajaran',
            'Template Naskah Berbagai Situasi',
            'Sertifikat Penyelesaian',
            'Grup Komunitas & Mentoring Khusus',
            'Review Video Pidato Pribadi Anda'
          ].map((item, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#eff6ff', borderRadius: '50%', padding: '4px' }}>
                 <CheckCircle size={20} color="#3b82f6" />
              </div>
              <span style={{ fontSize: '0.95rem', color: '#1e293b' }}>{item}</span>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
          <p style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.9rem', margin: '0' }}>Rp 990.000</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e293b', margin: '0 0 16px 0' }}>Rp 249.000</p>
          
          <button className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '16px' }}>
            Daftar Sekarang <ArrowRight size={18} />
          </button>
          
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '16px' }}>
            Atau hubungi admin via WhatsApp untuk konsultasi.
          </p>
        </div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
         <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: '#1e293b' }}>Kata Mereka:</h3>
         <div className="card" style={{ padding: '16px', fontStyle: 'italic', fontSize: '0.9rem', color: '#64748b' }}>
           "Dulu saya selalu gemetar saat disuruh presentasi bos. Setelah ikut kelas ini dan paham teknik 'Hook', presentasi saya selalu dipuji!" 
           <br/><br/>
           <strong style={{ color: '#1e293b', fontStyle: 'normal' }}>- Budi, Sales Manager</strong>
         </div>
      </div>
    </div>
  );
}
