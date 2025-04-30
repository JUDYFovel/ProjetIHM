import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [mot_de_passe, setMotDePasse] = useState('');
  const [error, setError] = useState(''); // Nouvel état pour gérer l'erreur

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Réinitialiser l'erreur à chaque soumission
    try {
      const response = await axios.post('http://localhost:8081/api/users/login', {
        email,
        mot_de_passe,
      });
      onLogin(response.data.user);
      // Potentiellement réinitialiser les champs après la connexion
      setEmail('');
      setMotDePasse('');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Afficher le message d'erreur du serveur si disponible
      } else {
        setError('Email ou mot de passe incorrect'); // Message d'erreur générique
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Afficher l'erreur si elle existe */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={mot_de_passe}
        onChange={(e) => setMotDePasse(e.target.value)}
        required
      />
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default Login;