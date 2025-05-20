import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '~/utils/supabase';

type AuthState = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;

  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  signInWithProvider: (provider: 'google' | 'github') => Promise<void>;
  fetchSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: false,
  error: null,

  fetchSession: async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    set({ session, user: session?.user || null });
  },

  signUp: async (email, password) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signUp({ email, password });
    set({
      user: data.user || null,
      session: data.session || null,
      error: error?.message || null,
      loading: false,
    });
  },

  signIn: async (email, password) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    set({
      user: data.user || null,
      session: data.session || null,
      error: error?.message || null,
      loading: false,
    });
  },

  forgotPassword: async (email) => {
    set({ loading: true, error: null });
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    set({ error: error?.message || null, loading: false });
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },

  signInWithProvider: async (provider) => {
    set({ loading: true });
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    set({ error: error?.message || null, loading: false });
  },
}));
