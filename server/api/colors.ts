import { readFile } from 'fs/promises';
import { join } from 'path';
import type { ColorFilter, Product } from '~/utils/customTypes';
import cache from '~/server/utils/cacheConfig';

export default defineEventHandler(async (event) => {
    try {
        if (cache.has('colors')) {
            return cache.get('colors') as ColorFilter;
        }

        const filePath = join(process.cwd(), 'server/data/data.json');
        const data = await readFile(filePath, 'utf-8');
        const products = JSON.parse(data)['products'] as Product[];
        let colors = [...new Set(products.map(product => product.color))];
        let colorsCount = colors.map(color => ({
            color,
            count: products.filter(product => product.color === color).length
        })) as ColorFilter[];

        cache.set('colors', colorsCount);

        return colorsCount;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: { message: 'Failed to load the colors. Please try again later.' }
        });
    }
})