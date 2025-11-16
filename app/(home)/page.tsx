import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "home",
};


import { BlackBoard } from "@/components/blackboard";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Highscore } from "./highscore";
import Link from "next/link";

const LocationLink = ({ name }: { name: string }) => {
  return (
    <>
      <button
        type="button"
        className=" px-1 p-2  text-lg font-bold text-gray-900 rounded-s-lg"
      >
        {name}
      </button>
    </>
  );
};



export default function Page() {

const location: string = "vic";
  return (
	    <>
		<Header />
		<BlackBoard>        
			<Highscore location={location} />
			<div className="w-full p-2 sm:p-6">
          		<div className="grid  ">
            		<p className="  text-2xl font-bold text-center">
             		 {location} LIKES THEIR ONIONS:</p>
           			 <p className="  text-2xl font-bold text-center">
              	BELOW
            		</p>
         	 </div>
		  </div>
		</BlackBoard>
	    <Footer>
			<div className="col">
				<Link href="/vote">
					<h2 className="text-2xl font-bold  text-center mb-2 uppercase">
						vote now
					</h2>
				</Link>

				<div className="text-center  ">
					<hr className="  border-red-400 border-0.5"></hr>
					<LocationLink name="VIC" />
					<LocationLink name="NSW" />
					<LocationLink name="ACT" />
					<LocationLink name="QLD" />
					<LocationLink name="SA" />
					<LocationLink name="WA" />
					<LocationLink name="TAS" />
					<LocationLink name="NT" />
					<LocationLink name="NZ" />
				</div>
			</div>   
		</Footer>
    </>

  )
}
