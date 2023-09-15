import Checkout, { getServerSideProps } from "../checkout/index.page";
import PersonalDataDiv from "dh-marvel/components/checkout/personalDataDiv";
import { useForm } from "react-hook-form";
import { act, fireEvent, render, screen, renderHook, waitFor } from "@testing-library/react";
import DeliveryDataDiv from "dh-marvel/components/checkout/deliveryDataDiv";
import { GetServerSidePropsContext } from "next";
import PaymentDataDiv from "dh-marvel/components/checkout/paymentDataDiv";
import { ParsedUrlQuery } from "node:querystring";


jest.mock("next/router", () => ({
    useRouter() {
        return {
            push: jest.fn()
        }
    }
}));

describe('CheckoutPage', () => {
    describe('when rendering default', () => {
        it('displays the correct title', () => {
            render(<Checkout data={{
                id: 0,
                title: "StoryExample",
                thumbnail: {
                    path: "https://fotografiamejorparavendermas.com/wp-content/uploads/2017/06/La-importancia-de-la-imagen",
                    extension: "jpg"
                },
                price: 75,
                description: "StoryBookExample description",
                pageCount: 1,
                oldPrice: 72,
                stock: 5,
                creators: {
                    available: 1,
                    collectionURI: "exampleURL",
                    items: [{
                        resourceURI: "exampleURL",
                        name: "Autor Name",
                        role: "example Role",
                    }],
                    returned: 1
                }
            }} />)
            const title = screen.getByText('Checkout')
            expect(title).toBeInTheDocument()
        })
    })
    describe("should render payment form", () => {
        it("should trigger click event", async () => {
            const handlerMock = jest.fn();
            // Arrange
            const DummyComponent = () => {
                const { control, formState: { errors }, watch } = useForm()
                return <PaymentDataDiv control={control} errors={errors} handler={handlerMock} watch={watch} />
            }
            render(<DummyComponent />);
            const number = screen.getByPlaceholderText(/Numero de la tarjeta/i);
            const nameOncard = screen.getByPlaceholderText(/Nombre como aparece en la tarjeta/i);
            const expDate = screen.getByPlaceholderText(/MM-AA/i);
            const cvc = screen.getByPlaceholderText(/Código de Seguridad/i);
            const backButton = screen.getByRole("back2")
            //act
            await fireEvent.input(number, { target: { value: "42424242 4242 4242" } });
            await fireEvent.input(nameOncard, { target: { value: "Jhon Doe" } });
            await fireEvent.input(expDate, { target: { value: "03/23" } });
            await fireEvent.input(cvc, { target: { value: "123" } });
            fireEvent.click(backButton)
            // Assert
            expect(handlerMock).toBeCalledTimes(1)
        });
    });
    describe("onSubmit", () => {
        it(" happy path should trigger handleSubmit", async () => {
            render(<Checkout data={{
                id: 0,
                title: "StoryExample",
                thumbnail: {
                    path: "https://fotografiamejorparavendermas.com/wp-content/uploads/2017/06/La-importancia-de-la-imagen",
                    extension: "jpg"
                },
                price: 75,
                description: "StoryBookExample description",
                pageCount: 1,
                oldPrice: 72,
                stock: 5,
                creators: {
                    available: 1,
                    collectionURI: "exampleURL",
                    items: [{
                        resourceURI: "exampleURL",
                        name: "Autor Name",
                        role: "example Role",
                    }],
                    returned: 1
                }
            }} />);
            //primer paso
            const nameInput = screen.getByPlaceholderText(/Nombre/i);
            const lastNameInput = screen.getByPlaceholderText(/Apellido/i);
            const emailInput = screen.getByPlaceholderText(/E-mail/i);
            const nextButton1 = screen.getByRole("next1");
            fireEvent.input(nameInput, { target: { value: "John" } });
            fireEvent.input(lastNameInput, { target: { value: "Doe" } });
            fireEvent.input(emailInput, { target: { value: "johndoe@example.com" } });
            fireEvent.click(nextButton1)
            //segundo paso
            await waitFor(() => {
                const addressInput = screen.getByPlaceholderText(/Direccion/i);
                const cityInput = screen.getByPlaceholderText(/Ciudad/i);
                const stateInput = screen.getByPlaceholderText(/Provincia/i);
                const zipCodeInput = screen.getByPlaceholderText(/Codigo Postal/i);
                fireEvent.input(addressInput, { target: { value: "123 Main St" } });
                fireEvent.input(cityInput, { target: { value: "New York" } });
                fireEvent.input(stateInput, { target: { value: "NY" } });
                fireEvent.input(zipCodeInput, { target: { value: "10001" } });
            });
            const nextButton2 = screen.getByRole("next2");
            fireEvent.click(nextButton2);
            //tercer paso
            await waitFor(() => {
                const number = screen.getByPlaceholderText(/Numero de la tarjeta/i);
                const nameOncard = screen.getByPlaceholderText(/Nombre como aparece en la tarjeta/i);
                const expDate = screen.getByPlaceholderText(/MM-AA/i);
                const cvc = screen.getByPlaceholderText(/Código de Seguridad/i);
                fireEvent.input(number, { target: { value: "42424242 4242 4242" } });
                fireEvent.input(nameOncard, { target: { value: "Jhon Doe" } });
                fireEvent.input(expDate, { target: { value: "03/23" } });
                fireEvent.input(cvc, { target: { value: "123" } });
            });
            const submitButton = screen.getByRole("submit")
            fireEvent.click(submitButton);
            //vuelve al 2do step
            const backButton = screen.getByRole("back2");
            fireEvent.click(backButton);
        });
        it("should trigger an error mssg", async () => {
            render(<Checkout data={{
                id: 0,
                title: "StoryExample",
                thumbnail: {
                    path: "https://fotografiamejorparavendermas.com/wp-content/uploads/2017/06/La-importancia-de-la-imagen",
                    extension: "jpg"
                },
                price: 75,
                description: "StoryBookExample description",
                pageCount: 1,
                oldPrice: 72,
                stock: 5,
                creators: {
                    available: 1,
                    collectionURI: "exampleURL",
                    items: [{
                        resourceURI: "exampleURL",
                        name: "Autor Name",
                        role: "example Role",
                    }],
                    returned: 1
                }
            }} />);
            //primer paso
            const nameInput = screen.getByPlaceholderText(/Nombre/i);
            const lastNameInput = screen.getByPlaceholderText(/Apellido/i);
            const emailInput = screen.getByPlaceholderText(/E-mail/i);
            const nextButton1 = screen.getByRole("next1");
            fireEvent.input(nameInput, { target: { value: "John" } });
            fireEvent.input(lastNameInput, { target: { value: "Doe" } });
            fireEvent.input(emailInput, { target: { value: "johndoe@example.com" } });
            fireEvent.click(nextButton1)
            //segundo paso
            await waitFor(() => {
                const addressInput = screen.getByPlaceholderText(/Direccion/i);
                const cityInput = screen.getByPlaceholderText(/Ciudad/i);
                const stateInput = screen.getByPlaceholderText(/Provincia/i);
                const zipCodeInput = screen.getByPlaceholderText(/Codigo Postal/i);
                fireEvent.input(addressInput, { target: { value: "123 Main St" } });
                fireEvent.input(cityInput, { target: { value: "New York" } });
                fireEvent.input(stateInput, { target: { value: "NY" } });
                fireEvent.input(zipCodeInput, { target: { value: "10001" } });
            });
            const nextButton2 = screen.getByRole("next2");
            fireEvent.click(nextButton2);
            //tercer paso
            await waitFor(() => {
                const number = screen.getByPlaceholderText(/Numero de la tarjeta/i);
                const nameOncard = screen.getByPlaceholderText(/Nombre como aparece en la tarjeta/i);
                const expDate = screen.getByPlaceholderText(/MM-AA/i);
                const cvc = screen.getByPlaceholderText(/Código de Seguridad/i);
                fireEvent.input(number, { target: { value: "4111 4111 4111 4111" } });
                fireEvent.input(nameOncard, { target: { value: "Jhon Doe" } });
                fireEvent.input(expDate, { target: { value: "03/23" } });
                fireEvent.input(cvc, { target: { value: "123" } });
            });
            const submitButton = screen.getByRole("submit")
            fireEvent.click(submitButton);

            //dispara el error
            await waitFor(() => {
                const error = screen.getByRole("alert");
                expect(error). toBeInTheDocument()
            })
        });
    });
    describe("getserversideprops", () => {
        it("should redirect to homepage", async () => {
            const context = {
                req: {
                    headers: {
                        referer: '',
                    },
                },
            };
            const value = await getServerSideProps(context as GetServerSidePropsContext);
            expect(value).toEqual({
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            });
        });
        it("should render data from API", async () => {
            const context = {
                req: {
                    headers: {
                        referer: '/',
                    },
                },
                query: { id: "1" } as ParsedUrlQuery,
            };
            const value = await getServerSideProps(context as GetServerSidePropsContext);
            expect(value).toEqual({
                "props": {
                    "data": {
                        "id": 1,
                        "oldPrice": 87,
                        "price": 72,
                        "stock": 2,
                    },
                },
            });
        });
    })
})