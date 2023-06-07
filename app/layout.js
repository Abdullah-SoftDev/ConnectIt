import './globals.css'

export const metadata = {
  title: 'Connectit - Engage, Share, Discuss',
  description: 'A powerful webapp for engaging discussions, sharing content, and connecting with like-minded individuals.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
