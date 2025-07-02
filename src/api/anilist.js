export async function fetchAnimeList(search = '', page = 1) {
  const query = `
    query ($page: Int${search ? ', $search: String' : ''}) {
      Page(page: $page, perPage: 10) {
        media(
          type: ANIME, 
          ${search ? 'search: $search,' : ''}
          sort: ${search ? 'SEARCH_MATCH' : 'TRENDING_DESC'},
          isAdult: false
        ) {
          id
          title { english romaji }
          coverImage { large }
          averageScore
          episodes
          status
        }
      }
    }
  `;

  const variables = { page };
  if (search) variables.search = search;

  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
    });
    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    return { error: true };
  }
}