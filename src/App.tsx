import { useState } from 'react';
import { BookOpen, Mic, Users, Shield, PlayCircle } from 'lucide-react';
import LearnTab from './components/LearnTab';
import PracticeTab from './components/PracticeTab';
import VideoTab from './components/VideoTab';
import OfflineTab from './components/OfflineTab';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [activeTab, setActiveTab] = useState('learn');

  const renderContent = () => {
    switch (activeTab) {
      case 'learn':
        return <LearnTab />;
      case 'practice':
        return <PracticeTab />;
      case 'video':
        return <VideoTab />;
      case 'offline':
        return <OfflineTab />;
      case 'privacy':
        return <PrivacyPolicy />;
      default:
        return <LearnTab />;
    }
  };

  return (
    <>
      <div className="header-curve"></div>
      
      <div className="content-area animate-fade-in">
        {renderContent()}
      </div>

      <nav className="bottom-nav">
        <button 
          className={`nav-item ${activeTab === 'learn' ? 'active' : ''}`}
          onClick={() => setActiveTab('learn')}
        >
          <BookOpen />
          <span>Learn</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'practice' ? 'active' : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          <Mic />
          <span>Practice</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'video' ? 'active' : ''}`}
          onClick={() => setActiveTab('video')}
        >
          <PlayCircle />
          <span>Video</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'offline' ? 'active' : ''}`}
          onClick={() => setActiveTab('offline')}
        >
          <Users />
          <span>Kelas</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'privacy' ? 'active' : ''}`}
          onClick={() => setActiveTab('privacy')}
        >
          <Shield />
          <span>Privacy</span>
        </button>
      </nav>
    </>
  );
}

export default App;
