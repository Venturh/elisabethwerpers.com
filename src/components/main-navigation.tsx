'use client'

import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import * as Dialog from '@radix-ui/react-dialog'
import { Link } from 'next-intl'
import { usePathname } from 'next-intl/client'

import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'
import { NavItem } from '@/types/nav'
import { LanguageSelect } from './language-select'

type Props = {
	navigation: NavItem[]
	locale: string
}

export function MainNavigation({ navigation, locale }: Props) {
	const pathName = usePathname()
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	function isActive(href: string) {
		return pathName === href
	}

	return (
		<div className="border-b border-neutral-900/10 dark:border-neutral-800">
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8"
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<Logo />
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-700"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<div className="hidden lg:flex lg:gap-x-4">
					{navigation.map((item) => (
						<Link
							locale={locale}
							key={item.name}
							href={item.href}
							className={cn(
								'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium',
								isActive(item.href)
									? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
									: 'text-neutral-900 hover:bg-neutral-50 hover:text-neutral-900  dark:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100'
							)}
						>
							{item.name}
						</Link>
					))}
					<LanguageSelect locale={locale} />
				</div>
			</nav>
			<Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
				<Dialog.Content className="absolute inset-x-0 top-0 z-50 origin-top px-2 transition md:hidden">
					<div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/5 dark:bg-neutral-800">
						<div className="flex items-center justify-between border-b  px-4 py-3 ">
							<Logo />
							<button
								type="button"
								className="-m-2.5 rounded-md p-2.5 text-neutral-700"
								onClick={() => setMobileMenuOpen(false)}
							>
								<span className="sr-only">Close menu</span>
								<XMarkIcon className="h-6 w-6" aria-hidden="true" />
							</button>
						</div>
						<div className="mt-2 flow-root">
							<div className="-my-6 divide-y divide-neutral-500/10">
								<div className="space-y-2 py-6">
									{navigation.map((item) => (
										<Link
											onClick={() => setMobileMenuOpen(false)}
											key={item.name}
											href={item.href}
											className={cn(
												'block rounded-md px-3 py-2 text-sm font-medium',
												isActive(item.href)
													? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100'
													: 'text-neutral-900 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-100'
											)}
										>
											{item.name}
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	)
}
