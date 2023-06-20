import { FC } from 'react'
import Head from 'next/head'
import { NavBar } from '../ui/NavBar';

interface Props {
  title?: string;
  children: React.ReactNode
}


export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Poke App'}</title>
        <meta name="author" content="Paserno" />
        <meta name="description" content={`Información sobre el Poke XXX ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
      </Head>
      
      <NavBar />

      <main style={{
        padding: '0px 20px',
      }}>
        {children}
      </main>
    </>
  )
}
