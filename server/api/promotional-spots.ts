import { readFile } from 'fs/promises';
import { join } from 'path';
import type { PromotionalSpots } from '~/utils/customTypes';

export default defineEventHandler(async (event) => {
    try {
        const filePath = join(process.cwd(), 'server/data/data.json');
        const data = await readFile(filePath, 'utf-8');
        const spots = JSON.parse(data)['promotionalSpots'] as PromotionalSpots[];
        return spots.sort((a, b) => a.position - b.position);
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: { message: 'Failed to load list. Please try again later.' }
        });
    }
})