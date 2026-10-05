import { getPublishedPosts } from "@/lib/content";
import { FooterView } from "./FooterView";

export async function Footer() {
  return <FooterView posts={await getPublishedPosts(2)} />;
}
