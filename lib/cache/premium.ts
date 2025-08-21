import { createTRPCContext } from "@/trpc/init";
import { appRouter } from "@/trpc/routers/_app";
import { TTLCache } from "./ttl";

const premiumCache = new TTLCache<string, boolean>(5 * 60 * 1000);

export async function isSubscribed() {
	const cached = premiumCache.get("premium");
	if (cached !== undefined) return cached;

	const caller = appRouter.createCaller(await createTRPCContext());
	const currSub = await caller.premium.getActiveSubscription();
	const isPremium = !!currSub;

	premiumCache.set("premium", isPremium);
	return isPremium;
}
