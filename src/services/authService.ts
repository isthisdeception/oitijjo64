/**
 * PRODUCTION BOUNDARY NOTE:
 * In this frontend-only phase, Google authentication is simulated with deterministic mock data.
 * 
 * For Production Backend:
 * 1. Replace this mock with the official Google Identity Services SDK (@react-oauth/google
 *    or Google GIS button).
 * 2. On user sign-in, send the Google Credential (JWT ID token) to Django backend
 *    (e.g., POST /api/auth/google/).
 * 3. Django must verify the token against Google's OAuth2 endpoints and issue an HTTP-only
 *    session cookie or JWT.
 * 4. Never store or handle user Google passwords.
 */

import { User } from '../types';

const AUTH_STORAGE_KEY = 'oitijjo64_demo_user_v1';

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
