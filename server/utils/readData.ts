import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Product } from '~/utils/customTypes';

const filePath = join(process.cwd(), 'server/data/data.json');

export async function getProducts(): Promise<Product[]> {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data)['products'] as Product[];
}

export async function getProductById(id: number): Promise<Product | undefined> {
    const products = await getProducts();
    return products.find(product => product.id === id);
}
