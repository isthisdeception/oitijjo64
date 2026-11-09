import { User } from '../types';

const AUTH_STORAGE_KEY = 'oitijjo64_demo_user';

export const authService = {
  /**
   * Get current authenticated demo user or null
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return Promise.resolve(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
    return Promise.resolve(null);
  },

  /**
   * Simulate Google Sign-In for demo interaction
   */
  async signInWithGoogle(): Promise<User> {
    const demoUser: User = {
      id: 'demo-google-user-1',
      displayName: 'নমুনা গুগল ব্যবহারকারী',
      email: 'demo.visitor@oitijjo64.site',
      isDemo: true,
    };

    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(demoUser));
    } catch {
      // Ignore
    }

    return Promise.resolve(demoUser);
  },

  /**
   * Sign out demo user
   */
  async signOut(): Promise<void> {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // Ignore
    }
    return Promise.resolve();
  },
};
