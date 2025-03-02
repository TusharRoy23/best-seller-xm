import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Product } from '~/utils/customTypes';
import cache from '~/server/utils/cacheConfig';

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const hasQuery = Object.keys(query).length > 0;
        if (cache.has('productlist') && !hasQuery) {
            return cache.get('productlist') as Product[];
        }
        const filePath = join(process.cwd(), 'server/data/data.json');
        const data = await readFile(filePath, 'utf-8');
        let products = JSON.parse(data)['products'] as Product[];

        if (hasQuery) {
            if (Object.hasOwn(query, 'category')) {
                products = products.filter(product => product.categories.includes(Object.values(query)[0] as string))
            }
            if (Object.hasOwn(query, 'colors')) {
                products = products.filter(product => Object.values(query)[0]?.toString().split(',').includes(product.color))
            }
            if (Object.hasOwn(query, 'search')) {
                const keyword = String(Object.values(query)[0]).toLocaleLowerCase();
                products = products.filter(product => product.name?.dk?.toLowerCase()?.includes(keyword) || product.name?.en?.toLowerCase()?.includes(keyword));
            }
        }
        if (!hasQuery) {
            cache.set('productlist', products);
        }
        return products;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: { message: 'Failed to load list. Please try again later.' }
        });
    }
})
