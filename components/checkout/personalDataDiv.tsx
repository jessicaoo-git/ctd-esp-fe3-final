import React from "react";
import Grid from '@mui/material/Grid';
import Input from "./input";
import CheckButton from "../buttons/checkButton";
import Typography from '@mui/material/Typography';


const PersonalDataDiv = ({ control, handler, errors }: any) => {

    return (
        <>
            <Grid container spacing={2}>
                <Grid item sm={6}>
                    <Input
                        control={control}
                        name="name"
                        type="text"
                        ph="Nombre"
                    />
                    <Typography sx={{color: "red"}}>{errors.name?.message?.toString()}</Typography>
                </Grid>
                <Grid item sm={6}>
                    <Input
                        control={control}
                        name="lastname"
                        type="text"
                        ph="Apellido"
                    />
                    <Typography sx={{color: "red"}}>{errors.lastname?.message?.toString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Input
                        control={control}
                        name="email"
                        type="text"
                        ph="E-mail"
                    />
                    <Typography sx={{color: "red"}}>{errors.email?.message?.toString()}</Typography>
                </Grid>
            </Grid>
            <div style={{ marginTop: "2rem" }}>
                <CheckButton onClick={handler} name="Siguiente" disabled={false} role="next1"/>
            </div>
        </ >
    );
};

export default PersonalDataDiv;