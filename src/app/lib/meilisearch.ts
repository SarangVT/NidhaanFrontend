import { MeiliSearch } from 'meilisearch';

const MEILI_HOST = 'http://localhost:7700';
const MEILI_API_KEY = 'P-AmW6JgciyRY-uQKo0gs32GtaAR-f8fvpCgk4bXsTw';

export const client = new MeiliSearch({
  host: MEILI_HOST,
  apiKey: MEILI_API_KEY,
});
