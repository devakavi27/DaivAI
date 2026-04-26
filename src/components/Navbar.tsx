import React from 'react';
import { Menu } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import ModelSelector from './ModelSelector';

const Navbar: React.FC = () => {
  const toggleSidebar = useChatStore((state) => state.toggleSidebar);
  const isSidebarOpen = useChatStore((state) => state.isSidebarOpen);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {!isSidebarOpen && (
          <button className="icon-btn" onClick={toggleSidebar}>
            <Menu size={20} />
          </button>
        )}
        <ModelSelector />
      </div>
      
      <style>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          height: 60px;
          background: transparent;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 8px;
          color: var(--text-secondary);
        }

        .icon-btn:hover {
          background-color: var(--hover-bg);
          color: var(--text-primary);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
