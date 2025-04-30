import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TrainList({ onSelectTrain }) {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/api/trains')
      .then((response) => setTrains(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des trains', error));
  }, []);

  return (
    <div>
      <h2>Trains disponibles</h2>
      <ul>
        {trains.map((train) => (
          <li key={train.id_train}>
            {train.nom_train} - {train.ville_départ} → {train.ville_arrivée} le {train.date_départ} à {train.heure_départ}
            <button onClick={() => onSelectTrain(train.id_train)}>Voir les places</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrainList;
