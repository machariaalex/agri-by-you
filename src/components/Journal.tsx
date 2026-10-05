import { getPublishedPosts } from "@/lib/content";
import { JournalView } from "./JournalView";

export async function Journal() {
  return <JournalView posts={await getPublishedPosts()} />;
}
