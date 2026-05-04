import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://karimvarela.com'),
  title: {
    template: '%s | Karim Varela',
    default: 'Karim Varela – Software Engineer & Entrepreneur',
  },
  description:
    'Software engineer and entrepreneur based in Venice, CA. Building at the intersection of code and community.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://karimvarela.com',
    siteName: 'Karim Varela',
    title: 'Karim Varela – Software Engineer & Entrepreneur',
    description:
      'Software engineer and entrepreneur based in Venice, CA. Building at the intersection of code and community.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karim Varela – Software Engineer & Entrepreneur',
    description:
      'Software engineer and entrepreneur based in Venice, CA. Building at the intersection of code and community.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Karim Varela',
    url: 'https://karimvarela.com',
    jobTitle: 'Software Engineer & Entrepreneur',
    description:
      'Software engineer and entrepreneur based in Venice, CA. Building at the intersection of code and community.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Venice',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.linkedin.com/in/karimvarela',
      'https://github.com/kvarela',
      'https://karimvarela.medium.com',
      'https://stackoverflow.com/users/karim-varela',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Karim Varela',
    url: 'https://karimvarela.com',
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Person',
      name: 'Karim Varela',
    },
  },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
