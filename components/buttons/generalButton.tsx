import Button from "@mui/material/Button";
import { FC } from "react";
import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material';

type Props = {
    href: string,
    name: string,
    disabled : boolean,
}
const GeneralButton: FC<Props> = ({href,name,disabled}: Props) => {
    return (
        <Button disabled={disabled} variant="contained" sx={{width:140}}>
            <NextLink href={href} passHref >
                <MUILink sx={{
                    textDecoration: 'none',
                    color: "white"
                }}>{name}</MUILink>
            </NextLink>
        </Button>
    )
};
export default GeneralButton;