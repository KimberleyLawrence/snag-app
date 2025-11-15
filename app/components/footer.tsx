import { ReactNode } from "react";


export const Footer = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="  sm:p-6 bg-red-100 sticky bottom-0   ">
        <div className="grid  gap-4 ">
        {children}
        </div>
      </div>




    </>
  );
};