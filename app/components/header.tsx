import Link from "next/link";
import { ReactNode } from "react";

const ImageHeroLogo = "/images/snagster.png";


export const Header = ({ children = null }: { children?: ReactNode }) => {
  return (
    <>

      <div className="w-full p-4  bg-red-100 ">
        <div className="grid  ">
          <div className="relative sm:rounded-lg"></div>
            <Link href="/">
              <img
                src={ImageHeroLogo}
                alt=""
                className="flex-shrink-0  max-w-sm mx-auto  "
              />
            </Link>
          </div>

          {children}
        </div>
    </>
  );
};