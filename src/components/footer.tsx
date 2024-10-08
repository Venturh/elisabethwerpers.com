'use client'

import { Link } from 'next-intl'

import { NavItem } from '@/types/nav'
import { LanguageSelect } from './language-select'
import { Logo } from './logo'

type Props = {
	locale: string
	languageLocale: string
	footer: {
		[key: string]: NavItem[]
	}
}

export function Footer({ footer, locale, languageLocale }: Props) {
	const className =
		'text-sm leading-6 text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 '
	const footerItems = Object.entries(footer).map(([title, values]) => ({
		title,
		content: values.map(({ href, name, external }) =>
			external ? (
				<a className={className} href={href} key={name} rel="noopener noreferrer" target="_blank">
					{name}
				</a>
			) : (
				<Link locale={locale} className={className} href={href} key={name}>
					{name}
				</Link>
			)
		),
	}))
	return (
		<div className="flex w-full flex-col space-y-6 border-t border-zinc-900/10 pt-6 text-base dark:border-zinc-700 dark:bg-zinc-900">
			<div className="w-full py-3">
				<div className="grid grid-cols-2 gap-8 pb-4 md:grid-cols-4">
					{footerItems.map(({ title, content }) => (
						<div className="space-y-2" key={title}>
							<span className="text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
								{title}
							</span>
							<div className="flex w-min flex-col space-y-3 ">{content.map((c) => c)}</div>
						</div>
					))}

					<div className="space-y-2">
						<h3 className="text-sm font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
							{languageLocale}
						</h3>
						<LanguageSelect locale={locale} />
					</div>
				</div>

				<div className="flex items-center justify-between border-t py-6 text-sm dark:border-zinc-700">
					<span className="text-zinc-700 dark:text-zinc-300">© {new Date().getFullYear()}</span>
					<Logo />
				</div>
			</div>
		</div>
	)
}
