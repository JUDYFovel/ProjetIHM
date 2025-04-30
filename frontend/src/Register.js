import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [mot_de_passe, setMotDePasse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/users/register', {
        nom,
        prenom,
        email,
        mot_de_passe,
      });
      alert('Inscription réussie');
    } catch (error) {
      alert('Erreur lors de l\'inscription');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
      <input type="text" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mot de passe" value={mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} required />
      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default Register;
