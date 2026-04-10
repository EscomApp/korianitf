import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'KORIANI TUNA FISHING SLU | Import-Export de Productos Alimenticios',
  description: 'Empresa especializada en la importación y exportación de productos alimenticios (Víveres). Especialistas en attieke y productos africanos de alta calidad.',
  keywords: 'import export, food products, vivriers, attieke, African food, productos alimenticios, comercio internacional',
  icons: {
    icon: '/images/logo.jpeg',
    apple: '/images/logo.jpeg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
