import AuthForm from "@/components/auth-form";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl text-center font-semibold">Sign Up</h2>
      <AuthForm type="SIGNUP" />
      <p>GUEST LOGIN | email : guest@gmail.com | password : guest </p>
      <section className="flex items-center gap-2">
        <p>Already have an account? </p>
        <Link href="/login" className="font-medium hover:underline">
          Sign In
        </Link>
      </section>
    </div>
  );
};

export default SignUp;
