import React, { useRef, useEffect } from 'react';
import { Bot, User, Edit3, Trash2, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import ChatInput from './components/ChatInput';
import Modal from './components/Modal';
import { useChatStore } from './store/useChatStore';

const App: React.FC = () => {
  const { chats, activeChatId, setModal, isSidebarOpen, error, setError, isTyping } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find(c => c.id === activeChatId);
  const messages = activeChat?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Console Greeting
    console.log(`%c
  ____         _             _      ___ 
 |  _ \\   __ _(_) __   __   / \\    |_ _|
 | | | | / _\` | | \\ \\ / /  / _ \\    | | 
 | |_| || (_| | |  \\ V /  / ___ \\   | | 
 |____/  \\__,_|_|   \\_/  /_/   \\_\\ |___|

 %cDaviAi`, "color: #10b981; font-weight: bold;", "color: #6b7280; font-size: 12px; font-weight: bold;");
  }, []);

  return (
    <div className="app-container">
      <Sidebar />

      <motion.div
        className="main-wrapper"
        animate={{ paddingLeft: isSidebarOpen ? '260px' : '0px' }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      >
        <AnimatePresence>
          {error && (
            <motion.div
              className="global-error-banner"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="error-content">
                <span>{error}</span>
                <button className="close-error" onClick={() => setError(null)}>
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Navbar />

        <main className="main-content">
          {!activeChatId || messages.length === 0 ? (
            <Home />
          ) : (
            <div className="messages-list">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`message-row ${message.role}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="message-container">
                      <div className="message-avatar">
                        {message.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                      </div>
                      <div className="message-content-wrapper">
                        <div className="message-header">
                          <span className="sender-name">{message.role === 'user' ? 'You' : 'Neural Nexus'}</span>
                          <span className="timestamp">{message.timestamp}</span>
                        </div>
                        <div className="message-body">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      </div>
                      {message.role === 'user' && (
                        <div className="message-actions">
                          <button
                            className="action-btn"
                            onClick={() => setModal('edit-message', { id: message.id, content: message.content })}
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            className="action-btn"
                            onClick={() => setModal('delete-message', { id: message.id })}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  className="message-row assistant"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="message-container">
                    <div className="message-avatar">
                      <Bot size={20} />
                    </div>
                    <div className="message-content-wrapper">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </main>

        <ChatInput />
      </motion.div>

      <Modal />

      <style>{`
        .app-container {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background-color: var(--bg-color);
        }

        .main-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: relative;
          width: 100%;
        }

        .global-error-banner {
          background-color: #fef2f2;
          border-bottom: 1px solid #fee2e2;
          padding: 8px 16px;
          color: #b91c1c;
          font-size: 13px;
          font-weight: 500;
          z-index: 100;
        }

        .error-content {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .close-error {
          color: #ef4444;
          padding: 4px;
          border-radius: 4px;
        }

        .close-error:hover {
          background-color: #fee2e2;
        }

        .main-content {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .messages-list {
          flex: 1;
          padding: 40px 0;
          display: flex;
          flex-direction: column;
        }

        .message-row {
          width: 100%;
          padding: 8px 20px;
          transition: background-color 0.2s;
        }

        .message-row:hover {
          background-color: rgba(0, 0, 0, 0.01);
        }

        .message-row.user {
          background-color: white;
          border-bottom: 1px solid #f3f4f6;
        }

        .message-row.assistant {
          background-color: #f9fafb;
          border-bottom: 1px solid #f3f4f6;
        }

        .message-container {
          max-width: 840px;
          margin: 0 auto;
          display: flex;
          gap: 12px;
          position: relative;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .user .message-avatar {
          background-color: #6b7280;
          color: white;
        }

        .assistant .message-avatar {
          background-color: #10b981;
          color: white;
        }

        .message-content-wrapper {
          flex: 1;
          min-width: 0;
        }

        .message-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .sender-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .timestamp {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .message-body {
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-primary);
          overflow-wrap: break-word;
        }

        .message-body p {
          margin-bottom: 12px;
        }

        .message-body p:last-child {
          margin-bottom: 0;
        }

        .message-body ul, .message-body ol {
          margin-bottom: 12px;
          padding-left: 20px;
        }

        .message-body li {
          margin-bottom: 4px;
        }

        .message-body strong {
          font-weight: 600;
          color: var(--text-primary);
        }

        .message-actions {
          position: absolute;
          right: 0;
          top: 0;
          display: flex;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .message-row:hover .message-actions {
          opacity: 1;
        }

        .action-btn {
          padding: 6px;
          border-radius: 6px;
          color: var(--text-secondary);
        }

        .action-btn:hover {
          background-color: var(--hover-bg);
          color: var(--text-primary);
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 10px 0;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background-color: #d1d5db;
          border-radius: 50%;
          display: inline-block;
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }

        @media (max-width: 768px) {
          .main-wrapper {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
