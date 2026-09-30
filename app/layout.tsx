import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const sans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://prime-lab-motion-studies.gritty-basil-5524.chatgpt.site'),
  title: 'Prime Lab Motion Studies',
  description: 'An interactive gallery of Prime Lab animation studies with play, pause, and reset controls.',
  openGraph: {
    title: 'Prime Lab Motion Studies',
    description: 'Explore the Train, Deploy, and Improve motion studies.',
    images: [{ url: '/og.png', width: 1734, height: 907, alt: 'Prime Lab — Train, Deploy, Improve' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prime Lab Motion Studies',
    description: 'Explore the Train, Deploy, and Improve motion studies.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
