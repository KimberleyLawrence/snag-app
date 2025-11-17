import { ReactNode } from "react";


export const Footer = ({ children }: { children: ReactNode }) => {
  return (
    <>
     <div className="w-full grid grid-cols-6 fixed bottom-0">
        <div className="col-span-6 md:col-span-4">
          <div className="p-10 bg-red-100">
            <div className="grid">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};