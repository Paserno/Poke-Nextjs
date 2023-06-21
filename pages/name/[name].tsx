import { useState } from "react";

import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { Grid, Card, Text, Button, Container, Image } from "@nextui-org/react";

import confetti from 'canvas-confetti';

import { localFavorites } from "../../utils";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { Layout } from "../../components/layouts";
import { pokeApi } from "../../api";
import { getPokemonInfo } from "../../utils/getPokemonInfo";


interface Props {
    pokemon: Pokemon;
  }

const PokemonByNamePage: NextPage<Props> = ({pokemon}) => {
    const [isInFavorites, setIsInFavorites] = useState( localFavorites.existFavorites( pokemon.id ) ); 


    const onToggleFavorite = () => {
      localFavorites.toggleFavorite(pokemon.id);
      setIsInFavorites(!isInFavorites);
  
      if ( isInFavorites ) return;
  
        confetti({
          zIndex: 99,
          particleCount: 150,
          spread: 160,
          angle: -100,
          origin: {
            x: 1,
            y: 0,
          }
        })
      
    }
  
  
  
  
    return (
      <Layout title={pokemon.name}>
  
        <Grid.Container css={{ marginTop: '5px' }} gap={2}>
          <Grid xs={12} sm={4}>
            <Card isHoverable css={{ padding: '30px' }}>
              <Card.Body>
                <Card.Image
                  src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                  alt={pokemon.name}
                  width="100%"
                  height={200}
                />
              </Card.Body>
            </Card>
          </Grid>
  
  
          <Grid xs={12} sm={8}>
            <Card>
              <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text h1 transform="capitalize">{pokemon.name}</Text>
  
                <Button
                color="gradient"
                ghost={ !isInFavorites }
                // shadow
                onClick={onToggleFavorite}
                >
                  { (isInFavorites) ? 'En Favoritos' : 'Guardar en Favorito'
                  }
                  
                </Button>
  
              </Card.Header>
  
              <Card.Body>
                <Text size={30}>Sprites: </Text>
  
                <Container direction="row" display="flex">
                  <Image 
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image 
                    src={pokemon.sprites.back_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image 
                    src={pokemon.sprites.front_shiny}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image 
                    src={pokemon.sprites.back_shiny}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                </Container>
              </Card.Body>
  
            </Card>
          </Grid>
        </Grid.Container>
  
  
      </Layout>
    )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon/?limit=151'); // 648 386 151
    const pokeName: string[] = data.results.map( poke => poke.name);
  
  
    return {
      paths: pokeName.map((name) => ({
        params: { name }
      })),
  
      fallback: false
    }
  }
  
  
  export const getStaticProps: GetStaticProps = async ({ params }) => {
  
    const { name } = params as { name: string };

  
    return {
      props: {
        pokemon: await getPokemonInfo(name)
      }
    }
  }

export default PokemonByNamePage;