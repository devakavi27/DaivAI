import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Zap, Brain, Sparkles, Cpu } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

const models = [
  { id: 'Neural Nexus', name: 'Neural Nexus', version: 'Quantum Core v3.8', icon: Zap, color: '#10b981' },
  { id: 'Cerebral Prime', name: 'Cerebral Prime', version: 'Advanced Reasoning v2.1', icon: Brain, color: '#10b981' },
  { id: 'Synapse Ultra', name: 'Synapse Ultra', version: 'Creative Engine v4.0', icon: Sparkles, color: '#10b981' },
  { id: 'Logic Core', name: 'Logic Core', version: 'Fast Response v1.5', icon: Cpu, color: '#10b981' },
];

const ModelSelector: React.FC = () => {
  const { currentModel, setCurrentModel } = useChatStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeModel = models.find(m => m.id === currentModel) || models[0];

  return (
    <div className="model-selector-container" ref={dropdownRef}>
      <button className="model-selector-btn" onClick={() => setIsOpen(!isOpen)}>
        <div className="model-icon-small" style={{ backgroundColor: activeModel.color }}>
          <activeModel.icon size={14} fill="white" color="white" />
        </div>
        <span className="model-name-text">{activeModel.name}</span>
        <ChevronDown size={14} className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="model-dropdown glass fade-in">
          <p className="dropdown-label">Select AI Engine</p>
          <div className="model-list">
            {models.map((model) => (
              <button 
                key={model.id} 
                className={`model-option ${currentModel === model.id ? 'active' : ''}`}
                onClick={() => {
                  setCurrentModel(model.id);
                  setIsOpen(false);
                }}
              >
                <div className="model-option-left">
                  <div className="model-option-icon" style={{ backgroundColor: model.color }}>
                    <model.icon size={16} fill="white" color="white" />
                  </div>
                  <div className="model-option-info">
                    <span className="model-option-name">{model.name}</span>
                    <span className="model-option-version">{model.version}</span>
                  </div>
                </div>
                {currentModel === model.id && <div className="active-dot"></div>}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .model-selector-container {
          position: relative;
        }

        .model-selector-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background-color: var(--sidebar-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .model-selector-btn:hover {
          background-color: var(--hover-bg);
          border-color: var(--primary-color);
        }

        .model-icon-small {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .model-name-text {
          font-weight: 500;
          font-size: 14px;
          color: var(--text-primary);
        }

        .chevron {
          color: var(--text-secondary);
          transition: transform 0.2s ease;
        }

        .chevron.open {
          transform: rotate(180deg);
        }

        .model-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          width: 260px;
          background-color: var(--bg-color);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          box-shadow: var(--shadow-md);
          padding: 12px;
          z-index: 100;
        }

        .dropdown-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 8px;
          padding: 0 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .model-option {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          border-radius: 10px;
          transition: background-color 0.2s;
          margin-bottom: 4px;
        }

        .model-option:hover {
          background-color: var(--hover-bg);
        }

        .model-option.active {
          background-color: var(--hover-bg);
        }

        .model-option-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .model-option-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .model-option-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .model-option-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .model-option-version {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .active-dot {
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
        }
      `}</style>
    </div>
  );
};

export default ModelSelector;
