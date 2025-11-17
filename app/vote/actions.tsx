'use client'
import { redirect } from 'next/navigation'

export type Vote = {
    group_name: string;
    group_location: string;
    rating_snag: number;
    rating_onion: number;
    rating_bread: number;
    rating_sauce: number;
    onions_top: boolean;
}


 
export async function processVote(formData: FormData) {
    console.log("formData", formData);

    const userVote: Vote = {
        group_name: formData.get("group_name") as unknown as string,
        group_location: formData.get("group_location") as unknown as string,
        rating_snag: formData.get("rating_snag") as unknown as number,
        rating_onion: formData.get("rating_onion") as unknown as number,
        rating_bread: formData.get("rating_bread") as unknown as number,
        rating_sauce: formData.get("rating_sauce") as unknown as number,
        onions_top: formData.get("onions_top") as unknown as boolean,
    }

    const submitData = async (userVote: Vote) => {
    
        let response = await fetch("http://10.1.1.2:8090/api/vote", {
            method: "POST",
            body: JSON.stringify(userVote),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        response = await response.json()
        console.log(response)
    }

    submitData(userVote);

    
    redirect(`/thanks`)
}