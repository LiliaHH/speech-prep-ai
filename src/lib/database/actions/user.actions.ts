'use server';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@clerk/nextjs/server';
import connectToDB from '../db';
import User from '../models/user.model'; // 修正为默认导入

interface UserData {
  clerkId: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
}

// 同步用户：检查是否存在，不存在则创建
export async function syncUser() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return { error: 'No user logged in' };
    }

    await connectToDB();

    let dbUser = await User.findOne({ clerkId: clerkUser.id });
    if (!dbUser) {
      dbUser = await User.create({
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        username: clerkUser.username || `user_${clerkUser.id}`,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        photo: clerkUser.imageUrl,
      });
      console.log('User created in MongoDB:', dbUser);
    } else {
      console.log('User already exists in MongoDB:', dbUser);
    }

    revalidatePath('/');
    return JSON.parse(JSON.stringify(dbUser));
  } catch (error) {
    console.error('Error syncing user:', error);
    return { error: 'Failed to sync user' };
  }
}

// 根据 Clerk ID 获取用户
export async function getUserById(clerkId: string) {
  try {
    await connectToDB();
    const user = await User.findOne({ clerkId });
    if (!user) throw new Error('User not found');
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error('Error fetching user:', error);
    return { error: 'Failed to fetch user' };
  }
}