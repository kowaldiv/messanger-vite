import { create } from "zustand";

type Panels = "chats" | "search" | "profile" | "profile-editor" | "devices" | "create-group-or-chat";

interface NavBarStore {
  panel: Panels;
  isHidden: boolean;

  setPanel: (panel: Panels) => void;
  setIsHidden: (isHidden: boolean) => void;
}

export const useNavBarStore = create<NavBarStore>((set) => ({
  panel: "chats",
  isHidden: false,

  setPanel: (panel) => set({ panel }),
  setIsHidden: (isHidden) => set({ isHidden }),
}));
