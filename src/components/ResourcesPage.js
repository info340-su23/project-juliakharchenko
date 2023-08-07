import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch('/resources.json')
      .then(response => response.json())
      .then(data => setResources(data))
      .catch(error => console.error('Error loading data:', error));
  }, []);

  return (
    <main>
      <h2>In-Person Resources</h2>
      <p>Explore the resources available to refugees:</p>

      <MapContainer center={[47.6062, -122.3321]} zoom={10} id="map-container">
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {resources.map((resource, index) => (
          <Marker key={index} position={[resource.lat, resource.lng]}>
            <Popup>
              <strong>{resource.name}</strong><br />
              {resource.description}
              <div dangerouslySetInnerHTML={{ __html: resource.link }} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <ul>
        <h2>Online Resources</h2>
        <li>
          <strong>Nashi Immigrants Health Board</strong><br />
          Website: <a href="https://nashisupport.com/">nashisupport.com</a>
        </li>
        <li>
          <strong>Ukrainian Association of Washington State</strong><br />
          Website: <a href="https://www.uaws.org">www.uaws.org</a>
        </li>
        <li>
          <strong><a href="https://uaws.org/resources-for-ukrainian-refugees/">Find more resources listed here such as food banks, medical facilities, education, and more</a></strong>
        </li>
      </ul>
      <br />
      <p>      Data in map from <a href="https://uaws.org/resources-for-ukrainian-refugees/">https://uaws.org/resources-for-ukrainian-refugees/</a></p>
    </main>
  );
};

export default ResourcesPage;

