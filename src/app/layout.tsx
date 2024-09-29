import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/server/common/Header';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Diki',
  description: 'Welcome to Diki',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  const themeCookie = 'light';

  return (
    <html lang='en' className={themeCookie === 'light' ? '' : 'dark'}>
      <body className='bg-main text-main'>
        <Header />
        <main className='mt-16'>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;