import type { ReactNode } from "react";

export const BlackBoard = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div
        className=" w-full h-full bg-black-100 text-3xl font-extrabold   text-center uppercase pt-3 pb-10 m-0"
        style={{
          fontFamily: "Mogra",
        }}
      >
        {children}
        
        {/* Extra padding to prevent foot from masking */}
        <div className="col-span-12 p-20"></div>
      </div>
    </>
  );
};
