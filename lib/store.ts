"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CanvasItem {
  uid: string; // unique instance id (component can be added multiple times)
  id: string; // registry entry id
}

interface BuilderState {
  items: CanvasItem[];
  hasHydrated: boolean;
  setHydrated: () => void;
  add: (id: string) => void;
  remove: (uid: string) => void;
  clear: () => void;
  reorder: (from: number, to: number) => void;
  setItems: (ids: string[]) => void;
  has: (id: string) => boolean;
}

let counter = 0;
const newUid = (id: string) => `${id}__${Date.now().toString(36)}_${(counter++).toString(36)}`;

export const useBuilder = create<BuilderState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      setHydrated: () => set({ hasHydrated: true }),
      add: (id) => set((s) => ({ items: [...s.items, { uid: newUid(id), id }] })),
      remove: (uid) => set((s) => ({ items: s.items.filter((i) => i.uid !== uid) })),
      clear: () => set({ items: [] }),
      reorder: (from, to) =>
        set((s) => {
          if (from === to) return s;
          if (from < 0 || from >= s.items.length) return s;
          if (to < 0 || to >= s.items.length) return s;
          const next = s.items.slice();
          const [moved] = next.splice(from, 1);
          next.splice(to, 0, moved);
          return { items: next };
        }),
      setItems: (ids) => set({ items: ids.map((id) => ({ uid: newUid(id), id })) }),
      has: (id) => get().items.some((i) => i.id === id),
    }),
    {
      name: "reactbits-builder",
      // Do not hydrate during create() — it runs synchronously on import and would
      // diverge from the SSR render (items: []), causing a React hydration mismatch.
      // Rehydrate manually from a client effect once mounted (see HydrationGate).
      skipHydration: true,
      partialize: (s) => ({ items: s.items }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    },
  ),
);
