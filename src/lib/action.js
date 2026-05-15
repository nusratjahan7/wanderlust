'use server'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addDestination = async (formData) => {
    'use server'
    const destination = Object.fromEntries(formData.entries());

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(destination)
    })
    const data = await res.json();

    if (data) {
        revalidatePath('/add-destinations');
        redirect('/destinations')
    }

}

export const updateDestination = async (id, formData) => {

    const updateDestination = Object.fromEntries(formData.entries());

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(updateDestination)
    })
    const data = await res.json();

    if (data) {
        revalidatePath(`/destinations/${id}`);
        redirect(`/destinations/${id}`)
    }

}

