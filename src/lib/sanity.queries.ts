import { groq } from 'next-sanity'

const exhibitFields = groq`
  _id,
  title,
  artist,
  year,
  info,
  price,
  sold,
  images,
  "slug": slug.current,
`

const exhibitionFields = groq`
  _id,
  title,
  from,
  to,
  mainImage,
  "slug": slug.current,
`

export const exhibitionIndexQuery = groq`
*[_type == "exhibition" && __i18n_lang == $lang] | order(date desc, _updatedAt desc) {
  ${exhibitionFields}
}`

export const exhibitionSlugQuery = groq`
*[_type=='exhibition' && __i18n_lang == $lang &&slug.current == $slug][0]{
    ${exhibitionFields}
    ${groq`
    exhibits[]->{
        ${exhibitFields}
        }
    `}
}`

export const exhibitIndexQuery = groq`
*[_type == "exhibit" && __i18n_lang == $lang] | order(date desc, _updatedAt desc) {
  ${exhibitFields}
}`

export const exhibitSlugQuery = groq`
*[_type=='exhibit' && __i18n_lang == $lang && slug.current == $slug][0] {
  ${exhibitFields}
}`

export interface Exhibit {
	_id: string
	title: string
	slug: string
	artist: string
	year: string
	info: any
	other: string
	price: number
	sold: boolean
	images: any
}

export interface Exhibition {
	_id: string
	title: string
	slug: string
	coverImage: any
	from: string
	to: string
	mainImage?: any
	exhibits: Exhibit[]
}
