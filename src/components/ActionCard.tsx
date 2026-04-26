import React from 'react';

interface ActionCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description, onClick }) => {
  return (
    <button className="action-card" onClick={onClick}>
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{description}</p>

      <style>{`
        .action-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 16px 20px;
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          width: 100%;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .action-card:hover {
          background-color: var(--sidebar-bg);
          border-color: var(--primary-color);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .card-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .card-desc {
          font-size: 13px;
          color: var(--text-secondary);
        }
      `}</style>
    </button>
  );
};

export default ActionCard;
