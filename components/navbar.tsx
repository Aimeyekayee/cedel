"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <nav
      className=" bg-white shadow-sm dark:bg-gray-950/90"
      style={{
        visibility: pathName.includes("/cedel") ? "visible" : "hidden",
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link href="#" className="flex items-center" prefetch={false}>
            <span className="font-bold">CEDEL</span>
          </Link>

          <div className="flex items-center gap-4">
            {status === "unauthenticated" ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/login")}
              >
                Sign in
              </Button>
            ) : (
              <Button size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
