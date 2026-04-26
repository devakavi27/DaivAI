import React from 'react';
import { Zap } from 'lucide-react';
import ActionCard from '../components/ActionCard';
import { useChatStore } from '../store/useChatStore';

const Home: React.FC = () => {
  const addMessage = useChatStore((state) => state.addMessage);

  const actions = [
    { title: 'Code Help', description: 'Debug and write better code' },
    { title: 'Explanations', description: 'Understand complex topics' },
    { title: 'Creative Writing', description: 'Generate content and ideas' },
    { title: 'Problem Solving', description: 'Find solutions to challenges' },
  ];

  return (
    <div className="home-container fade-in">
      <div className="welcome-section">
        <div className="main-logo-glow">
          <div className="main-logo">
            <Zap size={48} fill="white" color="white" />
          </div>
        </div>
        <h1 className="brand-name-large">
          <span className="brand-accent-green">Daiv</span><span className="brand-accent-black">AI</span>
        </h1>
        <p className="subtext-large">Ask me anything. I'm here to help.</p>
      </div>

      <div className="actions-grid">
        {actions.map((action, index) => (
          <ActionCard
            key={index}
            title={action.title}
            description={action.description}
            onClick={() => addMessage(action.title, 'user')}
          />
        ))}
      </div>

      <style>{`
        .home-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
        }

        .welcome-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 48px;
        }

        .main-logo-glow {
          position: relative;
          margin-bottom: 24px;
        }

        .main-logo-glow::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
          z-index: -1;
        }

        .main-logo {
          width: 80px;
          height: 80px;
          background-color: var(--primary-color);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.2);
        }

        .brand-name-large {
          font-size: 42px;
          font-weight: 800;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .brand-accent-green {
          color: var(--primary-color);
        }

        .brand-accent-black {
          color: #000000;
        }

        .subtext-large {
          font-size: 16px;
          color: var(--text-secondary);
          text-align: center;
          max-width: 400px;
          line-height: 1.5;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          width: 100%;
        }

        @media (max-width: 640px) {
          .actions-grid {
            grid-template-columns: 1fr;
          }
          
          .brand-name-large {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
