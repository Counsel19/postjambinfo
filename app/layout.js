import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import AppContextProvider from "@/context/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Post UTME SMS Notification",
  description:
    "We can send  you latest information via sms to your phone sharp sharp as it is happening in your   Jamb choice school so that this year 2023 you will not miss your admission",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body className={inter.className}>
        <AppContextProvider>
          <Navbar />

          {children}
          <Footer />
        </AppContextProvider>
      </body>
    </html>
  );
}
