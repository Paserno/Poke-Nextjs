import { NextPage, GetStaticProps } from 'next'

import { Layout } from '../components/layouts'
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { Grid } from '@nextui-org/react';
import { PokemonCard } from '../pokemon';

interface Porps {
  pokemons: SmallPokemon[];
}


const HomePage: NextPage<Porps> = ({ pokemons }) => {

  // console.log(pokemons);




  return (
    <Layout title='Listado de Poke'>

      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          ))
        }


      </Grid.Container>

    </Layout>
  )
}



//* Solo se Ejecuta en el lado del Servidor
export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon/?limit=151');

  // console.log(data);
  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }));


  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
