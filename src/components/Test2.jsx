import React, { useState, useEffect } from 'react';
import db from '../Firebase/config';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';


const FirebaseCRUD = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const moviesCollectionRef = collection(db, 'movies');

  // Fetch all movies
  const fetchMovies = async () => {
    const data = await getDocs(moviesCollectionRef);
    setMovies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Add a new movie
  const addMovie = async () => {
    await addDoc(moviesCollectionRef, { title, director });
    fetchMovies(); // Refresh the list after adding a new movie
    setTitle('');
    setDirector('');
  };

  // Update an existing movie
  const updateMovie = async () => {
    const movieDoc = doc(db, 'movies', selectedMovieId);
    await updateDoc(movieDoc, { title, director });
    fetchMovies(); // Refresh the list after updating a movie
    setTitle('');
    setDirector('');
    setSelectedMovieId(null);
  };

  // Delete a movie
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    await deleteDoc(movieDoc);
    fetchMovies(); // Refresh the list after deleting a movie
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Firebase CRUD Application</h1>
      <div>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
        {selectedMovieId ? (
          <button onClick={updateMovie}>Update Movie</button>
        ) : (
          <button onClick={addMovie}>Add Movie</button>
        )}
      </div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> by {movie.director}
            <button onClick={() => {
              setSelectedMovieId(movie.id);
              setTitle(movie.title);
              setDirector(movie.director);
            }}>Edit</button>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FirebaseCRUD;
