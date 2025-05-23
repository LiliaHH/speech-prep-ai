'use client';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useUserStore } from '@/lib/store/userStore';
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, useClerk, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({ content }: { content: React.ReactNode }) {
  const { user, isLoading, error ,clearUser} = useUserStore();
  const pathname = usePathname();
const { isSignedIn } = useUser();
  // 根据当前路由确定选中的菜单项
  const selectedKey = pathname === '/' ? 'home' : pathname.slice(1); // '/' -> 'home', '/profile' -> 'profile'
// 自定义退出逻辑
// 监听 Clerk 用户状态变化
  useEffect(() => {
  if (!isSignedIn) {
      // 用户退出时清空状态
     clearUser();
      console.log('用户已退出，状态已清空');
    }
  }, [isSignedIn]);
  console.log('DashboardLayout state:', { user, isLoading, error, selectedKey, pathname });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ position: 'fixed', height: '100vh' }}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={[
            { key: 'home', icon: <HomeOutlined />, label: <Link href="/">Dashboard</Link> },
            { key: 'profile', icon: <UserOutlined />, label: <Link href="/profile">Profile</Link> },
            { key: 'settings', icon: <SettingOutlined />, label: <Link href="/settings">Settings</Link> },
          ]}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
       
            </SignedIn>
          </header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          {content}
        </Content>
      </Layout>
    </Layout>
  );
}