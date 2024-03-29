'use client'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/swiper.min.css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import { Navigation, Thumbs } from 'swiper'
import { PaginationOptions } from 'swiper/types'

import type { SanityImageType } from '@/lib/sanity.queries'
import { cn } from '@/lib/utils'
import { SanityImage } from './sanity-image'

type Props = {
	images: SanityImageType[]
}

export function ImagesTabs({ images }: Props) {
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

	return (
		<div className="h-96 lg:grid lg:h-full lg:grid-cols-12 lg:gap-x-8">
			<Swiper
				onSwiper={setThumbsSwiper}
				spaceBetween={10}
				slidesPerView={images.length}
				watchSlidesProgress
				className={cn('tabs-swiper col-span-2 !hidden w-full overscroll-auto lg:!flex')}
				direction="vertical"
			>
				{images.map((image) => (
					<SwiperSlide
						className="!h-20 rounded-md border border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800"
						key={image._key}
					>
						<SanityImage fill image={image} />
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				className="dark:bg-zinc-80 h-[550px] w-full rounded-md border border-zinc-300 bg-zinc-50 px-2 dark:border-zinc-700 dark:bg-zinc-800 lg:col-span-8"
				speed={900}
				watchSlidesProgress
				thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
				navigation
				modules={[Thumbs, Navigation]}
			>
				{images.map((image) => (
					<SwiperSlide key={image._key}>
						<SanityImage fill image={image} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
