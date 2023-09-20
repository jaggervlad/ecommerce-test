import { PropsWithChildren } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';

export function Layout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen flex">
      <Sidebar />
      <div className="flex flex-col ml-56 flex-1">
        <Header />

        <div className="px-6 lg:px-8">{children}</div>
      </div>
    </main>
  );
}
