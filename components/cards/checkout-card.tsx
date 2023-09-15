import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { Comic } from '../comicDetails/comicDetails';


type Props = {
    data: Comic
}

const CheckCard: FC<Props> = ({ data }: Props) => {
    return (
        <Card sx={{ width: 200, height: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around",position:"relative",margin: "1rem" }}>
            <CardMedia
                component="img"
                alt={data.title}
                height="200"
                width="340"
                image={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                />
            <CardContent>
                <Typography gutterBottom component="div" sx={{ overflowY: "hidden", maxWidth: 180, height:25}}>
                    {data.title}
                </Typography>
                <Typography gutterBottom variant="h5" component="div" sx={{color : "green", fontWeight: "bold", position:"absolute", bottom: 0, left: 10}}>
                    $ {data.price}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CheckCard;