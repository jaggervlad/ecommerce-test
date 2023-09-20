import { ThemeProvider } from '@/contexts/theme-provider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { NextSeo } from 'next-seo';
import { defaultSeo } from 'next-seo.config';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <NextSeo {...defaultSeo} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
