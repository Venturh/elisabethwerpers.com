import { use } from 'react'
import type { Metadata } from 'next'
import { getExhibitBySlug, getLatestExceptSlugExhibits } from 'lib/sanity.client'
import { useLocale, useTranslations } from 'next-intl'

import { ExhibitGrid } from '@/components/exhibits/exhibit-grid'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, Breadcrumbs } from '@/components/ui/breadcumbs'
import { ButtonLink } from '@/components/ui/button'
import { ImagesTabs } from '@/components/ui/images-tabs'
import { getOgImage, toCurrency } from '@/lib/utils'

type Props = {
	params: {
		slug: string
	}
}

export async function generateMetadata({ params }): Promise<Metadata> {
	const { locale, slug } = params
	const exhibit = await getExhibitBySlug(locale, slug)

	if (!exhibit) {
		return
	}
	const { artist, year } = exhibit
	const title = `${exhibit.title} (${year}) - ${artist}`
	const description = `${exhibit.title}  - ${artist}`
	const ogImage = getOgImage(locale, exhibit.title, 'exhibit')

	return {
		title,
		description,
		openGraph: {
			//@ts-expect-error seems to be wrong
			title,
			description,
			//@ts-expect-error seems to be wrong
			type: 'article',
			locale,
			url: `https://elisabethwerpers.com/exhibits/${slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			images: [ogImage],
		},
	}
}

export default function ExhibitionPage({ params: { slug } }: Props) {
	const locale = useLocale()
	const t = useTranslations()

	const exhibit = use(getExhibitBySlug(locale, slug))
	const latestExhibits = use(getLatestExceptSlugExhibits(locale, slug))

	const breadcrumbs: Breadcrumb[] = [
		{ name: t('home'), href: '/' },
		{ name: t('exhibits'), href: '/exhibits' },
		{ name: exhibit.title, href: `/exhibits/${exhibit.slug}` },
	]

	return (
		<div>
			<Breadcrumbs breadcrumbs={breadcrumbs} />
			<div className="space-y-24">
				<div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8">
					<div className="col-span-2">
						<ImagesTabs images={exhibit.images} />
					</div>
					<div className="mt-10 space-y-6 px-4 sm:mt-16 sm:px-0 lg:mt-0">
						<h1 className="sr-only">Title</h1>
						<h1 className="text-3xl font-bold tracking-tight text-gray-900">{exhibit.title}</h1>
						<div className="mt-3">
							<h2 className="sr-only">Price</h2>
							{exhibit.sold ? (
								<Badge size="lg">{t('sold')}</Badge>
							) : (
								<p className="text-3xl tracking-tight text-gray-900">{toCurrency(exhibit.price)}</p>
							)}
						</div>
						<div>
							<h3 className="sr-only">Information</h3>
							<div className="text-gray-700">{exhibit.artist}</div>
							<div className="text-gray-700">{exhibit.year}</div>
						</div>
						<ButtonLink href={`/${locale}/exhibits/${exhibit.slug}/contact`}>
							Werk Anfragen
						</ButtonLink>
						<section aria-labelledby="details">
							<h2 id="details-heading" className="sr-only">
								Additional details
							</h2>
							<ul className="list-disc space-y-2 border-t pt-6 pl-4">
								{exhibit.info
									.split('\n')
									.filter((line: string) => line !== '')
									.map((line: string) => (
										<li key={line}>
											<div className="text-sm font-medium text-gray-900">{line}</div>
										</li>
									))}
							</ul>
						</section>
					</div>
				</div>
				<ExhibitGrid title={t('exhibits')} exhibits={latestExhibits} />
			</div>
		</div>
	)
}
