"use client";
import HeaderTop from "@/components/header";
import LicenseCard from "@/components/license-card";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { LicenseStore } from "@/store/license.store";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session?.user.user_uuid);
  const setLicenseData = LicenseStore((state) => state.setLicenseData);
  const setLicenseType = LicenseStore((state) => state.setLicenseType);
  const license_data = LicenseStore((state) => state.license_data);
  const license_type = LicenseStore((state) => state.license_type);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else {
      fetchLicenseData(session?.user.user_uuid);
      fetchLicenseType();
    }
  }, [router, status, session]);

  const fetchLicenseData = async (id: string | undefined) => {
    try {
      const res = await axios.post(`/api/license_data/${id}`);
      setLicenseData(res.data);
    } catch (error) {
      console.error("Failed to delete the post", error);
    }
  };

  const fetchLicenseType = async () => {
    try {
      const res = await axios.get(`/api/license_type`);
      setLicenseType(res.data);
    } catch (error) {
      console.error("Failed to delete the post", error);
    }
  };

  return (
    <main className="flex-1">
      <div className="container relative">
        <HeaderTop />
        <LicenseCard license_data={license_data} license_type={license_type} />
      </div>
    </main>
  );
}
