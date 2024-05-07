import AuthForm from "@/components/auth-form";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl text-center font-semibold">Log In</h2>
      <AuthForm type="LOGIN" />
      <section className="flex items-center gap-2">
        <p>Don't have account yet? </p>
        <Link href="/signup" className="font-medium hover:underline">
          Sign up
        </Link>
      </section>
    </div>
  );
};

export default Login;
