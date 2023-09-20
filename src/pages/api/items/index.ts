import { getProducts } from '@/services/api/getProducts';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const search = req.query.q as string;

      const data = await getProducts({ search });

      res.status(200).json({ data, error: null });
    } catch (err) {
      res.status(500).json({ error: 'failed to load data' });
    }
  } else {
    res.status(405).json({ error: 'Not allowed method' });
  }
}
