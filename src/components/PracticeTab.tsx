import { useState, useRef, useEffect } from 'react';
import { Play, Square, Activity, Shuffle } from 'lucide-react';

const randomSpeeches = [
  "Halo semuanya. Hari ini saya ingin berbicara tentang pentingnya menjaga semangat pantang menyerah. Kegagalan bukanlah akhir, melainkan pelajaran berharga untuk bangkit lebih kuat.",
  "Selamat pagi. Pendidikan adalah senjata paling ampuh yang bisa kita gunakan untuk mengubah dunia. Mari kita manfaatkan setiap kesempatan belajar yang ada.",
  "Teman-teman, lingkungan kita sedang tidak baik-baik saja. Mulai dari hal kecil seperti mengurangi sampah plastik, kita bisa membuat perubahan besar bagi bumi.",
  "Di era digital ini, teknologi berkembang sangat pesat. Namun ingat, teknologi adalah alat. Kitalah yang harus mengendalikannya, bukan sebaliknya.",
  "Seorang pemimpin sejati bukan dia yang memiliki banyak pengikut, melainkan dia yang mampu menciptakan pemimpin-pemimpin baru di sekitarnya.",
  "Waktu adalah aset yang tidak bisa dibeli atau diputar kembali. Mari kita kelola waktu dengan bijak agar setiap detik yang kita lalui menjadi bermakna.",
  "Tidak ada kesuksesan besar yang diraih sendirian. Kerja sama tim adalah kunci. Mari kita turunkan ego dan bersinergi untuk mencapai tujuan bersama.",
  "Seringkali kita terlalu fokus pada apa yang belum kita miliki, sampai lupa mensyukuri apa yang sudah ada. Rasa syukur adalah kunci kebahagiaan sejati.",
  "Kesehatan fisik memang penting, tapi jangan pernah abaikan kesehatan mental. Beristirahatlah saat lelah, dan jangan ragu meminta bantuan jika merasa tertekan.",
  "Kesuksesan tidak datang dari keajaiban semalam. Kesuksesan adalah hasil dari persiapan panjang, kerja keras, dan kemauan belajar dari setiap kegagalan."
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
