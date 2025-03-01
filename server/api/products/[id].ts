import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Product } from '~/utils/customTypes';

export default defineEventHandler(async (event) => {
    const { id } = getRouterParams(event); // Get ID from URL
    const productId = Number(id); // Convert to number

    const filePath = join(process.cwd(), 'server/data/data.json');
    const data = await readFile(filePath, 'utf-8');
    const products = JSON.parse(data)['products'] as Product[];
    return products.find(product => product.id === productId);
})