'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/UserContext';
import { login } from '@/lib/auth';

export default function LoginPage() {
    // ContextからuserとsetUserを取得する
    const { user, setUser, loading } = useUser();

    // ルーター
    const router = useRouter();
    // メールアドレス
    const [email, setEmail] = useState('admin@test.com');
    // パスワード
    const [password, setPassword] = useState('password');
    // メッセージ
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log(
            'LoginPage',
            {
                loading,
                user,
            }
        );

        if (loading) {
            return;
        }

        if (user) {
            setTimeout(() => {
                router.replace('/');
            }, 100);
        }
    }, [loading, user, router]);

    const submit = async () => {
        setMessage('');

        try {
            const response = await login(
                email,
                password
            );

            if (!response.ok) {
                setMessage('存在しないユーザーです。');
                return;
            }

            const data = await response.json();
            setUser(data.user);
            setTimeout(() => {
                router.replace('/');
            }, 100);

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

    if (loading) {
        return (
            <p>
                認証状態を確認しています...
            </p>
        );
    }

    if (user) {
        return null;
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
                                    <p className="text-red-500">{message}</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}