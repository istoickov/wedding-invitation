import { useEffect, useState } from 'react';
import { DetailsScreen } from './components/DetailsScreen';
import { EnvelopeScreen } from './components/EnvelopeScreen';
import './index.css';

function App() {
  const [isOpening, setOpening] = useState(false);
  const [isInvitationOpen, setInvitationOpen] = useState(false);
  const [isMainVisible, setMainVisible] = useState(false);

  useEffect(() => {
    if (!isOpening) return undefined;

    const animationFrame = requestAnimationFrame(() => setMainVisible(true));
    return () => cancelAnimationFrame(animationFrame);
  }, [isOpening]);

  return (
    <>
      {(isOpening || isInvitationOpen) && (
        <div className={`transition-opacity duration-[1300ms] ${isMainVisible ? 'opacity-100' : 'opacity-0'}`}>
          <DetailsScreen />
        </div>
      )}
      {!isInvitationOpen && (
        <EnvelopeScreen
          onStartOpen={() => setOpening(true)}
          onOpen={() => {
            setInvitationOpen(true);
            setOpening(false);
          }}
        />
      )}
    </>
  );
}

export default App;
