import { useState, useRef, useEffect } from 'react';
import { Play, Square, Activity, Shuffle, Video, Mic2, ChevronLeft } from 'lucide-react';
import { randomSpeeches } from '../data/speeches';

type PracticeMode = 'menu' | 'filler' | 'teleprompter';

export default function PracticeTab() {
  const [mode, setMode] = useState<PracticeMode>('menu');
  const [currentText, setCurrentText] = useState(randomSpeeches[0]);

  // For both modes: video camera
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // For Filler Mode
  const [isRecording, setIsRecording] = useState(false);
  const [fillerCount, setFillerCount] = useState(0);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Start camera if we are in one of the active modes
    if (mode === 'filler' || mode === 'teleprompter') {
      startCamera();
    } else {
      stopCamera();
    }
  }, [mode]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Speech Recognition (Only active for Filler Mode when isRecording is true)
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

        // Detect filler words (exact match)
        const words = currentTranscript.toLowerCase().trim().split(/\s+/);
        const fillers = ['eee', 'umm', 'eh', 'anu', 'hmm', 'em'];
        const count = words.filter(word => fillers.includes(word)).length;
        if (count > 0 && event.results[event.results.length - 1].isFinal) {
           setFillerCount(prev => prev + count);
        }
      };

      recognition.onend = () => {
         if (isRecording && mode === 'filler') {
           recognition.start();
         }
      };

      recognitionRef.current = recognition;
    }
  }, [isRecording, mode]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setFillerCount(0);
      setTranscript("");
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const randomizeText = () => {
    const randomIndex = Math.floor(Math.random() * randomSpeeches.length);
    setCurrentText(randomSpeeches[randomIndex]);
  };

  if (mode === 'menu') {
    return (
      <div className="page-container animate-fade-in" style={{ paddingTop: '50px' }}>
        <div style={{ color: 'white', marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Area Latihan</h1>
          <p style={{ opacity: 0.8, fontSize: '0.95rem' }}>Pilih mode latihan yang ingin Anda fokuskan hari ini.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div onClick={() => setMode('teleprompter')} className="card" style={{ padding: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '16px', border: '2px solid transparent', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Video size={30} />
            </div>
            <div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#1e293b' }}>Latihan Teleprompter</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>Gunakan layar HP sebagai cermin. Latih tempo bicara Anda, gestur tangan, postur, dan ekspresi wajah.</p>
            </div>
          </div>

          <div onClick={() => setMode('filler')} className="card" style={{ padding: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '16px', border: '2px solid transparent', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Mic2 size={30} />
            </div>
            <div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#1e293b' }}>Latihan Filler Words</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>Hilangkan kebiasaan bergumam ('eee', 'umm'). Baca naskah dan biarkan AI menghitung skor filler Anda secara *real-time*.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in" style={{ paddingTop: '30px', paddingBottom: '100px', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      
      {/* Header with Back Button */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', color: 'white', zIndex: 10 }}>
        <button onClick={() => {
          if (isRecording) toggleRecording();
          setMode('menu');
        }} style={{ padding: '8px', marginRight: '16px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', backdropFilter: 'blur(5px)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronLeft size={24} color="white" />
        </button>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{mode === 'filler' ? 'Latihan Filler' : 'Latihan Teleprompter'}</h2>
        </div>
      </div>

      {/* Instructions Box */}
      <div style={{ background: 'rgba(255,255,255,0.95)', padding: '16px', borderRadius: '12px', marginBottom: '20px', zIndex: 10, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h4 style={{ color: mode === 'filler' ? '#ef4444' : '#3b82f6', margin: '0 0 8px 0', fontSize: '0.95rem' }}>Tujuan Latihan:</h4>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>
          {mode === 'filler' 
            ? "Latihan ini bertujuan menghilangkan kebiasaan mengucapkan kata pengisi ('eee', 'umm', 'anu'). Baca naskah panjang di bawah, dan AI akan merekam suara Anda. Silakan lihat angka merah yang muncul jika filler Anda banyak. Biasakan JEDA atau diam sejenak jika Anda bingung."
            : "Latihan ini bertujuan agar Anda bisa membaca dengan tempo yang tepat (naskah ini didesain untuk ~5 menit membaca). Jangan terlalu cepat atau terlalu lambat. Gunakan layar ini sebagai cermin: Latih gerakan tangan Anda, berdirilah tegak, dan latih ekspresi wajah!"}
        </p>
      </div>

      {/* Camera / Teleprompter Area */}
      <div style={{ flex: 1, position: 'relative', borderRadius: '20px', overflow: 'hidden', background: '#000', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>
        <video 
          ref={videoRef}
          autoPlay 
          playsInline
          muted
          style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
        />
        
        {/* Overlay Gradients */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%', background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 50%, transparent 100%)', pointerEvents: 'none' }} />

        {/* Text Container */}
        <div style={{ position: 'absolute', top: '15%', bottom: mode === 'filler' ? '120px' : '80px', left: '20px', right: '20px', overflowY: 'auto', paddingRight: '10px' }}>
          <p style={{ color: 'white', fontSize: '1.35rem', lineHeight: '1.7', fontWeight: 600, textShadow: '0 2px 4px rgba(0,0,0,0.8)', whiteSpace: 'pre-wrap', margin: 0, paddingBottom: '40px' }}>
            {currentText}
          </p>
        </div>

        {/* Controls Overlay */}
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {mode === 'filler' && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={toggleRecording}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', borderRadius: '16px', border: 'none', background: isRecording ? '#ef4444' : '#22c55e', color: 'white', fontWeight: 600, fontSize: '1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', transition: 'all 0.3s' }}
              >
                {isRecording ? <Square fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} />}
                {isRecording ? "Stop" : "Mulai Rekam"}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 20px', background: 'rgba(255,255,255,0.95)', borderRadius: '16px', color: '#1e293b', fontWeight: 700, fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                <Activity size={20} color="#ef4444" />
                <span style={{ color: fillerCount > 0 ? '#ef4444' : '#1e293b' }}>Filler: {fillerCount}x</span>
              </div>
            </div>
          )}
          
          {mode === 'filler' && transcript && (
            <div style={{ background: 'rgba(0,0,0,0.6)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                "{transcript}"
              </p>
            </div>
          )}

          <button 
            onClick={randomizeText}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', borderRadius: '16px', border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(10px)', fontWeight: 600, fontSize: '1rem' }}
          >
            <Shuffle size={20} />
            Ganti Naskah (Acak)
          </button>
        </div>
      </div>
    </div>
  );
}
