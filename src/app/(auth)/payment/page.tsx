"use client";

import { stripeCheckout } from "@/app/actions/paymet.action";
import { H2 } from "@/components/headings";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

const Payment = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [isPending, startTransition] = useTransition();
  const { data: session, update, status } = useSession();
  const router = useRouter();

  return (
    <main className="flex flex-col justify-center items-center space-y-10">
      <H2>PetCare access requires payment</H2>
      {!searchParams?.success && (
        <Button
          disabled={isPending}
          className="py-6"
          onClick={() => {
            startTransition(async () => {
              await stripeCheckout();
            });
          }}
        >
          Buy the lifetime access at just {"    "}
          <span className="text-2xl font-bold ml-2 text-yellow-400">$499</span>
        </Button>
      )}

      {searchParams?.success && (
        <Button
          disabled={status === "loading" || session?.user.hasLifetimeAccess}
          className="py-6"
          onClick={async () => {
            await update(true);
            router.push("/app/dashboard");
          }}
        >
          Access PetCare
        </Button>
      )}

      {searchParams?.success && (
        <p className="text-green-700 text-xl font-medium">
          Payment Successful. You have lifetime access of PetCare.
        </p>
      )}

      {searchParams?.cancelled && (
        <p className="text-red-700 text-xl font-medium">
          Payment Cancelled. Please try again to get the lifetime access of
          PetCare.
        </p>
      )}
    </main>
  );
};

export default Payment;
