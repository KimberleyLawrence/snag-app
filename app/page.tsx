import type { Metadata } from "next";
import Link from "next/link";
import Pagetitle from "./components/pagetitle";
import { faBriefcaseMedical, faCircleInfo, faEye, faFlag, faLocationDot, faPhone, faCalendarDays, IconDefinition, faTruckMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const metadata: Metadata = {
  title: "Bats Victoria",
  description: "Information for observation and rescuing within the Yarra Bend Flying Fox colony."
};




const NavLink = ({title, description, url, icon }: { title: string, description: string, url: string, icon: IconDefinition }) => {
  return (
  <>
          <li>
            <Link href={url} className="flex items-center p-3 text-base  rounded-lg bg-gray-900 group  font-semibold ">
              <FontAwesomeIcon icon={icon} className="text-gray-200 " size="2x" />
              <span className="flex-1 ms-3 whitespace-nowrap ">
                <h2 className="font-bold text-gray-200  text-xl" >{title}</h2>
                <p className="italic text-gray-200">{description}</p>
              </span>
            </Link>
          </li>
    </>
  )
}
const ImageRecuedBat = '/images/sausage_logo_art.png';





export default function Page() {
  return (
    <>

      <Pagetitle></Pagetitle>

      <div className="w-full p-4    sm:p-6   bg-red-100">
      <div className="grid  gap-8 ">
            <div className="relative sm:rounded-lg"></div>
            
              <img
                 src={ImageRecuedBat} 
                 alt="" className="flex-shrink-0  max-w-sm mx-auto " />

            
        </div>
        
<table className="text-center">
<tr className="border-pink-700">
          <button type="button" className=" p-2  text-lg font-bold text-gray-900 rounded-s-lg"> VIC </button>
          <button type="button" className="p-2  text-lg font-bold text-gray-900 rounded-s-lg"> NSW </button>
          <button type="button" className="p-2  text-lg font-bold text-gray-900 rounded-s-lg"> ACT</button>
          <button type="button" className="p-2  text-lg font-bold text-gray-900 rounded-s-lg"> QLD </button>
          <button type="button" className="p-2  text-lg font-bold text-gray-900 rounded-s-lg"> SA </button>
       </tr>      
<tr>
        
          <button type="button" className="p-2  text-lg font-bold text-gray-900 rounded-s-lg"> WA</button>
          <button type="button" className="p-2  text-lg font-bold text-gray-900 rounded-s-lg"> TAS </button>
          <button type="button" className="p-2  text-lg font-bold text-gray-900 rounded-s-lg"> NT </button>
          <button type="button" className="p-2 text-lg font-bold text-gray-900 rounded-s-lg"> NZ </button>

      </tr>  
        
        </table>
        

        </div>
     
      <div className="w-full p-4  sm:p-6   bg-black-100">
        <h2 className="  text-3xl font-extrabold m-3 text-center">Leaderboard</h2>
        <div className="grid  gap-8 ">
          
            <table className="w-full text-lg  ">
              <tr className="">
                  <h2 className="  text-3xl font-extrabold m-3 text-center">1ST</h2>
                <td className=" ">
                     <h2 className="  text-3xl font-extrabold m-3 text-center">Leaderboard</h2>
                </td>
            </tr>
              <tr className="">
                  <h2 className="  text-3xl font-extrabold m-3 text-center">2ND</h2>
                <td className=" ">
                     <h2 className="  text-3xl font-extrabold m-3 text-center">Leaderboard</h2>
                </td>
              </tr>
            </table>
        </div>
        </div>

        <div className="w-full p-4    sm:p-6   bg-red-100">
      <div className="grid  gap-8 ">
           
<h2 className="  text-2xl font-bold m-3 text-center">Vote Now</h2>
            
        </div>
        </div>





    </>
  );







  
}
