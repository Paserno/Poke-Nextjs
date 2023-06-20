import { Grid } from '@nextui-org/react'
import React, { FC } from 'react'
import { FavoriteCardPokemon } from './FavoriteCardPokemon';

interface Porps {
  pokemons: number[];
}

export const FavoritePokemons: FC<Porps> = ({pokemons}) => {
  return (
    <Grid.Container gap={ 2 } direction='row' justify='flex-start'>
              {
                pokemons.map( id => (
                  <FavoriteCardPokemon id={id} key={id}/>
                ))
              }
            </Grid.Container>
  )
}
