import { useState, useRef, useEffect } from 'react';
import { Play, Square, RefreshCcw, Activity } from 'lucide-react';

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
        const words = currentTranscript.toLowerCase().split(' ');
        const fillers = ['eee', 'umm', 'e', 'anu', 'hmm'];
        const count = words.filter(word => fillers.some(f => word.includes(f))).length;
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
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h2 style={{ marginBottom: '16px' }}>Practice: Teleprompter & AI</h2>
      
      {!isRecording ? (
        <div className="glass" style={{ padding: '16px', marginBottom: '20px', flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#94a3b8' }}>
            Ketik Naskah Pidato Anda di Sini:
          </label>
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ 
              width: '100%', 
              height: '200px', 
              background: 'rgba(0,0,0,0.2)', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '12px',
              color: 'white',
              fontFamily: 'inherit',
              resize: 'none'
            }}
          />
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button className="btn-primary" onClick={handleStart} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Play size={18} /> Mulai Latihan
            </button>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Camera View */}
          <div style={{ 
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
            borderRadius: '16px', overflow: 'hidden', background: '#000', zIndex: 1 
          }}>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }}></div>
          </div>

          {/* Teleprompter Text overlay */}
          <div style={{ 
            position: 'relative', zIndex: 2, padding: '24px', flex: 1, 
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            textAlign: 'center'
          }}>
            <p style={{ 
              fontSize: '1.5rem', 
              fontWeight: 600, 
              color: 'white', 
              textShadow: '0 2px 10px rgba(0,0,0,0.8)' 
            }}>
              {text}
            </p>
          </div>

          {/* Controls overlay */}
          <div style={{ position: 'relative', zIndex: 2, padding: '16px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 1.5s infinite' }}></div>
                   <span style={{ fontSize: '0.85rem' }}>Merekam...</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontSize: '0.9rem', fontWeight: 600 }}>
                  <Activity size={16} /> Filler: {fillerCount}x
                </div>
                <button onClick={handleStop} style={{ background: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Square size={16} /> Stop
                </button>
             </div>
             {transcript && (
               <div style={{ marginTop: '12px', fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic', maxHeight: '40px', overflow: 'hidden' }}>
                 Terdengar: "{transcript}"
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
}
