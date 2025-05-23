'use client';
import { useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useUserStore } from '@/lib/store/userStore';
import { syncUser } from '@/lib/database/actions/user.actions';
import Settings from '@/components/dashboard/Settings';

export default function SettingsPage() {
  const { user, isLoading, error, setUser, setLoading, setError } = useUserStore();

  useEffect(() => {
    async function fetchAndSyncUser() {
      setLoading(true);
      try {
        console.log('Attempting to sync user in Settings...');
        const result = await syncUser();
        console.log('Sync result:', result);
        if ('error' in result) {
          setError(result.error);
        } else {
          setUser(result);
        }
      } catch (error) {
        console.error('Sync error:', error);
        setError('Failed to sync user');
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    }
    if (!user) {
      fetchAndSyncUser();
    }
  }, [user, setUser, setLoading, setError]);

  return <DashboardLayout content={<Settings />} />;
}