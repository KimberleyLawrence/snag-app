import type { ReactNode } from "react";

export const BlackBoard = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div
        className=" w-full bg-black-100 text-3xl font-extrabold   text-center uppercase pt-3"
        style={{
          fontFamily: "Mogra",
        }}
      >
        {children}
      </div>
    </>
  );
};
