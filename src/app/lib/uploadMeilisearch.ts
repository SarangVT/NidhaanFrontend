import fs from 'fs'
import csv from 'csv-parser'
import { MeiliSearch } from 'meilisearch'

const MEILI_HOST = 'http://localhost:7700';

export const client = new MeiliSearch({
  host: MEILI_HOST,
  apiKey: 'sarang',
});

type ProductForSearch = {
  id: number,
  title: string
  product_details: string
  manufacturer_details: string
  tags: string[]
}

const results: ProductForSearch[] = []

fs.createReadStream('src/app/lib/products.csv')
  .pipe(csv())
  .on('data', (row: any) => {
    const product = {
      id: row.id,
      title: row.title,
      product_details: row.product_details,
      manufacturer_details: row.manufacturer_details,
      tags: row.tags?.split(',').map((t: string) => t.trim()) || []
    }
    results.push(product)
  })
  .on('end', async () => {
    try {
      const index = client.index('products')

      // Optional: define searchable/filterable attributes
      await index.updateSettings({
        searchableAttributes: ['title', 'product_details', 'manufacturer_details', 'tags'],
        filterableAttributes: ['tags']
      })

      await index.deleteAllDocuments()
      const response = await index.addDocuments(results)
      console.log('Uploaded to Meilisearch:', response)
    } catch (err) {
      console.error('Error uploading:', err)
    }
  })
