"use client";
import { authClient } from "@/lib/auth-client";
import { Session } from "better-auth";
import { useEffect, useState } from "react";
import SessionCard from "./session-card";
import SessionPageNav from "./session-page-nav";
import PageLoader from "@/modules/preloader/views/ui/page-loader";
import { Skeleton } from "@/components/ui/skeleton";

export default function SessionsPageView() {
	const [sessions, setSessions] = useState<Session[] | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchSessions = async () => {
		setLoading(true);
		const actsessions = await authClient.listSessions();
		if (actsessions) {
			setSessions(actsessions?.data);
		}
		setLoading(false);
	};
	useEffect(() => {
		fetchSessions();
	}, []);

	return (
		<div>
			<SessionPageNav active={"sessions"} />
			<div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
				{sessions?.map((session) => (
					<SessionCard
						key={session.id}
						session={session}
						onRevokeCallback={fetchSessions}
					/>
				))}
				{loading &&
					Array.from({ length: 6 }).map(() => (
						<Skeleton className="h-[280px] w-full" />
					))}
			</div>
		</div>
	);
}
