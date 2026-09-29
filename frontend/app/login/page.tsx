'use client';

import { useUser } from '@/app/UserContext';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { login, me } from '../../lib/auth';



export default function LoginPage() {
    const { user, setUser } = useUser();

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
                        setUser(data.user); // Contextへ即反映
                        // トップにリダイレクト
                            
                        router.replace('/');
                        router.refresh();
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


            const data = await response.json();
            setUser(data.user); // Contextへ即反映

            /*
             * pushではなくreplaceを使用する。
             * ブラウザバックでログイン画面へ
             * 戻ることを防止する。
             */
             router.replace('/');
  

            /*
             * App Routerの表示を更新する。
             */
            router.refresh();

            console.log('login end');
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
                <p>bbb認証状態を確認しています...</p>
            </main>
        );
    }

    return (
        <main>
            <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            ログイン
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <input
                                    type="email"
                                    className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
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
                                    className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
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
                                className="w-full rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                                onClick={submit}
                            >
                                Login
                            </button>

                            {message && (
                                <p>{message}</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            </section>




















        </main>
    );
}