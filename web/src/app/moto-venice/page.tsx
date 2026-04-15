import type { Metadata } from 'next'
import { MotoVeniceClient } from './MotoVeniceClient'

export const metadata: Metadata = {
  title: 'Moto Venice',
  description:
    'Moto Venice — motorcycle rentals in Venice, CA. Explore Los Angeles on two wheels with our curated fleet.',
  openGraph: {
    title: 'Moto Venice — Motorcycle Rentals in Venice, CA',
    description:
      'Rent a motorcycle in Venice and explore LA. Experience the Pacific Coast Highway the way it was meant to be ridden.',
    url: 'https://karimvarela.com/moto-venice',
  },
}

export default function MotoVenicePage() {
  return <MotoVeniceClient />
}
