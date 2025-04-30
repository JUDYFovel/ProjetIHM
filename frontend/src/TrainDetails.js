import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TrainDetails({ trainId, userId }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/trains/${trainId}/places`)
      .then((response) => setPlaces(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des places', error));
  }, [trainId]);

  const reserverPlace = (id_place) => {
    axios.post('http://localhost:8081/api/reservations', {
      id_utilisateur: userId,
      id_train: trainId,
      id_place,
    })
      .then(() => alert('Réservation effectuée'))
      .catch((error) => alert('Erreur lors de la réservation'));
  };

  return (
    <div>
      <h2>Places disponibles</h2>
      <ul>
        {places.map((place) => (
          <li key={place.id_place}>
            Place n°{place.numéro_place} - Wagon n°{place.numéro_wagon}
            <button onClick={() => reserverPlace(place.id_place)}>Réserver</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrainDetails;
