import TextField from "@mui/material/TextField"
import { useController } from "react-hook-form";

const Input = ({ control, name, type, ph }: any) => {
    const {
        field
    } = useController({
        name,
        control,
    })
    return (
        <TextField
            id ={name}
            fullWidth
            variant="outlined"
            placeholder={ph}
            type={type}
            name={name}
            value={field.value}
            onChange={field.onChange}
        />
    )
}
export default Input;