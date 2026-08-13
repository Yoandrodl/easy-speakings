import { useState } from 'react';
import { BookOpen, Mic, Users, Shield } from 'lucide-react';
import LearnTab from './components/LearnTab';
import PracticeTab from './components/PracticeTab';
import OfflineTab from './components/OfflineTab';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [activeTab, setActiveTab] = useState('learn');
  const [learnTabKey, setLearnTabKey] = useState(0);

  const handleNavClick = (tabName: string) => {
    if (tabName === 'learn' && activeTab === 'learn') {
      setLearnTabKey(prev => prev + 1);
    }
    setActiveTab(tabName);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'learn':
        return <LearnTab key={learnTabKey} />;
      case 'practice':
        return <PracticeTab />;
      case 'offline':
        return <OfflineTab />;
      case 'privacy':
        return <PrivacyPolicy />;
      default:
        return <LearnTab key={learnTabKey} />;
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
