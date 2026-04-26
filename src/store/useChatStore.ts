import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

export type ModalType = 'edit-message' | 'delete-message' | 'delete-chat' | null;

interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
  input: string;
  isSidebarOpen: boolean;
  currentModel: string;
  error: string | null;
  isTyping: boolean;
  modal: {
    type: ModalType;
    data?: any;
  };

  // Actions
  setInput: (input: string) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setCurrentModel: (model: string) => void;
  setModal: (type: ModalType, data?: any) => void;
  setError: (error: string | null) => void;
  setTyping: (typing: boolean) => void;
  
  // Chat Actions
  createNewChat: () => void;
  setActiveChat: (id: string) => void;
  renameChat: (id: string, newTitle: string) => void;
  deleteChat: (id: string) => void;
  
  // Message Actions
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  updateMessage: (chatId: string, messageId: string, newContent: string) => void;
  deleteMessage: (chatId: string, messageId: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      chats: [],
      activeChatId: null,
      input: '',
      isSidebarOpen: true,
      currentModel: 'Neural Nexus',
      error: null,
      isTyping: false,
      modal: { type: null },

      setInput: (input) => set({ input }),
      setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setCurrentModel: (currentModel) => set({ currentModel }),
      setModal: (type, data) => set({ modal: { type, data } }),
      setError: (error) => set({ error }),
      setTyping: (isTyping) => set({ isTyping }),

      createNewChat: () => {
        try {
          const newChat: Chat = {
            id: Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
            title: 'New Chat',
            messages: [],
            createdAt: Date.now(),
          };
          set((state) => ({
            chats: [newChat, ...state.chats],
            activeChatId: newChat.id,
            input: '',
            error: null,
          }));
        } catch (e) {
          set({ error: 'Failed to create a new chat.' });
        }
      },

      setActiveChat: (id) => {
        try {
          set({ activeChatId: id, error: null });
        } catch (e) {
          set({ error: 'Failed to switch chats.' });
        }
      },

      renameChat: (id, newTitle) => {
        try {
          if (!newTitle.trim()) throw new Error('Title cannot be empty');
          set((state) => ({
            chats: state.chats.map((chat) =>
              chat.id === id ? { ...chat, title: newTitle } : chat
            ),
            error: null,
          }));
        } catch (e: any) {
          set({ error: e.message || 'Failed to rename chat.' });
        }
      },

      deleteChat: (id) => {
        try {
          set((state) => {
            const newChats = state.chats.filter((chat) => chat.id !== id);
            return {
              chats: newChats,
              activeChatId: state.activeChatId === id ? (newChats[0]?.id || null) : state.activeChatId,
              error: null,
            };
          });
        } catch (e) {
          set({ error: 'Failed to delete chat.' });
        }
      },

      addMessage: (content, role) => {
        try {
          if (!content.trim()) return;
          
          const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
          const newMessage: Message = {
            id: Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
            role,
            content,
            timestamp,
          };

          set((state) => {
            if (!state.activeChatId) {
              const newChat: Chat = {
                id: Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
                title: content.substring(0, 30) + (content.length > 30 ? '...' : ''),
                messages: [newMessage],
                createdAt: Date.now(),
              };
              return {
                chats: [newChat, ...state.chats],
                activeChatId: newChat.id,
                error: null,
              };
            }

            return {
              chats: state.chats.map((chat) =>
                chat.id === state.activeChatId
                  ? {
                      ...chat,
                      messages: [...chat.messages, newMessage],
                      title: chat.messages.length === 0 ? content.substring(0, 30) + (content.length > 30 ? '...' : '') : chat.title,
                    }
                  : chat
              ),
              error: null,
            };
          });
        } catch (e) {
          set({ error: 'Failed to add message.' });
        }
      },

      updateMessage: (chatId, messageId, newContent) => {
        try {
          if (!newContent.trim()) throw new Error('Message cannot be empty');
          set((state) => ({
            chats: state.chats.map((chat) =>
              chat.id === chatId
                ? {
                    ...chat,
                    messages: chat.messages.map((msg) =>
                      msg.id === messageId ? { ...msg, content: newContent } : msg
                    ),
                  }
                : chat
            ),
            error: null,
          }));
        } catch (e: any) {
          set({ error: e.message || 'Failed to update message.' });
        }
      },

      deleteMessage: (chatId, messageId) => {
        try {
          set((state) => ({
            chats: state.chats.map((chat) =>
              chat.id === chatId
                ? {
                    ...chat,
                    messages: chat.messages.filter((msg) => msg.id !== messageId),
                  }
                : chat
            ),
            error: null,
          }));
        } catch (e) {
          set({ error: 'Failed to delete message.' });
        }
      },
    }),
    {
      name: 'daiv-ai-storage',
      partialize: (state) => ({ 
        chats: state.chats, 
        activeChatId: state.activeChatId,
        currentModel: state.currentModel,
        isSidebarOpen: state.isSidebarOpen 
      }),
    }
  )
);
