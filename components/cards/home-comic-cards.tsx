import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import GeneralButton from '../buttons/generalButton';

export type CardType = {
  id: number,
  title: string,
  thumbnail: {
    path: string,
    extension: string,
  }
}
type Props = {
  data: CardType
}

const ComicCard: FC<Props> = ({ data }: Props) => {
  return (
    <Card sx={{ width: 345, height: 500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
      <CardMedia
        component="img"
        alt={data.title}
        height="340"
        width="340"
        image={`${data.thumbnail.path}.${data.thumbnail.extension}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{ overflowY: "hidden", maxHeight: 60 }}>
          {data.title}
        </Typography>
      </CardContent>
      <CardActions>
        <GeneralButton href="/checkout" name="Comprar" disabled = {false}/>
        <GeneralButton href={`/comics/${data.id}`} name="Ver Detalle" disabled = {false}/>
      </CardActions>
    </Card>
  );
}

export default ComicCard;