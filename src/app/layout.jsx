
import React from "react";
import { Providers } from "@/store/providers";
import MyApp from './app';
import "./global.css";


export const metadata = {
  title: 'Premiações e Medalhas - SerEducacional',
  description: 'Sistema de premiações e medalhas para o o grupo SerEducacional',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <Providers>
          <MyApp>{children}</MyApp>
        </Providers>
      </body>
    </html>
  );
}
