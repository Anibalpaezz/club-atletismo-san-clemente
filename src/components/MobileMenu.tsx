import { useState } from 'react';

type NavItem = { href: string; label: string };

export default function MobileMenu({
	items,
	ctaHref,
	ctaLabel,
}: {
	items: NavItem[];
	ctaHref: string;
	ctaLabel: string;
}) {
	const [open, setOpen] = useState(false);

	return (
		<div className="md:hidden">
			<button
				type="button"
				aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
				aria-expanded={open}
				onClick={() => setOpen((v) => !v)}
				className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10"
			>
				{open ? (
					<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
						<path d="M18 6 6 18M6 6l12 12" />
					</svg>
				) : (
					<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
						<path d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				)}
			</button>

			{open && (
				<div className="absolute inset-x-0 top-full z-50 border-t border-white/10 bg-nocturno shadow-xl md:hidden">
					<nav className="mx-auto flex max-w-6xl flex-col px-4 py-4" aria-label="Menú móvil">
						{items.map((item) => (
							<a
								key={item.href}
								href={item.href}
								onClick={() => setOpen(false)}
								className="rounded-md px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white"
							>
								{item.label}
							</a>
						))}
						<a
							href={ctaHref}
							onClick={() => setOpen(false)}
							className="mt-3 inline-flex items-center justify-center rounded-md bg-albero px-4 py-2.5 text-sm font-semibold text-nocturno hover:bg-albero-100"
						>
							{ctaLabel}
						</a>
					</nav>
				</div>
			)}
		</div>
	);
}
