import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'

import { Breadcrumbs } from '@/components/ui/breadcumbs'
import { makeMetaData } from '@/lib/utils'

export async function generateMetadata({ params }) {
	const { locale } = params

	const metaData = await makeMetaData(locale, {
		optionalTitleKey: 'contact',
		optionalUrl: `${process.env.NEXT_PUBLIC_URL}/${locale}/contact`,
	})

	return metaData
}

export default function Disclorure() {
	const t = useTranslations()

	const breadcrumbs = [{ name: t('home'), href: '/' }, { name: t('contact') }]

	return (
		<>
			{/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
			<div className=" mx-auto max-w-prose ">
				<div>
					<dl className="mt-10 space-y-4 text-base leading-7 text-zinc-600 dark:text-zinc-300">
						<div className="flex gap-x-4">
							<dt className="flex-none">
								<span className="sr-only">Telephone</span>
								<BuildingOffice2Icon
									className="h-7 w-6 text-zinc-400 dark:text-zinc-300"
									aria-hidden="true"
								/>
							</dt>
							<dd>
								Im Siek 21
								<br />
								31707 Heeßen
							</dd>
						</div>
						<div className="flex gap-x-4">
							<dt className="flex-none">
								<span className="sr-only">Telephone</span>
								<PhoneIcon
									className="h-7 w-6 text-zinc-400 dark:text-zinc-300"
									aria-hidden="true"
								/>
							</dt>
							<dd>
								<a
									className="hover:text-zinc-900 dark:hover:text-zinc-100"
									href="tel:+49 1772896682"
								>
									+49 1772896682
								</a>
							</dd>
						</div>
						<div className="flex gap-x-4">
							<dt className="flex-none">
								<span className="sr-only">Telephone</span>
								<EnvelopeIcon
									className="h-7 w-6 text-zinc-400 dark:text-zinc-300"
									aria-hidden="true"
								/>
							</dt>
							<dd>
								<a
									className="hover:text-zinc-900 dark:hover:text-zinc-100"
									href="mailto:hello@example.com"
								>
									info@elisabethwerpers.com
								</a>
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</>
	)
}
