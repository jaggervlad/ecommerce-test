import { PropsWithChildren } from 'react';
import { Header } from './header';

export function Layout({ children }: PropsWithChildren) {
  return (
    <main className="max-w-5xl px-6 lg:px-8 mx-auto min-h-screen">
      <Header />

      {children}
    </main>
  );
}
