export const getDestinationById = async (id, token) => {
    const res = await fetch(`http://localhost:5000/destination/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        },
        cache: 'no-store'
    });
    const data = await res.json();
    return data;
}