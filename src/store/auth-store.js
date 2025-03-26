import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define auth and snackbar state with Zustand and add persistence
const useAuthStore = create(
  persist(
    (set) => ({
      // Auth State
      auth: {
        isLoggedIn: false,
        user: {
          id: '',
          token: '',
          name: '',
          userEmail: '',
          userRole: '',
          isUserFirstLogin: true,
        },
      },
      loginUser: (payload) =>
        set((state) => ({
          auth: {
            isLoggedIn: true,
            user: {
              id: payload.user._id,
              token: payload.token,
              name: `${payload.user.userFirstName} ${payload.user.userLastName}`,
              userEmail: payload.user.userEmail,
              userRole: payload.user.userRole,
              isUserFirstLogin: payload.user.isUserFirstLogin,
            },
          },
        })),
      logoutUser: () =>
        set(() => ({
          auth: {
            isLoggedIn: false,
            user: {
              id: '',
              token: '',
              name: '',
              userEmail: '',
              userRole: '',
              isUserFirstLogin: true,
            },
          },
        })),
    }),
    {
      name: 'auth-storage', // storage name for localStorage
    }
  )
);

export default useAuthStore;
