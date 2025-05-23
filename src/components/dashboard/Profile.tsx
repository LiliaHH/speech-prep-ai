'use client';
import { useUserStore } from '@/lib/store/userStore';

export default function Profile() {
  const { user } = useUserStore();
  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user?.username}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}