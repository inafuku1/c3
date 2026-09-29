'use client';

import { useUser } from '@/app/UserContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { me, logout } from '../lib/auth';




export default function HomePage() {
    const { user } = useUser();

console.log('page-user:', user);


    const router = useRouter();

    // const [loading, setLoading] = useState(true);
    //     useState(true);


    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(
                'ログアウト失敗',
                error
            );
        }

        router.replace('/');
        router.refresh();
    };

    if (!user) {
        return (
            <main>
                <h1>トップページ</h1>
            </main>
        );
    }

    return (
        <main>
            
            <h1>トップページ</h1>
            <p>ID：{user.id}</p>
            <p>名前：{user.name}</p>
            <p>メール：{user.email}</p>

            <button
                type="button"
                onClick={handleLogout}
            >
                ログアウト
            </button>
        </main>
    );
}
