import { NextPage, GetStaticProps } from 'next'
import { Card, Grid, Row, Text } from '@nextui-org/react';

import { Layout } from '../components/layouts'
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';

interface Porps {
  pokemons: SmallPokemon[];
}


const HomePage: NextPage<Porps> = ({ pokemons }) => {

  console.log(pokemons);




  return (
    <Layout title='Listado de Poke'>

      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map(({ id, name, img }) => (
            <Grid xs={6} sm={3} md={2} xl={1}>
              <Card isHoverable isPressable>
                <Card.Body css={{ p: 1 }}>
                  <Card.Image
                    src={img}
                    width="100%"
                    height={ 140 }
                  />
                </Card.Body>
                <Card.Footer>
                  <Row justify='space-between'>
                    <Text transform='capitalize'>{name}</Text>
                    <Text>#{id}</Text>

                  </Row>
                </Card.Footer>
              </Card>

            </Grid>
          ))
        }


      </Grid.Container>

    </Layout>
  )
}



//* Solo se Ejecuta en el lado del Servidor
export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon/?limit=151');

  console.log(data);
  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }));
  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg


  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
