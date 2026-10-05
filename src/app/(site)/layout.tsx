import { CursorFollower } from "@/components/CursorFollower";
import { PageLoader } from "@/components/PageLoader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageLoader />
      <CursorFollower />
      {children}
    </>
  );
}
