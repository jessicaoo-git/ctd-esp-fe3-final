import { render, screen } from '@testing-library/react';
import CharacterDetails from './charactersDetails';


describe('CharacterDetails component with or without description', () => {
    const data = {
        id: 0,
        name: "HeroNameExample",
        description: "Example description",
        thumbnail: {
            path: "https://fotografiamejorparavendermas.com/wp-content/uploads/2017/06/La-importancia-de-la-imagen",
            extension: "jpg"
        }
    }
    const data2 = {
        id: 0,
        name: "HeroNameExample",
        description: "",
        thumbnail: {
            path: "https://fotografiamejorparavendermas.com/wp-content/uploads/2017/06/La-importancia-de-la-imagen",
            extension: "jpg"
        }
    }
    it('render with description', () => {
        render( <CharacterDetails character={data} comics={[]}/>)
        const description = screen.getByText("Descripción: Example description");
        expect(description).toBeInTheDocument()
    });
    it("render without description", () => {
        render( <CharacterDetails character={data2} comics={[]}/> )
        const description = screen.getByText("Descripción : No disponible");
        expect(description).toBeInTheDocument()
    })
});