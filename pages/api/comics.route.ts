import { getComics } from 'dh-marvel/services/marvel/marvel.service'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const page = parseInt(req.query.page?.toString() || '0') | 0
    const offset = (page - 1) * 12
    try {
        const comics = await getComics(offset, 12)
        res.status(200).json(comics.data);
    } catch (error) {
        res.status(500).json({ error: "Error al cargar datos" });
    }
}
