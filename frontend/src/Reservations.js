import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reservations({ userId }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/users/${userId}/reservations`)
      .then((response) => setReservations(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des réservations', error));
  }, [userId]);

  return (
    <div>
      <h2>Vos réservations</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id_reservation}>
            Train: {reservation.nom_train} - Place n°{reservation.numéro_place} - Date: {reservation.date_reservation}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reservations;
