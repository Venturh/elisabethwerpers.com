import { use } from 'react'
import { Metadata } from 'next'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { useLocale, useTranslations } from 'next-intl'

import { ExhibitionCard } from '@/components/exhibition/exhibition-card'
import { ExhibitionRowCard } from '@/components/exhibition/exhibition-row-card'
import { Breadcrumb, Breadcrumbs } from '@/components/ui/breadcumbs'
import { Divider } from '@/components/ui/divider'
import EmptyState from '@/components/ui/empty-state'
import {
	getCurrentExhibition,
	getPastExhibitions,
	getUpcommingExhibitions,
} from '@/lib/sanity.client'
import { makeMetaData } from '@/lib/utils'

export async function generateMetadata({ params }): Promise<Metadata> {
	const { locale } = params

	const metaData = await makeMetaData(locale, {
		optionalTitleKey: 'exhibitions',
		optionalUrl: `https://elisabethwerpers.com/${locale}/exhibitions`,
	})

	return metaData
}

export default function Exhibitions() {
	const t = useTranslations()
	const locale = useLocale()
	const currentExhibition = use(getCurrentExhibition(locale))
	const pastExhibitions = use(getPastExhibitions(locale))
	const upcomingExhibtions = use(getUpcommingExhibitions(locale))

	const breadcrumbs: Breadcrumb[] = [{ name: t('home'), href: '/' }, { name: t('exhibitions') }]

	return (
		<div>
			<Breadcrumbs breadcrumbs={breadcrumbs} />
			{currentExhibition && <ExhibitionRowCard exhibition={currentExhibition} />}
			{upcomingExhibtions.length > 0 ? (
				<div className="mt-12">
					<Divider>{t('upcoming')}</Divider>
					<div className="grid gap-x-6 md:grid-cols-3  md:gap-y-6">
						{upcomingExhibtions.map((exhibition) => (
							<div key={exhibition.slug}>
								<ExhibitionCard exhibition={exhibition} upcoming />
								<div className="z-10 my-6 h-[1px] w-full bg-zinc-200 md:hidden " />
							</div>
						))}
					</div>
				</div>
			) : null}
			<div className="mt-12">
				<Divider>{t('past')}</Divider>
				<div className="grid gap-x-6 md:grid-cols-3  md:gap-y-6">
					{pastExhibitions.length > 0 ? (
						pastExhibitions.map((exhibition) => (
							<div key={exhibition.slug}>
								<ExhibitionCard exhibition={exhibition} />
								<div className="z-10 my-6 h-[1px] w-full bg-zinc-200 md:hidden " />
							</div>
						))
					) : (
						<EmptyState text={t('no-past-exhibitions')} icon={<PhotoIcon />} />
					)}
				</div>
			</div>
		</div>
	)
}
