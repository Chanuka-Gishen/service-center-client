import { COLOR_MODE } from 'src/constants/common-constants';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define auth and snackbar state with Zustand and add persistence
const useAppStore = create(
  persist(
    (set) => ({
      // Auth State
      app: {
        colorMode: COLOR_MODE.LIGHT,
      },
      toggleMode: () => {
        set((state) => ({
          app: {
            colorMode:
              state.app.colorMode === COLOR_MODE.LIGHT ? COLOR_MODE.DARK : COLOR_MODE.LIGHT,
          },
        }));
      },
    }),
    {
      name: 'app-storage',
    }
  )
);

export default useAppStore;
