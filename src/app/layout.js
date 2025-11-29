
import "./globals.css";



export const metadata = {
  title: "Tirth Ghumo",
  description: "A travel website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
