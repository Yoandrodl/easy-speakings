import { useState, useRef, useEffect } from 'react';
import { Play, Square, Activity, Shuffle } from 'lucide-react';

const randomSpeeches = [
  "Tahukah Anda bahwa 70% orang lebih takut berbicara di depan umum daripada kematian? Halo, perkenalkan saya Budi, seorang pelatih public speaking. Dalam 2 menit ke depan, saya akan membagikan 3 cara mengatasi gugup. Pertama, tarik napas dalam. Kedua, persiapkan materi dengan matang. Ketiga, anggap audiens sebagai teman. Mari mulai praktikkan 3 hal ini dari sekarang dan taklukkan panggung Anda!",
  "'Pendidikan adalah senjata paling ampuh untuk mengubah dunia.' Selamat pagi, saya Siti, seorang praktisi pendidikan. Dalam 3 menit ini, saya akan membahas 2 alasan mengapa pendidikan usia dini sangat penting. Satu, membentuk karakter dasar anak. Dua, merangsang perkembangan kognitif secara optimal. Oleh karena itu, mari kita dukung program pendidikan usia dini di lingkungan kita mulai hari ini.",
  "Pernahkah Anda membuang plastik sekecil sedotan dan berpikir itu tidak masalah? Perkenalkan, saya Andi, aktivis lingkungan. Hari ini, selama 2 menit, saya akan menyoroti 3 dampak buruk sampah plastik. Pertama, meracuni tanah. Kedua, membunuh biota laut. Ketiga, mencemari rantai makanan kita. Ayo, kurangi penggunaan plastik sekali pakai mulai dari diri kita sendiri!",
  "Di era digital ini, apakah kita mengendalikan teknologi, atau teknologi yang mengendalikan kita? Halo, saya Dina, seorang peneliti media digital. Dalam presentasi singkat 3 menit ini, saya akan memaparkan 2 cara bijak bermedia sosial. Pertama, batasi waktu layar maksimal 2 jam sehari. Kedua, saring sebelum sharing. Mari kita ciptakan ruang digital yang sehat dan positif!",
  "'Seorang pemimpin adalah dia yang tahu jalannya, melewati jalannya, dan menunjukkan jalannya.' Perkenalkan, saya Reza, konsultan kepemimpinan. Selama 2 menit ke depan, saya akan menjelaskan 3 kualitas pemimpin sejati. Satu, memiliki visi yang jelas. Dua, empati tinggi. Tiga, berani mengambil risiko. Mari kita kembangkan tiga sifat ini dan jadilah pemimpin yang menginspirasi di tempat kerja kita.",
  "Pernahkah Anda merasa waktu 24 jam sehari tidak pernah cukup? Halo semuanya, saya Ayu, seorang pakar produktivitas. Dalam 3 menit ini, saya akan membagikan 3 teknik manajemen waktu. Pertama, buat to-do list harian. Kedua, gunakan teknik Pomodoro. Ketiga, hindari multitasking. Yuk, mulai terapkan teknik ini besok pagi dan rasakan bedanya!",
  "Satu batang lidi mudah dipatahkan, tapi segenggam lidi sangatlah kuat. Perkenalkan, saya Doni, manajer HRD. Hari ini, dalam 2 menit, saya akan membahas pentingnya kerja sama tim melalui 2 poin utama. Pertama, sinergi menghasilkan ide yang lebih inovatif. Kedua, beban kerja menjadi lebih ringan. Mari kita turunkan ego pribadi dan mulai bekerja sama demi tujuan bersama perusahaan.",
  "Kapan terakhir kali Anda benar-benar merasa bersyukur atas hal kecil? Selamat pagi, saya Maya, seorang psikolog klinis. Selama 3 menit ke depan, saya akan menjelaskan 3 manfaat rasa syukur bagi mental kita. Satu, mengurangi stres. Dua, meningkatkan kualitas tidur. Tiga, membuat hidup lebih bahagia. Saya mengajak Anda semua, malam ini sebelum tidur, tuliskan 3 hal yang Anda syukuri hari ini.",
  "Kesehatan fisik sering dijaga, tapi bagaimana dengan kesehatan mental kita? Halo, saya dr. Rina. Dalam waktu 2 menit ini, saya akan memaparkan 2 cara menjaga kesehatan mental di tempat kerja. Pertama, tetapkan batasan waktu kerja yang jelas. Kedua, jangan ragu meminta bantuan profesional jika kewalahan. Ingat, tidak apa-apa untuk merasa tidak baik-baik saja. Mari kita saling peduli dan hilangkan stigma tentang kesehatan mental.",
  "'Kesuksesan bukanlah kunci kebahagiaan. Kebahagiaanlah kunci kesuksesan.' Perkenalkan, saya Rio, seorang *life coach*. Dalam presentasi 3 menit ini, saya akan membagikan 3 rahasia hidup sukses dan bahagia. Pertama, cintai apa yang Anda kerjakan. Kedua, teruslah belajar hal baru. Ketiga, kelilingi diri Anda dengan orang positif. Mulailah mencintai pekerjaan Anda hari ini, dan lihatlah bagaimana kesuksesan akan mengikuti!"
];

export default function PracticeTab() {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState("Halo semuanya, selamat datang. Hari ini saya ingin berbicara tentang pentingnya komunikasi yang baik.");
  const [fillerCount, setFillerCount] = useState(0);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'id-ID';

      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);

        // Detect filler words
        const words = currentTranscript.toLowerCase().trim().split(/\s+/);
        const fillers = ['eee', 'umm', 'eh', 'anu', 'hmm', 'em'];
        const count = words.filter(word => fillers.includes(word)).length;
        if (count > 0 && event.results[event.results.length - 1].isFinal) {
           setFillerCount(prev => prev + count);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleStart = () => {
    setIsRecording(true);
    setFillerCount(0);
    setTranscript("");
    startCamera();
    if (recognitionRef.current) {
      try { recognitionRef.current.start(); } catch(e) {}
    }
  };

  const handleStop = () => {
    setIsRecording(false);
    stopCamera();
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div className="page-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingTop: '40px' }}>
      <div style={{ color: 'white', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Area Latihan</h2>
        <p style={{ opacity: 0.8, fontSize: '0.85rem', marginBottom: '12px' }}>Teleprompter & AI Assistant</p>
        <p style={{ fontSize: '0.8rem', lineHeight: '1.5', background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px' }}>
          <strong>Cara Kerja:</strong> Ketik atau pilih naskah acak, lalu klik Mulai. Kamera akan menyala dan naskah berjalan otomatis. AI akan mendengarkan suara Anda dan menghitung jika Anda memakai kata pengisi (filler) seperti "eee" atau "umm".
        </p>
      </div>
      
      {!isRecording ? (
        <div className="card" style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <label style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
              Naskah Anda:
            </label>
            <button 
              onClick={() => {
                const random = randomSpeeches[Math.floor(Math.random() * randomSpeeches.length)];
                setText(random);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#3b82f6', background: '#eff6ff', padding: '6px 12px', borderRadius: '99px', fontWeight: 600 }}
            >
              <Shuffle size={14} /> Teks Acak
            </button>
          </div>
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ 
              width: '100%', 
              flex: 1, 
              background: '#f8fafc', 
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '16px',
              color: '#1e293b',
              fontFamily: 'inherit',
              resize: 'none',
              marginBottom: '20px',
              fontSize: '1rem',
              lineHeight: '1.6'
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <button className="btn-primary" onClick={handleStart} style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Play size={18} /> Mulai Latihan
            </button>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', margin: '-10px', marginTop: '0' }}>
          {/* Camera View */}
          <div style={{ 
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
            borderRadius: '20px', overflow: 'hidden', background: '#000', zIndex: 1 
          }}>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}></div>
          </div>

          {/* Teleprompter Text overlay */}
          <div style={{ 
            position: 'relative', zIndex: 2, padding: '24px', flex: 1, 
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            textAlign: 'center'
          }}>
            <p style={{ 
              fontSize: '1.8rem', 
              fontWeight: 600, 
              color: 'white', 
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              lineHeight: '1.4'
            }}>
              {text}
            </p>
          </div>

          {/* Controls overlay */}
          <div style={{ position: 'relative', zIndex: 2, padding: '20px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', boxShadow: '0 -10px 30px rgba(0,0,0,0.1)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
                   <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 1.5s infinite' }}></div>
                   <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Merekam</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontSize: '0.9rem', fontWeight: 600, background: '#fef3c7', padding: '6px 12px', borderRadius: '20px' }}>
                  <Activity size={16} /> Filler: {fillerCount}x
                </div>
                <button onClick={handleStop} style={{ background: '#1e293b', color: 'white', padding: '10px 20px', borderRadius: '99px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                  <Square size={16} /> Stop
                </button>
             </div>
             {transcript && (
               <div style={{ marginTop: '16px', fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic', maxHeight: '40px', overflow: 'hidden', textAlign: 'center' }}>
                 "{transcript}"
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
}
