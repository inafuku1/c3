'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { login, me } from '../../lib/auth';

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] =
        useState('admin@test.com');

    const [password, setPassword] =
        useState('password');

    const [message, setMessage] =
        useState('');

    const [checking, setChecking] =
        useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await me();
                
                console.log('ログイン画面での認証確認:', response.status);

                if (response.ok) {
                    /*
                     * ログイン済みの場合はトップページへ遷移する。
                     * replaceを使用し、履歴にログイン画面を残さない。
                     */
                    const data = await response.json();
                    if (data.user)
                    {
                        router.replace('/');
                        return;
                    }
                }

                /*
                 * 401の場合は未ログインなので、
                 * ログイン画面を表示する。
                 */
                if (response.status === 401) {
                    setChecking(false);
                    return;
                }


                setChecking(false);
            } catch (error) {
                console.error(
                    '認証状態の確認に失敗しました。',
                    error
                );

                setMessage(
                    '認証状態を確認できませんでした。'
                );

                setChecking(false);
            }
        };

        checkAuth();
    }, [router]);

    const submit = async () => {
        console.log('login start');
        setMessage('');

        try {
            const response = await login(
                email,
                password
            );

            if (!response.ok) {
                return;
            }

            /*
             * pushではなくreplaceを使用する。
             * ブラウザバックでログイン画面へ
             * 戻ることを防止する。
             */
             router.replace('/');

            /*
             * App Routerの表示を更新する。
             */
            //router.refresh();
        } catch (error) {
            console.error(
                'ログイン通信に失敗しました。',
                error
            );

            setMessage(
                'サーバーに接続できませんでした。'
            );
        }
    };

    /*
     * 認証確認が終わるまでは、
     * ログインフォームを一瞬表示しない。
     */
    if (checking) {
        return (
            <main>
                <p>認証状態を確認しています...</p>
            </main>
        );
    }

    return (
        <main>
            <h1>ログイン</h1>

            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(
                            event.target.value
                        )
                    }
                    placeholder="メールアドレス"
                    autoComplete="username"
                />
            </div>

            <div>
                <input
                    type="password"
                    value={password}
                    onChange={(event) =>
                        setPassword(
                            event.target.value
                        )
                    }
                    placeholder="パスワード"
                    autoComplete="current-password"
                />
            </div>

            <button
                type="button"
                onClick={submit}
            >
                ログイン
            </button>

            {message && (
                <p>{message}</p>
            )}
        </main>
    );
}