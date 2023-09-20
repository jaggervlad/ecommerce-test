import { getProductById } from '@/services/api/getProductById';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const id = req.query.id as string;

      if (!id) return res.status(400).json({ error: 'Debes proveer un id' });

      const data = await getProductById({ id: +id });

      return res.status(200).json({ data, error: null });
    } catch (err) {
      return res.status(500).json({ error: 'Error obteniendo producto' });
    }
  } else {
    return res.status(405).json({ error: 'Not allowed method' });
  }
}
