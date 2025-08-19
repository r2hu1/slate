"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const links = [
	{ label: "Account", href: "/settings" },
	{ label: "Subscriptions", href: "/settings/subscriptions" },
	{ label: "Preferences", href: "/settings/preferences" },
	{ label: "Sessions", href: "/settings/sessions" },
	{ label: "Danger", href: "/settings/danger" },
];

export default function SessionPageNav({ active }: { active: string }) {
	return (
		<div className="mb-10">
			<div className="flex gap-2 p-1.5 flex-wrap rounded-lg w-fit bg-card">
				{links.map((link) => (
					<Button
						variant={active == link.label.toLowerCase() ? "default" : "ghost"}
						key={link.label}
						asChild
						className="border-0"
						size="sm"
					>
						<Link href={link.href}>{link.label}</Link>
					</Button>
				))}
			</div>
		</div>
	);
}
