import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyBookings = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;

    const res = await fetch(`http://localhost:5000/booking/${user.id}`)
    const data = await res.json();
    console.log(data)

    return (
        <div className="min-h-screen w-11/12 mx-auto">
            bbok
        </div>
    );
};

export default MyBookings;