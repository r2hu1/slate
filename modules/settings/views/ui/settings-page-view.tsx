"use client";

import { useAuthState } from "@/modules/auth/providers/auth-context";
import { User } from "better-auth";
import { useEffect, useState } from "react";
import SessionPageNav from "./session-page-nav";

export default function SettingsPageView() {
	const { data, isPending } = useAuthState();

	return (
		<div>
			<SessionPageNav active={"account"} />
			<div className="flex text-white items-center">
				<div>
					<img className="rounded-3xl h-20 w-20" src={data?.user?.image} />
					<h1>{data?.user?.name}</h1>
					<h1>{data?.user?.name}</h1>
				</div>
			</div>
		</div>
	);
}
