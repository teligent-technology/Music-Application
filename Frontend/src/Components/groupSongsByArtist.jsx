// src/utils/groupSongsByArtist.js
export const groupSongsByArtist = (songs) => {
  const artistMap = new Map();

  songs.forEach(song => {
    const artist = song.artist.trim();
    if (!artistMap.has(artist)) {
      artistMap.set(artist, []);
    }
    artistMap.get(artist).push(song);
  });

  return Array.from(artistMap.entries()); // [ [artist, [songs]] ]
};
