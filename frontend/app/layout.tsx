import './globals.css';

import { UserProvider } from './UserContext';
import Header from './Header';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja" className="dark">
            <body className="font-sans antialiased dark:text-gray-400 dark:bg-black">
                <UserProvider>
                    <div className="min-h-screen bg-gray-100 dark:bg-black">
                        <Header />

                        <main>
                            <div className="py-3">
                                <div className="max-w-full mx-auto px-10 space-y-3">
                                    {children}
                                </div>
                            </div>
                        </main>
                    </div>
                </UserProvider>
            </body>
        </html>
    );
}