export default function PrivacyPolicy() {
  return (
    <div className="page-container animate-fade-in" style={{ paddingTop: '40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Privacy Policy</h1>
        <p style={{ opacity: 0.8, fontSize: '0.85rem' }}>Kebijakan Privasi Pengguna</p>
      </div>
      
      <div className="card" style={{ padding: '24px', fontSize: '0.9rem', color: '#64748b' }}>
        <p style={{ marginBottom: '16px' }}><strong>Terakhir diperbarui: Agustus 2026</strong></p>
        
        <h3 style={{ color: '#1e293b', marginBottom: '8px', fontSize: '1rem' }}>1. Pendahuluan</h3>
        <p style={{ marginBottom: '16px' }}>
          Selamat datang di Aplikasi Public Speaking Mastery. Kami menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda.
        </p>

        <h3 style={{ color: '#1e293b', marginBottom: '8px', fontSize: '1rem' }}>2. Akses Kamera & Mikrofon</h3>
        <p style={{ marginBottom: '16px' }}>
          Fitur "Practice" di aplikasi kami membutuhkan akses ke kamera dan mikrofon perangkat Anda untuk berfungsi sebagai teleprompter dan pendeteksi *filler word*. 
          <strong style={{ color: '#1e293b' }}> Kami TIDAK merekam, menyimpan, atau mengunggah video/audio Anda ke server kami.</strong> Semua pemrosesan suara dan video terjadi secara lokal di perangkat Anda.
        </p>

        <h3 style={{ color: '#1e293b', marginBottom: '8px', fontSize: '1rem' }}>3. Pengumpulan Data</h3>
        <p style={{ marginBottom: '16px' }}>
          Kami tidak mengumpulkan informasi pengenal pribadi apa pun kecuali jika Anda secara sukarela memberikannya (misalnya dengan menghubungi admin WhatsApp kami).
        </p>

        <h3 style={{ color: '#1e293b', marginBottom: '8px', fontSize: '1rem' }}>4. Perubahan Kebijakan</h3>
        <p style={{ marginBottom: '16px' }}>
          Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Oleh karena itu, Anda disarankan untuk meninjau halaman ini secara berkala.
        </p>
      </div>
    </div>
  );
}
