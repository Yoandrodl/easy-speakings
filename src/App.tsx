import { useState } from 'react';
import { BookOpen, Mic, Users, Shield } from 'lucide-react';

const InstagramIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
import LearnTab from './components/LearnTab';
import PracticeTab from './components/PracticeTab';
import OfflineTab from './components/OfflineTab';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [activeTab, setActiveTab] = useState('learn');
  const [learnTabKey, setLearnTabKey] = useState(0);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  const handleNavClick = (tabName: string) => {
    if (tabName === 'learn' && activeTab === 'learn') {
      setLearnTabKey(prev => prev + 1);
      setSelectedModule(null); // Also reset selected module
    }
    setActiveTab(tabName);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'learn':
        return <LearnTab key={learnTabKey} selectedModule={selectedModule} setSelectedModule={setSelectedModule} />;
      case 'practice':
        return <PracticeTab />;
      case 'offline':
        return <OfflineTab />;
      case 'privacy':
        return <PrivacyPolicy />;
      default:
        return <LearnTab key={learnTabKey} selectedModule={selectedModule} setSelectedModule={setSelectedModule} />;
    }
  };

  const showTopIgLogo = activeTab === 'learn' && selectedModule === null;

  return (
    <>
      <div className="header-curve"></div>
      
      {showTopIgLogo && (
        <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 100 }}>
          <a 
            href="https://www.instagram.com/easy_speakings" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.25)', padding: '6px 12px', borderRadius: '20px', color: 'white', textDecoration: 'none', backdropFilter: 'blur(4px)', fontSize: '0.85rem', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
          >
            <InstagramIcon size={16} />
            <span style={{ fontWeight: 500 }}>easy_speakings</span>
          </a>
        </div>
      )}
      
      <div className="content-area animate-fade-in">
        {renderContent()}
      </div>

      <nav className="bottom-nav">
        <button 
          className={`nav-item ${activeTab === 'learn' ? 'active' : ''}`}
          onClick={() => handleNavClick('learn')}
        >
          <BookOpen />
          <span>Learn</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'practice' ? 'active' : ''}`}
          onClick={() => handleNavClick('practice')}
        >
          <Mic />
          <span>Practice</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'offline' ? 'active' : ''}`}
          onClick={() => handleNavClick('offline')}
        >
          <Users />
          <span>Kelas</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'privacy' ? 'active' : ''}`}
          onClick={() => handleNavClick('privacy')}
        >
          <Shield />
          <span>Privacy</span>
        </button>
      </nav>
    </>
  );
}

export default App;
