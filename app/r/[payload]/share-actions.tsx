"use client";

import { useState } from "react";

export default function ShareActions({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    if (navigator.share) {
      await navigator.share({ title: "My Unhired Score", text, url: location.href });
      return;
    }
    await copy();
  }

  async function copy() {
    await navigator.clipboard.writeText(location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function shareOnX() {
    const url = new URL("https://twitter.com/intent/tweet");
    url.searchParams.set("text", text);
    url.searchParams.set("url", location.href);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function shareOnLinkedIn() {
    const url = new URL("https://www.linkedin.com/sharing/share-offsite/");
    url.searchParams.set("url", location.href);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="share-block">
      <button className="primary-button" onClick={share}>Share my score ↗</button>
      <div>
        <button onClick={shareOnX}>𝕏</button>
        <button onClick={shareOnLinkedIn}>in</button>
        <button onClick={copy}>{copied ? "✓" : "⧉"}</button>
      </div>
    </div>
  );
}
