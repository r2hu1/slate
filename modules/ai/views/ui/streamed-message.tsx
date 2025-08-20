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
		10,
	);

	return (
		<div key={index} className="prose prose-sm max-w-none dark:prose-invert">
			<MarkdownContent id={String(index)} content={text} />
		</div>
	);
}
