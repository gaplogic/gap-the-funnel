export async function query(queryString: string) {
  const req = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `query {
        ${queryString}
      }`
    })
  });

  const { data } = await req.json();
  if (!data) return "Error fetching data";
  return data;
}
