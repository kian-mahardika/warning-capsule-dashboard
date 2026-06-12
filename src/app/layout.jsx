import "./globals.css";

export const metadata = {
  title: "Warning Capsule Safety Command Center",
  description: "Interactive dashboard and 3D structural explorer for Warning Capsule business plan pitch."
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
