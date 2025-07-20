export async function fetchAnimeList(search = '', page = 1) {
  const query = `
    query ($page: Int${search ? ', $search: String' : ''}) {
      Page(page: $page, perPage: 10) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
        }
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
          nextAiringEpisode {
            episode
            airingAt
          }
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
    const json = await res.json();
    return {
      data: json.data,
      hasNextPage: json.data?.Page?.pageInfo?.hasNextPage ?? false,
      error: null
    };
  } catch (err) {
    console.error("API Error:", err);
    return { error: true };
  }
}

export async function fetchAnimeDetails(id) {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          english
          romaji
        }
        description(asHtml: false)
        coverImage {
          large
        }
        bannerImage
        averageScore
        episodes
        status
        genres
        studios {
          nodes {
            name
          }
        }
        nextAiringEpisode {
          episode
          airingAt
        }
      }
    }
  `;

  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { id: parseInt(id) } })
    });
    const json = await res.json();
    return json.data?.Media || null;
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
}