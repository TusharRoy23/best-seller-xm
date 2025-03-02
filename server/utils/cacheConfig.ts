import { LRUCache } from 'lru-cache';

const cache = new LRUCache({
    max: 1000, // Max number of items to cache
    ttl: 600000, // Cache expires after 10 minutes
});

export default cache;