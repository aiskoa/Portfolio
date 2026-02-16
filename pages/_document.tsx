import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es" suppressHydrationWarning className="antialiased">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}