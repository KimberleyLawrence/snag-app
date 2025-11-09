import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "contact",
};

import Pagetitle from "@/components/pagetitle";
import {
  faPersonHiking,
  faTruckMedical,
  faUserGroup,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlackBoard, BlackBoardInput } from "@/components/blackboard";

const ImageHeroLogo = "/images/sausage_logo_art.png";

const RatingVote = ({ name }: { name: string }) => {
  return (
    <>
      <span className="star">★</span>
      <span className="star">★</span>
      <span className="star">★</span>
      <span className="star">★</span>
      <span className="star">★</span>
    </>
  );
};

export default function Page() {
  return (
    <>
      <div className="w-full p-4    sm:p-6   bg-red-100">
        <div className="grid  gap-8 ">
          <div className="relative sm:rounded-lg"></div>

          <img
            src={ImageHeroLogo}
            alt=""
            className="flex-shrink-0  max-w-sm mx-auto "
          />
        </div>

        <BlackBoard>
          <div className="grid grid-cols-1">
            {/* */}
            <div className="col">group</div>
            <div className="col mb-5">
              <select className="border-b-white">
                <option>Cricket Club</option>
              </select>
            </div>

            {/* */}
            <div className="col">snag</div>
            <div className="col mb-5">
              <RatingVote name="snag" />
            </div>

            {/* */}
            <div className="col">onions</div>
            <div className="col mb-5">
              <RatingVote name="snag" />
            </div>

            {/* */}
            <div className="col">speed</div>
            <div className="col mb-5">
              <RatingVote name="snag" />
            </div>

            <div className="col">
              <button className="button btn">Vote</button>
            </div>
          </div>
        </BlackBoard>
      </div>
    </>
  );
}
