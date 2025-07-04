import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/Providers";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
import AuthNavbar from './topNavbar';
import ServicesNavbar from './servicesNavbar';

export const metadata: Metadata = {
  title: "Nidhaan",
  description: "The best platform for HealthCare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <script src="https://accounts.google.com/gsi/client" async defer></script>
        <Providers>
          <div className="fixed top-0 left-0 w-full z-50">
              <AuthNavbar/>
              <ServicesNavbar/>
          </div>
          <div className="sm:mb-32 md:mb-32 lg:mb-28"></div>
          {children}
          <FAQ/>
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
