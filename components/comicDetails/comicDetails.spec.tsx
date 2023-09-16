import { render, screen } from '@testing-library/react';
import ComicsDetails, { Comic } from './comicDetails';


describe('ComicDetail component with or without description, stock and oldPrice', () => {
    const data : Comic= {
        id: 0,
        title: "Example Title",
        pageCount: 10,
        price: 70,
        oldPrice: 56,
        stock: 3,
        description: "Example description",
        thumbnail: {
            path: "https://fotografiamejorparavendermas.com/wp-content/uploads/2017/06/La-importancia-de-la-imagen",
            extension: "jpg"
        },
        creators: {
            available: 0,
            collectionURI: "",
            items: [
                {
                    resourceURI: "",
                    name: "",
                    role: "",
                }
            ],
            returned: 0
        }
    }
    const data2 : Comic = {
        id: 0,
        title: "Example Title",
        pageCount: 10,
        price: 70,
        oldPrice: 70,
        stock: 0,
        description: "",
        thumbnail: {
            path: "https://fotografiamejorparavendermas.com/wp-content/uploads/2017/06/La-importancia-de-la-imagen",
            extension: "jpg"
        },
        creators: {
            available: 0,
            collectionURI: "",
            items: [
                {
                    resourceURI: "",
                    name: "",
                    role: "",
                }
            ],
            returned: 0
        }
    }
    it('render with description', () => {
        render(<ComicsDetails comic={data} characters={[]} />)
        const description = screen.getByText("Descripción: Example description");
        expect(description).toBeInTheDocument()
    });
    it("render without description", () => {
        render(<ComicsDetails comic={data2} characters={[]} />)
        const description = screen.getByText("Descripción : No disponible");
        expect(description).toBeInTheDocument()
        const botonCompra = screen.getByText(/sin stock/i);
        expect(botonCompra).toBeInTheDocument();
    })
});