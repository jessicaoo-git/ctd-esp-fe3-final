import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout"
import { NextPageWithLayout } from "../_app.page"
import { ReactElement, useState } from "react"
import Head from "next/head"
import BodySingle from "dh-marvel/components/layouts/body/single/body-single"
import { useForm } from 'react-hook-form';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import React from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import PersonalDataDiv from "../../components/checkout/personalDataDiv"
import DeliveryDataDiv from "dh-marvel/components/checkout/deliveryDataDiv"
import PaymentDataDiv from "dh-marvel/components/checkout/paymentDataDiv"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { getComic } from "dh-marvel/services/marvel/marvel.service"
import { Comic } from "dh-marvel/components/comicDetails/comicDetails"
import CheckCard from "dh-marvel/components/cards/checkout-card"
import Box from "@mui/material/Box"
import Alert from "@mui/material/Alert"
import { useRouter } from "next/router"


type FormData = yup.InferType<typeof schema>;

const steps = ["Datos Personales", "Dirección de entrega", "Datos del pago"];
const schema = yup.object({
    name: yup.string().required("El Nombre es requerido."),
    lastname: yup.string().required("El Apellido es requerido."),
    email: yup.string().email("Debe contener un formato correcto.").required("El Email es requerido."),
    address: yup.string().required("Direccion requerida."),
    city: yup.string().required("Ciudad requerida."),
    state: yup.string().required("Provincia requerida."),
    zipCode: yup.string().required("Codigo Postal requerido."),
    number: yup.string().required("Numero de Tarjeta requerido."),
    nameOnCard: yup.string().required("Escriba el nombre que aparece en la tarjeta"),
    expDate: yup.string().required("Inserte la fecha de vencimiento"),
    cvc: yup.string().required("Escriba el numero de verificación")
}).required();

type Props = {
    data: Comic
}
const Checkout: NextPageWithLayout<Props> = ({ data }: Props) => {

    const { handleSubmit, control, trigger, formState: { errors }, watch } = useForm<FormData>({ resolver: yupResolver(schema) });
    const [activeStep, setActiveStep] = useState(0);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleNext1 = async () => {
        const name = await trigger("name");
        const lastname = await trigger("lastname");
        const email = await trigger("email");
        if (name && lastname && email) setActiveStep(1);
    };
    const handleNext2 = async () => {
        const address = await trigger("address");
        const city = await trigger("city");
        const state = await trigger("state");
        const zipCode = await trigger("zipCode");
        if (address && city && state && zipCode) setActiveStep(2);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const onSubmit = async (form: any) => {
        const number = await trigger("number");
        const nameOnCard = await trigger("nameOnCard");
        const expDate = await trigger("expDate");
        const cvc = await trigger("cvc");
        const body = {
            customer: {
                name: form.name,
                lastname: form.lastname,
                email: form.email,
                address: {
                    address1: form.address,
                    address2: form.address2,
                    state: form.state,
                    city: form.city,
                    zipCode: form.zipCode
                }
            },
            card: {
                number: form.number,
                nameOnCard: form.nameOnCard,
                expDate: form.expDate,
                cvc: form.cvc,
            }
        }
        if (number && nameOnCard && expDate && cvc) {
            const req = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const response = await req.json();
            if (response.error) {
                setError(response.message)
            } else {
                localStorage.setItem("CheckoutData", JSON.stringify({
                    name: form.name,
                    lastname: form.lastname,
                    email: form.email,
                    address: {
                        address1: form.address,
                        address2: form.address2,
                        state: form.state,
                        city: form.city,
                        zipCode: form.zipCode
                    },
                    comicName: data.title,
                    comicImage: `${data.thumbnail.path}.${data.thumbnail.extension}`,
                    comicPrice: data.price
                }))
                router.push({
                    pathname: "/confirmacion-compra"
                })
            };
        }
    }
    return (
        <>
            <Head>
                <title>Checkout</title>
            </Head>
            <BodySingle title={"Checkout"}>
                <Stepper sx={{ margin: 4 }} activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {activeStep === 0 && <PersonalDataDiv control={control} handler={handleNext1} errors={errors} />}
                    {activeStep === 1 && <DeliveryDataDiv control={control} handler={handleNext2} handler2={handleBack} errors={errors} />}
                    {activeStep === 2 && <PaymentDataDiv control={control} handler={handleBack} watch={watch} errors={errors} />}
                </form>
                <CheckCard data={data} />
                <Box>
                    {error !== "" && (
                        <Alert
                            severity="error"
                            sx={{
                                marginTop: "30px",
                            }}
                            role="alert"
                        >
                            {error}
                        </Alert>
                    )}
                </Box >
            </BodySingle >
        </>
    )
}

Checkout.getLayout = function getLayout(page: ReactElement) {
    return <LayoutCheckout>{page}</LayoutCheckout>
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { req } = context;
    const referer = req.headers.referer;
    if (!referer) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    const id = context.query?.id?.toString() || "0";
    const comic = await getComic(parseInt(id))
    return {
        props: { data: comic },
    }
}
export default Checkout