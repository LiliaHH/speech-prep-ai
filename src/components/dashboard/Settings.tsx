'use client';

import { useUserStore } from "@/lib/store/userStore";

export default function Settings() {
  const { user } = useUserStore();
  return (
    <div>
      <h2>Settings</h2>
      <p>Manage settings for {user?.username}</p>
    </div>
  );
}