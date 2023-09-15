export type Comic = {
    id: number,
    title: string,
    description: string,
    pageCount: number,
    price: number,
    oldPrice: number,
    stock: number,
    thumbnail: {
        path: string,
        extension: string,
    },
    creators: {
        available: number,
        collectionURI: string,
        items: [
            {
                resourceURI: string,
                name: string,
                role: string
            }
        ],
        returned: number
    }
}

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link as MUILink, Stack } from '@mui/material';
import NextLink from 'next/link'
import type { Character } from '../characterDetails/charactersDetails';
import GeneralButton from '../buttons/generalButton';
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});
type Props = {
    comic: Comic
    characters: Character[]
}
const ComicsDetails = ({ comic, characters }: Props) => {
    return (
        <Paper elevation={16}
            sx={{
                p: 2,
                margin: 'auto',
                width: 0.9,
                height: 500,
                flexGrow: 1,
                backgroundColor: '#fff',
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <Img alt={comic.title} src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} height={470} width={300} />
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Stack>
                                {comic.creators.available != 0 && comic.creators.items.map((it) => <div key={it.name}>{it.role.charAt(0).toUpperCase() + it.role.slice(1)} : {it.name}</div>)}
                            </Stack>
                            <Typography variant="body2" gutterBottom>
                                Paginas: {comic.pageCount}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {comic.description === "" ? "Descripción : No disponible": `Descripción: ${comic.description}`}
                            </Typography>
                            <Typography component="div">
                            Personajes: {characters.length != 0 && characters.map((it) =><NextLink key={it.id} href={`/personajes/${it.id}`} passHref><MUILink sx={{
                                        textDecoration: 'none',
                                        fontSize: 16,
                                        color: "primary",
                                        mr:1
                                    }}>{it.name},</MUILink></NextLink>)}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <GeneralButton href={`/checkout?id=${comic.id}`} name={comic.stock === 0 ? "Sin Stock" : "Comprar"} disabled={comic.stock === 0}/>
                        </Grid>
                    </Grid>
                    <Grid item sx={{margin: 2}}>
                        <Typography variant="subtitle1" component="div" sx={{color:"red" , textDecoration: "line-through"}}>
                            {comic.oldPrice !== comic.price && `$ ${comic.oldPrice},00`}
                        </Typography>
                        <Typography variant="subtitle1" component="div" sx={{color:"green", fontWeight: "bold" }}>
                            {comic.price !== 0 && `$ ${comic.price},00`}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}
export default ComicsDetails;