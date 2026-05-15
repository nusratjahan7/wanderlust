export const getDestinationById = async (id) => {
    const res = await fetch(`http://localhost:5000/destination/${id}`, {
        headers: {
            authorization: "Logged in"
        },
        cache: 'no-store'
    });
    const data = await res.json();
    return data;
}