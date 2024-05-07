import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex flex-col justify-between items-center mt-60">
        <h1 className="text-6xl md:text-8xl max-w-6xl font-bold lowercase text-center">
          Pawtential Unleashed
        </h1>
        <p className="text-xl mt-2 px-6">
          Petcare helps you to keep track pets under your care.{" "}
          <span className="font-medium">
            Get a lifetime membership at just 49$.
          </span>
        </p>
        <section className="flex gap-5 mt-5">
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button variant={"secondary"}>
            <Link href="/login">Login</Link>
          </Button>
        </section>
        <Image
          src={`https://images.unsplash.com/photo-1433162653888-a571db5ccccf?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          alt="Pet care landing page image preview"
          width={1400}
          height={200}
          className="rounded-2xl border-2 border-zinc-900/10 p-1 mt-40"
        />
      </div>
    </main>
  );
}
