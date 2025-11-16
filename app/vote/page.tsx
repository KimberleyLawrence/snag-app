import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "contact",
};


import { BlackBoard } from "@/components/blackboard";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { processVote } from "./actions";


interface Operator {
  id: string;
  name: string;
}

const operators: Operator[] = [
  { id: 'sport_cricket', name: 'Sport Cricket' },
  { id: 'sport_football', name: 'Netball Club' },
  { id: 'sport_netball', name: 'Kindergarten' },
  { id: 'mens_shed', name: 'Cricket Club' },
  { id: 'primary_school', name: 'Netball Club' },
];



interface Location {
  id: string;
  name: string;
}

const locations: Location[] = [
  { id: 'act', name: 'act' },
  { id: 'nsw', name: 'nsw' },
  { id: 'nt', name: 'nt' },
  { id: 'qld', name: 'qld' },
  { id: 'sa', name: 'sa' },
  { id: 'tas', name: 'tas' },
  { id: 'vic', name: 'vic' },
  { id: 'wa', name: 'wa' },
];


const RatingVote = ({ name, display_name }: { name: string, display_name: string }) => {
	const input_name = name + "_rating";

  return (
    <>
		<div className="col">
			<label className="control-label uppercase">{display_name}</label>
		</div>
		<div className="col star-rating">
			<input id={input_name + "-5" } type="radio" name={input_name} value={5} />
			<label htmlFor={input_name + "-5"}  title="5 stars">★</label>
			&nbsp;

			<input id={input_name + "-4" } type="radio" name={input_name} value={4} />
			<label htmlFor={input_name + "-4"}  title="4 stars">★</label>
			&nbsp;

			<input id={input_name + "-3" } type="radio" name={input_name} value={3} />
			<label htmlFor={input_name + "-3"}  title="3 stars">★</label>
			&nbsp;

			<input id={input_name + "-2" } type="radio" name={input_name} value={2} />
			<label htmlFor={input_name + "-2"}  title="2 stars">★</label>
			&nbsp;

			<input id={input_name + "-1" } type="radio" name={input_name} value={1} />
			<label htmlFor={input_name + "-1"}  title="1 star">★</label>
			&nbsp;
		</div>
    </>
  );
};

export default function Page() {
  return (
    <>
		  <Header>
			  <h2 className="  text-3xl font-bold text-center p-3 ">
           
        </h2>
	 </Header>
		  <BlackBoard>
			  
			  <h2 className="   font-bold text-center  p-3 ">
      VOTE
        </h2>
			<form action={processVote}>
				<div className="grid grid-cols-1 md:grid-cols-2 pt-4">

					<div className="col">
						<label className="control-label uppercase">location</label>
					</div>

					<div className="col">
						<select
						name="group_location"
						id="group_location"
						className="block w-full px-3 py-2.5 bg-black-100 mb-4 flex items-center"
						>
						{locations.map((location, index) => (
							<option key={index} value={location.id}>
							{location.name}
							</option>
						))}
						</select>
					</div>

					<div className="col">
						<label className="control-label uppercase">bbq group type</label>
					</div>
						<div className="col">
							<select
							name="group_name"
							id="group_name"
							className="block w-full px-3 py-2.5 bg-black-100 mb-4 items-center"
							>
							{operators.map((operator, index) => (
								<option key={index} value={operator.id} className="uppercase">
								{operator.name}
								</option>
							))}
							</select>
						</div>
		
					<RatingVote name="snag" display_name="snag" />
					<RatingVote name="onion" display_name="onion" />
					<RatingVote name="bread" display_name="bread freshness" />
					<RatingVote name="sauce" display_name="sauce choices" />

									
					<div className="col mb-5">
						<label className="control-label uppercase ">onion placement</label>
					</div>
					<div className="col">
							
								
					<div className="mb-5">
						<input name="onion_top" id="onion-top" type="radio" value="true" className="w-7 h-7 border-default-medium rounded-full border border-default "/>
						<label htmlFor="onion-top" className=" me-4 select-none ms-2  font-medium text-heading uppercase">Above</label>
							
						<input name="onion_top" id="inline-2-radio" type="radio" value="false" className="w-7 h-7 border-default-medium rounded-full border border-default "/>
						<label htmlFor="inline-2-radio" className="select-none ms-2 font-medium text-heading uppercase me-4">Below</label>
					</div>
				</div>

				<div className="col md:col-span-2 mb-5">

					<div className="bg-amber-400 rounded p-4 ">
						<button className="button btn font-black-100" type="submit">Vote</button>
					</div>
				</div>
			</div>
		</form>
		</BlackBoard>
		<Footer>Some extra information</Footer>

    </>
  );
}
