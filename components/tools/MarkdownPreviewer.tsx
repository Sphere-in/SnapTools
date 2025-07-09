"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState("# Hello, SnapTools!");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <textarea
        className="w-full h-96 p-2 border rounded bg-gray-100 dark:bg-gray-800 text-sm"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Write markdown here..."
      />
      <div className="prose dark:prose-invert p-2 border rounded overflow-y-auto h-96">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
