import React from 'react'
import AnimeCard from '../components/AnimeCard.jsx'

const mockAnime = [
  {
    id: 1,
    title: { english: "Attack on Titan", romaji: "Shingeki no Kyojin" },
    coverImage: { large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1-CXtrrkMpJ8Zq.png" },
    averageScore: 86
  },
  // Add 4+ more mock items...
  {
    id: 2,
    title: { english: "Demon Slayer", romaji: "Kimetsu no Yaiba" },
    coverImage: { large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx2-4b5f8c7d3e6a.png" },
    averageScore: 90
  },
  {
    id: 3,
    title: { english: "Jujutsu Kaisen", romaji: "Jujutsu Kaisen" },
    coverImage: { large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx3-5c8f8d7e6a9b.png" },
    averageScore: 88
  },
  {
    id: 4,
    title: { english: "My Hero Academia", romaji: "Boku no Hero Academia" },
    coverImage: { large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx4-6d8f8e7f6a9c.png" },
    averageScore: 85
  },
  {
    id: 5,
    title: { english: "One Piece", romaji: "One Piece" },
    coverImage: { large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5-7e8f8f8g6a9d.png" },
    averageScore: 92
  },
  {
    id: 6,
    title: { english: "Spy x Family", romaji: "Spy x Family" },
    coverImage: { large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx6-8f8f8g7h6a9e.png" },
    averageScore: 89
  }
];

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Trending Now</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {mockAnime.map(anime => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  )
}

export default Home