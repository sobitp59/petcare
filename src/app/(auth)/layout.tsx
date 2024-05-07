import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-5">
      <h1 className="text-6xl border-2 border-zinc-300 shadow-sm rounded-md bg-black/10 p-2">
        🐇
      </h1>
      {children}
    </div>
  );
};

export default AuthLayout;
