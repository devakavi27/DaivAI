import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Check } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

const Modal: React.FC = () => {
  const { modal, setModal, updateMessage, deleteMessage, deleteChat, activeChatId } = useChatStore();
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    if (modal.type === 'edit-message' && modal.data) {
      setEditValue(modal.data.content);
    }
  }, [modal]);

  if (!modal.type) return null;

  const handleClose = () => setModal(null);

  const renderContent = () => {
    switch (modal.type) {
      case 'edit-message':
        return (
          <div className="modal-body">
            <h2 className="modal-title">Edit Message</h2>
            <textarea 
              className="modal-textarea"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Enter your message..."
              autoFocus
            />
            <div className="modal-actions">
              <button className="secondary-btn" onClick={handleClose}>Cancel</button>
              <button className="primary-btn" onClick={() => {
                if (activeChatId && modal.data) {
                  updateMessage(activeChatId, modal.data.id, editValue);
                  handleClose();
                }
              }}>
                <Check size={18} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        );

      case 'delete-message':
        return (
          <div className="modal-body align-center">
            <div className="warning-icon-wrapper">
              <AlertTriangle size={32} color="#ef4444" />
            </div>
            <h2 className="modal-title">Delete Message?</h2>
            <p className="modal-desc">Are you sure you want to delete this message? This action cannot be undone.</p>
            <div className="modal-actions full-width">
              <button className="secondary-btn" onClick={handleClose}>Cancel</button>
              <button className="danger-btn" onClick={() => {
                if (activeChatId && modal.data) {
                  deleteMessage(activeChatId, modal.data.id);
                  handleClose();
                }
              }}>Delete</button>
            </div>
          </div>
        );

      case 'delete-chat':
        return (
          <div className="modal-body align-center">
            <div className="warning-icon-wrapper">
              <AlertTriangle size={32} color="#ef4444" />
            </div>
            <h2 className="modal-title">Delete Chat?</h2>
            <p className="modal-desc">
              Are you sure you want to delete <span className="highlight">"{modal.data?.title}"</span>? This action cannot be undone.
            </p>
            <div className="modal-actions full-width">
              <button className="secondary-btn" onClick={handleClose}>Cancel</button>
              <button className="danger-btn" onClick={() => {
                if (modal.data) {
                  deleteChat(modal.data.id);
                  handleClose();
                }
              }}>Delete</button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container glass fade-in" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose}>
          <X size={20} />
        </button>
        {renderContent()}
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-container {
          width: 90%;
          max-width: 500px;
          background-color: var(--bg-color);
          border-radius: 20px;
          position: relative;
          padding: 24px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .modal-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          color: var(--text-secondary);
          padding: 4px;
          border-radius: 50%;
        }

        .modal-close-btn:hover {
          background-color: var(--hover-bg);
          color: var(--text-primary);
        }

        .modal-body {
          display: flex;
          flex-direction: column;
        }

        .modal-body.align-center {
          align-items: center;
          text-align: center;
        }

        .modal-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .modal-desc {
          font-size: 15px;
          color: var(--text-secondary);
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .highlight {
          color: var(--primary-color);
          font-weight: 600;
        }

        .modal-textarea {
          width: 100%;
          min-height: 150px;
          background-color: var(--sidebar-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 12px;
          font-size: 15px;
          color: var(--text-primary);
          margin-bottom: 24px;
          resize: none;
          outline: none;
        }

        .modal-textarea:focus {
          border-color: var(--primary-color);
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        .modal-actions.full-width {
          width: 100%;
        }

        .modal-actions.full-width button {
          flex: 1;
        }

        .primary-btn {
          background-color: var(--primary-color);
          color: white;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .secondary-btn {
          background-color: var(--sidebar-bg);
          color: var(--text-primary);
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 600;
          border: 1px solid var(--border-color);
        }

        .danger-btn {
          background-color: #ef4444;
          color: white;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 600;
        }

        .warning-icon-wrapper {
          width: 64px;
          height: 64px;
          background-color: #fef2f2;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
      `}</style>
    </div>
  );
};

export default Modal;
