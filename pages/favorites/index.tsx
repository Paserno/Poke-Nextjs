import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts'
import { NoFavorites } from '../../components/ui/NoFavorites';
import { localFavorites } from '../../utils';
import { FavoritePokemons } from '../../components/pokemon';

const index = () => {


  const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemons( localFavorites.pokemons() );
  }, [])
  


  return (
    <Layout title='Pokemon - Favoritos'>

      {
        (favoritesPokemons.length === 0) 
          ? (<NoFavorites />)
          : ( <FavoritePokemons pokemons={favoritesPokemons} />)
      }
      

    </Layout>
  )
}

export default index;