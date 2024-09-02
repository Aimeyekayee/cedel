"use client";
import { useRouter } from "next/navigation"; // Use useRouter instead of next/navigation
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      const redirectTimer = setTimeout(() => {
        router.push("/login");
      }, 3000); // Redirect after 3 seconds

      return () => clearTimeout(redirectTimer);
    } else if (status === "authenticated" && session?.user?.user_uuid) {
      const redirectTimer = setTimeout(() => {
        router.push("/cedel");
      }, 3000); // Redirect after 3 seconds

      return () => clearTimeout(redirectTimer);
    }
  }, [router, session, status]);

  return (
    <main className="flex-1">
      <div className="container relative">
        <div className="flex flex-col items-center justify-center mt-72">
          <h1 className="text-4xl font-bold  mb-8">Welcome to CEDEL!</h1>
          <div className="flex flex-col items-center ">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="mt-4">
              {status === "unauthenticated"
                ? "Redirecting to login..."
                : `Authenticated. Hello ${session?.user?.name}, redirecting to CEDEL...`}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
