import { Card, Grid } from '@nextui-org/react'
import { useRouter } from 'next/router';
import React from 'react'
import { FC } from 'react';

interface Props {
    id: number;
}

export const FavoriteCardPokemon: FC<Props>= ({id}) => {

    const router = useRouter();

    const onFavoriteClicked = () => {
        router.push(`/pokemon/${id}`);
    }

    return (

        <Grid xs={6} sm={3} md={2} xl={1} key={id}>
            <Card isHoverable isPressable css={{ padding: 10 }} onClick={onFavoriteClicked}>
                <Card.Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                    width={'100%'}
                    height={200}
                />
            </Card>

        </Grid>
    )
}
