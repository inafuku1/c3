'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { me, logout } from '../lib/auth';

type User = {
    id: number;
    name: string;
    email: string;
};

export default function HomePage() {
    const router = useRouter();

    const [user, setUser] =
        useState<User | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await me();

                if (!response.ok) {
                    router.replace('/login');
                    return;
                }

                const data = await response.json();

                if (!data.user) {
                    router.replace('/login');
                    return;
                }

                setUser(data.user);
            } catch (error) {
                console.error(
                    '認証確認失敗',
                    error
                );

                router.replace('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(
                'ログアウト失敗',
                error
            );
        }

        router.replace('/login');
    };

    if (loading) {
        return (
            <main>
                <p>
                    認証状態を確認しています...
                </p>
            </main>
        );
    }

    if (!user) {
        return null;
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
