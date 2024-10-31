import "./globals.css";
import Header from "@/component/Header/Header";

export const metadata = {
  title: "Software Developer",
  description: "I am software developer dilshan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>
        <Header />
        <main className="body-main">
          {children}
        </main>
      </body>
    </html>
  );
}
