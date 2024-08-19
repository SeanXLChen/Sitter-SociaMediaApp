'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "../components/Header";
import NotificationsFeed from "../components/NotificationsFeed";

const Notifications = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header label="Notifications" showBackArrow />
      {session && <NotificationsFeed />}
    </>
  );
}

export default Notifications;