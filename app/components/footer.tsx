import { ReactNode } from "react";


export const Footer = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="w-full p-4 sm:p-6 bg-red-100">
        <div className="grid  gap-8 ">
        {children}
        </div>
      </div>
    </>
  );
};