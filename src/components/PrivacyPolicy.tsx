export default function PrivacyPolicy() {
  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>Privacy Policy</h1>
      
      <div className="glass" style={{ padding: '24px', fontSize: '0.9rem', color: '#cbd5e1' }}>
        <p style={{ marginBottom: '16px' }}><strong>Last updated: August 2026</strong></p>
        
        <h3 style={{ color: '#fff', marginBottom: '8px' }}>1. Introduction</h3>
        <p style={{ marginBottom: '16px' }}>
          Welcome to the Public Speaking Mastery App. We respect your privacy and are committed to protecting your personal data.
        </p>

        <h3 style={{ color: '#fff', marginBottom: '8px' }}>2. Camera and Microphone Access</h3>
        <p style={{ marginBottom: '16px' }}>
          Our app's "Practice" feature requires access to your device's camera and microphone to function as a teleprompter and filler word tracker. 
          <strong> We do NOT record, save, or upload your video/audio to our servers.</strong> All speech recognition and video processing happens locally on your device.
        </p>

        <h3 style={{ color: '#fff', marginBottom: '8px' }}>3. Data Collection</h3>
        <p style={{ marginBottom: '16px' }}>
          We do not collect any personally identifiable information unless you explicitly provide it (e.g., by contacting our WhatsApp admin). We may use anonymous analytics to improve the app experience.
        </p>

        <h3 style={{ color: '#fff', marginBottom: '8px' }}>4. Changes to this Policy</h3>
        <p style={{ marginBottom: '16px' }}>
          We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes.
        </p>

        <h3 style={{ color: '#fff', marginBottom: '8px' }}>5. Contact Us</h3>
        <p>
          If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
        </p>
      </div>
    </div>
  );
}
