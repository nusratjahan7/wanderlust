export const getDestinationById = async (id) => {
    const res = await fetch(`http://localhost:5000/destination/${id}`, {
        cache: 'no-store'
    });
    const data = await res.json();
    return data;
}