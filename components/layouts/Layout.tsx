import React from 'react'
import Head from 'next/head'

interface Props {
    title?: string;
    children: React.ReactNode
}


export const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
        <Head>
            <title>{ title || 'Poke App'}</title>
            <meta name="author" content="Paserno" />
            <meta name="description" content={`Información sobre el Poke XXX ${ title }`} />
            <meta name="keywords" content={`${ title }, pokemon, pokedex`} />
        </Head>
        {/* Navbar */}

        <main>
            { children }
        </main>
    </>
  )
}
