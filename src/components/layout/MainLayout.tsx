
import { ReactNode } from "react";
import { MainNav } from "./MainNav";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-gray-50 border-t py-8">
        <div className="container mx-auto">
          <div className="text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Fundify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
