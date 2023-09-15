import React from "react";
import { Grid, Typography } from '@mui/material';;
import Input from "./input";
import CheckButton from "../buttons/checkButton";

const DeliveryDataDiv = ({ control, handler, handler2, errors }: any) => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Input
                        control={control}
                        name="address"
                        type="text"
                        ph="Direccion"
                    />
                    <Typography sx={{ color: "red" }}>{errors.address?.message?.toString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input
                        control={control}
                        name="address2"
                        type="text"
                        ph="Departmento, piso, etc..."
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input
                        control={control}
                        name="city"
                        type="text"
                        ph="Ciudad"
                    />
                    <Typography sx={{ color: "red" }}>{errors.city?.message?.toString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input
                        control={control}
                        name="state"
                        type="text"
                        ph="Provincia"
                    />
                    <Typography sx={{ color: "red" }}>{errors.state?.message?.toString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Input
                        control={control}
                        name="zipCode"
                        type="text"
                        ph="Codigo Postal"
                    />
                    <Typography sx={{ color: "red" }}>{errors.zipCode?.message?.toString()}</Typography>
                </Grid>
            </Grid>
            <div style={{ marginTop: "2rem" }}>
                <CheckButton onClick={handler2} name="Atras" disabled={false} role="back1"/>
                <CheckButton onClick={handler} name="Siguiente" disabled={false} role="next2"/>
            </div>
        </>
    );
};

export default DeliveryDataDiv;