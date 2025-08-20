"use client";

import { MarkdownContent } from "@/components/ui/markdown-content";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useStreamText } from "@/hooks/use-stream-text";

export function StreamedMessage({
	index,
	content,
}: {
	index: number;
	content: string;
}) {
	const safeContent = content ?? "";
	const text = useStreamText(
		safeContent.replace(/^```mdx\s*\r?\n/, "").replace(/```$/, ""),
	);

	return (
		<div
			key={index}
			className="prose prose-sm max-w-none dark:prose-invert relative group"
		>
			<MarkdownContent id={String(index)} content={text} />
			<div className="flex gap-2.5 items-center justify-start">
				<Button
					size="icon"
					onClick={() => {
						navigator.clipboard.writeText(content);
					}}
					variant="ghost"
					className="h-8 w-8"
				>
					<Copy className="!h-3.5 !w-3.5" />
				</Button>
			</div>
		</div>
	);
}
