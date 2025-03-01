import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Category } from '~/utils/customTypes';

export default defineEventHandler(async (event) => {
    const filePath = join(process.cwd(), 'server/data/data.json');
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data)['categories'] as Category;
})
