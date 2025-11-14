import type { ReactNode } from "react";

export const BlackBoard = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div
        className=" w-full bg-black-100 text-3xl font-extrabold  p-2 md:p-10 text-center"
        style={{
          fontFamily: "Mogra",
        }}
      >
        {children}
      </div>
    </>
  );
};
