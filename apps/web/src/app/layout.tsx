import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Apex Enterprise ERP | Modular Monolith Platform',
  description: 'High-density modular ERP system for Sales, Purchase, Inventory, Finance, and Administration',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100 flex">
        {children}
      </body>
    </html>
  );
}
