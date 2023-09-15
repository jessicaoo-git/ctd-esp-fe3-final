import { Button, Grid, Typography } from '@mui/material';
import Input from "./input";
import CheckButton from "../buttons/checkButton";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';



const PaymentDataDiv = ({ control, handler, watch, errors }: any) => {
    const valorNumber = watch("number") || "";
    const valorName = watch("nameOnCard") || "";
    const valorExpiry = watch("expiry") || "";
    const valorCvc = watch("cvc") || "";
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Grid item xs={12} sm={10} sx={{ marginBottom: 2 }}>
                        <Input
                            control={control}
                            name="number"
                            type="text"
                            ph="Numero de la tarjeta"
                        />
                        <Typography sx={{color: "red"}}>{errors.number?.message?.toString()}</Typography>
                    </Grid>
                    <Grid item xs={4} sm={10} sx={{ marginBottom: 2 }}>
                        <Input
                            control={control}
                            name="nameOnCard"
                            type="text"
                            ph="Nombre como aparece en la tarjeta"
                        />
                        <Typography sx={{color: "red"}}>{errors.nameOnCard?.message?.toString()}</Typography>
                    </Grid>
                    <Grid item xs={4} sm={10} sx={{ marginBottom: 2 }}>
                        <Input
                            control={control}
                            name="expDate"
                            type="text"
                            ph="MM-AA"
                            />
                            <Typography sx={{color: "red"}}>{errors.expDate?.message?.toString()}</Typography>
                    </Grid>
                    <Grid item xs={4} sm={10}>
                        <Input
                            control={control}
                            name="cvc"
                            type="password"
                            ph="Código de Seguridad"
                        />
                        <Typography sx={{color: "red"}}>{errors.cvc?.message?.toString()}</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Cards
                        cvc={valorCvc}
                        expiry={valorExpiry}
                        name={valorName}
                        number={valorNumber}
                    />
                </Grid>
            </Grid>
            <div style={{ marginTop: "2rem" }}>
                <CheckButton onClick={handler} name="Atras" disabled={false} role='back2'/>
                <Button type="submit" variant="contained" sx={{ marginLeft: "1rem", color: "primary" }} role="submit"> Enviar </Button>
            </div>
        </>
    );
};

export default PaymentDataDiv;