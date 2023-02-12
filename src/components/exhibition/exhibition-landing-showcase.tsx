'use client'

import { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/swiper.min.css'
import 'swiper/css/pagination'
import Link from 'next/link'

import { ButtonLink } from '@/components/ui/button'
import { SanityImage } from '@/components/ui/sanity-image'
import { SectionHeader } from '@/components/ui/section-header'
import type { Exhibition } from '@/lib/sanity.queries'
import { toDate } from '@/lib/utils'

type Props = {
	locale: string
	exhibition: Exhibition
	height?: number
	width?: number
}

export function ExhibitionLandingShowcase({ exhibition, locale, height, width }: Props) {
	const { title, from, to, slug, images } = exhibition
	const href = `/${locale}/exhibitions/${slug}`
	return (
		<Link href={href} className="relative h-full w-full ">
			<div className="absolute top-4 left-4 rounded bg-zinc-200 p-2">
				<h1 className="text-xl font-bold tracking-tight text-gray-900 lg:text-3xl">{title}</h1>
				<p className="mt-2 max-w-xl text-sm text-gray-700  lg:text-base">
					{`${toDate(from)} - ${toDate(to)}`}
				</p>
			</div>

			<div>
				<SanityImage
					width={width}
					height={height}
					className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
					image={images[0]}
				/>
			</div>
		</Link>
	)
}