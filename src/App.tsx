import { useState } from 'react';
import { BookOpen, Mic, Trophy, Shield } from 'lucide-react';
import LearnTab from './components/LearnTab';
import PracticeTab from './components/PracticeTab';
import ProTab from './components/ProTab';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [activeTab, setActiveTab] = useState('learn'); // 'learn', 'practice', 'pro', 'privacy'

  const renderContent = () => {
    switch (activeTab) {
      case 'learn':
        return <LearnTab />;
      case 'practice':
        return <PracticeTab />;
      case 'pro':
        return <ProTab />;
      case 'privacy':
        return <PrivacyPolicy />;
      default:
        return <LearnTab />;
    }
  };

  return (
    <>
      <div className="content-area animate-fade-in">
        {renderContent()}
      </div>

      <nav className="bottom-nav glass-nav">
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
          className={`nav-item ${activeTab === 'pro' ? 'active' : ''}`}
          onClick={() => setActiveTab('pro')}
        >
          <Trophy />
          <span>Pro</span>
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
