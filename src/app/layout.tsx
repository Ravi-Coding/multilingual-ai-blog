// import './globals.css';
// import type { Metadata } from 'next';
// import { Toaster } from "sonner";

// export const metadata: Metadata = {
//   title: 'Multilingual AI Blog Generator',
//   description: 'Generate and translate blogs using AI & Hugging Face',
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-50 text-gray-800 font-sans">
//         {children}
//         <Toaster position="top-right" />
//       </body>
//     </html>
//   );
// }


import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Multilingual AI Blog Generator',
  description: 'Generate and translate blogs using AI & Hugging Face',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 font-sans flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
