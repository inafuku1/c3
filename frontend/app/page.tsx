'use client';

import { useUser } from '@/app/UserContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const { user } = useUser();
    const router = useRouter();

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
        </main>
    );
}
