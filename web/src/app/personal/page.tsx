import type { Metadata } from 'next'
import { PersonalContent } from './PersonalContent'

export const metadata: Metadata = {
  title: 'Personal',
  description: 'Life in Venice, CA — surfing, MMA, gaming, and more from Karim Varela.',
}

export default function PersonalPage() {
  return <PersonalContent />
}
