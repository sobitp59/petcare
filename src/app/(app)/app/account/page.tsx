import ContentBlock from "@/components/content-block";
import { H2 } from "@/components/headings";
import SignOutButton from "@/components/sign-out-button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const Account = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  return (
    <main className="px-4">
      <H2 className="my-10 text-white">Account</H2>
      <ContentBlock className="h-[700px] w-full flex justify-center items-center gap-5">
        <p className="text-xl font-medium">
          Logged in as{" "}
          <span className="text-zinc-500 italic">{session?.user?.email}</span>
        </p>
        <SignOutButton />
      </ContentBlock>
    </main>
  );
};

export default Account;
