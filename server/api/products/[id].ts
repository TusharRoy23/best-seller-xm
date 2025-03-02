import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Product } from '~/utils/customTypes';

export default defineEventHandler(async (event) => {
    try {
        const { id } = getRouterParams(event); // Get ID from URL
        const productId = Number(id); // Convert to number

        const filePath = join(process.cwd(), 'server/data/data.json');
        const data = await readFile(filePath, 'utf-8');
        const products = JSON.parse(data)['products'] as Product[];
        const product = products.find(product => product.id === productId);

        if (!product) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Not Found',
                data: { message: 'Product Not Found' }
            });
        }

        return product;
    } catch (error) {
        if (error instanceof Error && 'statusCode' in error) {
            throw error;
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: { message: 'Failed to load details. Please try again later.' }
        });
    }
})