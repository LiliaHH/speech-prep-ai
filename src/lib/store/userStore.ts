import { create } from 'zustand';
import User from '@/lib/database/models/user.model'; // 修正为默认导入

interface UserState {
  user: InstanceType<typeof User> | null; // 使用 InstanceType 获取 User 模型的实例类型
  isLoading: boolean;
  error: string | null;
  setUser: (user: InstanceType<typeof User> | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user, isLoading: false, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  clearUser: () => set({ user: null, isLoading: false, error: null }),
}));