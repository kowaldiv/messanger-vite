import { create } from "zustand";

type Panels = "chats" | "search" | "profile" | "profile-editor" | "devices";

interface PanelStore {
  panel: Panels;

  setPanel: (panel: Panels) => void;
}

export const usePanelStore = create<PanelStore>((set) => ({
  panel: "chats",

  setPanel: (panel) => set({ panel }),
}));
