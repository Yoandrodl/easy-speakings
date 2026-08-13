import { CheckCircle, ArrowRight } from 'lucide-react';

export default function ProTab() {
  return (
    <div className="animate-fade-in" style={{ padding: '10px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
          Public Speaking PRO
        </h1>
        <p style={{ color: '#94a3b8' }}>Tingkatkan karir Anda dengan komunikasi yang memukau.</p>
      </div>

      <div className="glass" style={{ padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Apa yang Anda dapatkan di kelas PRO?</h2>
        
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {[
            'Akses 50+ Video Pembelajaran',
            'Template Naskah Berbagai Situasi',
            'Sertifikat Penyelesaian',
            'Grup Komunitas & Mentoring Khusus',
            'Review Video Pidato Pribadi Anda'
          ].map((item, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <CheckCircle size={20} color="#10b981" />
              <span style={{ fontSize: '0.95rem' }}>{item}</span>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <p style={{ textDecoration: 'line-through', color: '#64748b', fontSize: '0.9rem', margin: '0' }}>Rp 990.000</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', margin: '0 0 16px 0' }}>Rp 249.000</p>
          
          <button className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            Daftar Sekarang <ArrowRight size={18} />
          </button>
          
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '16px' }}>
            Atau hubungi admin via WhatsApp untuk konsultasi gratis.
          </p>
          <a href="#" style={{ color: '#3b82f6', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>
            Chat Admin WhatsApp
          </a>
        </div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
         <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>Kata Mereka:</h3>
         <div className="glass" style={{ padding: '16px', fontStyle: 'italic', fontSize: '0.9rem', color: '#cbd5e1' }}>
           "Dulu saya selalu gemetar saat disuruh presentasi bos. Setelah ikut kelas ini dan paham teknik 'Hook', presentasi saya selalu dipuji!" 
           <br/><br/>
           <strong style={{ color: '#fff', fontStyle: 'normal' }}>- Budi, Sales Manager</strong>
         </div>
      </div>
    </div>
  );
}
