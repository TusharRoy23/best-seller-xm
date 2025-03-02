import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Category } from '~/utils/customTypes';
import cache from '~/server/utils/cacheConfig';

export default defineEventHandler(async (event) => {
    try {
        if (cache.has('category')) {
            return cache.get('category') as Category;
        }

        const filePath = join(process.cwd(), 'server/data/data.json');
        const data = await readFile(filePath, 'utf-8');
        const category = JSON.parse(data)['categories'] as Category;

        cache.set('category', category);
        return category;
    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: { message: 'Failed to load categories. Please try again later.' }
        });
    }
})
