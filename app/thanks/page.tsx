import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "thanks",
};


import { BlackBoard } from "@/components/blackboard";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
	<Header />
	<BlackBoard>
		Thanks for voting.		  
	</BlackBoard>
	<Footer>
		Some extra information
	</Footer>
    </>
  );
}
