"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { MAX_FREE_DOCUMENTS, MAX_FREE_FOLDERS } from "@/modules/constants";
import UpgradeButton from "@/modules/premium/views/ui/upgrade-button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { is } from "drizzle-orm";
import { Apple, CreditCard, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Useage() {
	const trpc = useTRPC();
	const { data, isLoading } = useQuery(
		trpc.premium.getActiveSubscription.queryOptions(),
	);
	const { data: useage, isLoading: useageLoading } = useQuery(
		trpc.premium.getFreeUsage.queryOptions(),
	);

	if (isLoading && useageLoading) {
		return <Skeleton className="w-full h-36" />;
	}
	if (data && !isLoading) {
		return null;
	}
	return (
		<div className="p-2 mb-2 px-3 rounded-lg space-y-2 border bg-background">
			<h1 className="font-medium text-base flex items-center gap-2">
				<Rocket className="!h-4 !w-4" /> Free Trial
			</h1>
			<p className="text-sm text-foreground/80 -mt-1.5">
				Upgrade or self-host your own instance.
			</p>
			{!useageLoading ? (
				<div className="grid">
					<div className="flex items-center gap-1.5">
						<Progress
							value={
								(((useage?.foldersCount ?? 0) + (useage?.documentsCount ?? 0)) /
									(MAX_FREE_FOLDERS + MAX_FREE_DOCUMENTS)) *
								100
							}
						/>
						<span className="text-xs text-foreground/80">
							{(((useage?.foldersCount ?? 0) + (useage?.documentsCount ?? 0)) /
								(MAX_FREE_FOLDERS + MAX_FREE_DOCUMENTS)) *
								100}
							%
						</span>
					</div>
				</div>
			) : (
				<>
					<Skeleton className="w-full h-2.5" />
				</>
			)}
			<UpgradeButton className="w-full mt-1" size="sm">
				Upgrade <CreditCard className="w-4 h-4" />
			</UpgradeButton>
			<Button size="sm" variant="outline" asChild className="w-full">
				<Link
					target="_blank"
					href="https://github.com/r2hu1/slate/tree/without-payments-for-selfhost"
				>
					Self Host <Sparkles className="!h-3.5 !w-3.5" />
				</Link>
			</Button>
		</div>
	);
}
