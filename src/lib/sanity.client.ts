import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { createClient } from 'next-sanity'

import {
	Exhibit,
	exhibitIndexCountQuery,
	exhibitIndexPaginationQuery,
	Exhibition,
	exhibitionIndexCountQuery,
	exhibitionIndexPaginationQuery,
	exhibitionIndexQuery,
	exhibitionLatestQuery,
	exhibitionsLatestQuery,
	exhibitionSlugQuery,
	exhibitLatestExceptSlugQuery,
	exhibitSlugQuery,
} from './sanity.queries'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: typeof document !== 'undefined',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
	return builder.image(source)
}

async function fetchAPI(query: string, previewData?: {}) {
	return await client.fetch(query, previewData)
}

export async function getAllExhibitions(): Promise<Exhibition[]> {
	return await fetchAPI(exhibitionIndexQuery)
}
export async function getLatestExhibition(): Promise<Exhibition> {
	const result = await fetchAPI(exhibitionLatestQuery)
	return result[0]
}
export async function getLatestExhibitions(): Promise<Exhibition[]> {
	return await fetchAPI(exhibitionsLatestQuery)
}

export async function getPaginatedExhibitions(
	perPage: number,
	start?: number
): Promise<Exhibition[]> {
	const from = start ? (start - 1) * perPage : 0
	const to = start ? from + perPage : perPage

	return await fetchAPI(exhibitionIndexPaginationQuery, { perPage, from, to })
}

export async function getExhibitionsCount(): Promise<number> {
	return await fetchAPI(exhibitionIndexCountQuery, {})
}

export async function getExhibitionBySlug(slug: string): Promise<Exhibition> {
	return await fetchAPI(exhibitionSlugQuery, { slug })
}

export async function getPaginatedExhibits(perPage: number, start?: number): Promise<Exhibit[]> {
	const from = start ? (start - 1) * perPage : 0
	const to = start ? from + perPage : perPage

	return await fetchAPI(exhibitIndexPaginationQuery, { perPage, from, to })
}
export async function getExhibitsCount(): Promise<number> {
	return await fetchAPI(exhibitIndexCountQuery, {})
}

export async function getLatestExceptSlugExhibits(slug: string): Promise<Exhibit[]> {
	return await fetchAPI(exhibitLatestExceptSlugQuery, { slug })
}

export async function getExhibitBySlug(slug: string): Promise<Exhibit> {
	return await fetchAPI(exhibitSlugQuery, { slug })
}
