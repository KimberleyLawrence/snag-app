import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "contact",
};


import { BlackBoard } from "@/components/blackboard";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const ImageHeroLogo = "/images/sausage_logo_art.png";

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
	    <Header />
        <BlackBoard>
			<form>
				<div className="grid grid-cols-1 md:grid-cols-2">

					<div className="col">
						<label className="control-label uppercase">location</label>
					</div>

					<div className="col">
						<select id="group_location" className="block w-full px-3 py-2.5  bg-black-100 mb-4 flex items-center">
							<option value="VIC">VIC</option>
							<option value="NSW">NSW</option>
							<option value="SA">SA</option>
						</select>
					</div>

					<div className="col">
						<label className="control-label uppercase">bbq group type</label>
					</div>
					<div className="col">
						<select id="group_name" className="block w-full px-3 py-2.5  bg-black-100 mb-4 items-center">
							<option value="VIC">CRICKET CLUB</option>
							<option value="NSW">NETBALL CLUB</option>
							<option value="SA">KINDERGARTEN</option>
						</select>
					</div>
		
					<RatingVote name="snag" display_name="snag" />
					<RatingVote name="onion" display_name="onion" />
					<RatingVote name="bread" display_name="bread freshness" />
					<RatingVote name="sauce" display_name="sauce choices" />

									
					<div className="col">
						<label className="control-label uppercase">onion placement</label>
					</div>
					<div className="col">
							
								
					<div className="me-4">
						<input id="onion-top" type="radio" value="" name="inline-radio-group" className="w-7 h-7 border-default-medium rounded-full border border-default "/>
						<label htmlFor="onion-top" className="select-none ms-2  font-medium text-heading">TOP</label>
					</div>
					<div className="me-4">
						<input id="inline-2-radio" type="radio" value="" name="inline-radio-group" className="w-7 h-7 border-default-medium rounded-full border border-default "/>
						<label htmlFor="inline-2-radio" className="select-none ms-2 font-medium text-heading">BOTTOM</label>
					</div>
				</div>

				<div className="col md:col-span-2">

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
