import Button from "@mui/material/Button";
import { FC, MouseEventHandler } from "react";

type Props = {
    name: string,
    disabled : boolean,
    role: string,
    onClick : MouseEventHandler,
}
const CheckButton: FC<Props> = ({name,disabled, role, onClick}: Props) => {
    return (
        <Button disabled={disabled} variant="contained" sx={{ marginLeft: "1rem", color: "primary" }} onClick={onClick} role={role}>
            {name}
        </Button>
    )
};
export default CheckButton;