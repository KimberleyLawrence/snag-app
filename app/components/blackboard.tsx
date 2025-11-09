import type { ReactNode } from "react";

export const BlackBoard = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div
        className="bg-black-100 text-3xl font-extrabold p-5 mb-5 text-center"
        style={{
          fontFamily: "Permanent Marker",
        }}
      >
        {children}
      </div>
    </>
  );
};
