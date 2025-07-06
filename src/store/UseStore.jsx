import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      isSidebarOpen: false,
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      user: null,
      setUser: (user) => set({ user }),
      articles: [],
      setArticles: (articles) => set({ articles }),
      headlines: [],
      setHeadlines: (headlines) => set({ headlines }),
      selectedArticle: null,
      setSelectedArticle: (article) => set({ selectedArticle: article }),
    }),
    {
      name: 'news-aggregator-store', // unique name for the storage key
      getStorage: () => createJSONStorage(() => localStorage), // use localStorage for persistence
    }
  )
);

export default useStore;
