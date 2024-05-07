import React from "react";

const AppFooter = () => {
  return (
    <footer className="mt-auto py-4 text-black/50 border-t-2 border-black/10">
      <small>
        &copy; Copyright to PetCare Private Limited. All Rights Reserved.{" "}
        {new Date().getFullYear()}
      </small>
    </footer>
  );
};

export default AppFooter;
