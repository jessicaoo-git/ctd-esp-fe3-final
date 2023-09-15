import { GetStaticPaths, GetStaticProps } from 'next'
import React, { FC, ReactElement, useContext } from 'react'
import { getComic, getComicCharacters, getComics } from 'dh-marvel/services/marvel/marvel.service';
import type { Comic } from 'dh-marvel/components/comicDetails/comicDetails';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { NextPageWithLayout } from '../_app.page';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import ComicDetails from 'dh-marvel/components/comicDetails/comicDetails';
import type { Character } from 'dh-marvel/components/characterDetails/charactersDetails';
import Head from 'next/head';
interface Props {
    data: Comic,
    characters: Character[]
}

const ComicId: NextPageWithLayout<Props> = ({ data, characters }: Props) => {
    return (
        <>
            <Head>
                <title>Comics - {data.title}</title>
            </Head>
            <BodySingle title={data.title}>
                <ComicDetails comic={data} characters={characters} />
            </BodySingle>
        </>
    )
}
ComicId.getLayout = function getLayout(page: ReactElement) {
    return <LayoutGeneral>{page}</LayoutGeneral>
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params?.id?.toString() || '0'
    const comic = await getComic(parseInt(id));
    const characters = await getComicCharacters(parseInt(id));
    return {
        props: {
            data: comic, characters
        }
    }
}
export const getStaticPaths: GetStaticPaths = async () => {
    const data = await getComics();
    const paths = data.data.results.map((data: Comic) => {
        return { params: { id: data.id.toString() } }
    })
    return {
        paths,
        fallback: 'blocking'
    }

}
export default ComicId