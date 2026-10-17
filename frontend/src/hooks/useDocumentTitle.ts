import { useEffect } from "react";
import { profile } from "@/data/profile";

// Sets the browser tab title for the current page, e.g. "Diraya · Ahmed Elgaml",
// and puts the previous title back when the page closes.
// It's what shows in the tab, in browser history, and when someone bookmarks the page.
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} · ${profile.name}`;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
