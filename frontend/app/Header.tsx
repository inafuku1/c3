'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { logout } from '@/lib/auth';
import { useUser } from './UserContext';

const navMenu = [
    { route: '/', name: 'Top' },
];

export default function Header() {
    const router = useRouter();

    const {
        user,
        setUser,
        loading,
    } = useUser();

    const handleLogout = async () => {
        try {
            const response = await logout();

            if (!response.ok) {
                console.error(
                    'ログアウトに失敗しました。',
                    response.status
                );

                return;
            }

            setUser(null);
            router.replace('/');
        } catch (error) {
            console.error(
                'ログアウト失敗',
                error
            );
        }
    };

    return (
        <nav className="bg-white border-b border-gray-100 dark:bg-black dark:border-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            {navMenu.map((menu) => (
                                <Link
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    href={menu.route}
                                    key={menu.route}
                                >
                                    {menu.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                        {loading ? (
                            <p></p>
                        ) : user ? (
                            <>
                                <p>{user.name}</p>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="ml-4 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest"
                                >
                                    ログアウト
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="ml-4 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest"
                            >
                                ログイン
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}