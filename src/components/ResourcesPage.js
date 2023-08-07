/*
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const ResourcesPage = () => {
  const resources = [
    {
      name: "Uniting for Ukraine",
      lat: 47.6038,
      lng: -122.3301,
      description: "Refugee Services - Fleeing Invasion",
      link: "Website: <a href='https://www.uscis.gov'>www.uscis.gov</a>",
    },
    {
      name: "Ukrainian Community Center",
      lat: 47.482380,
      lng: -122.245392,
      description: "Immigration; Behavioral Health; Social services",
      link: "Website: <a href='https://uccwa.org/'>www.uccwa.org/</a>",
    },
    {
      name: "Honorary Consulate of Ukraine in Seattle",
      lat: 47.602190,
      lng: -122.333490,
      description: "Notarization; passport assistance; services for servicemen and their families",
      link: "Website: <a href='http://uaconsulate.org/'>www.uaconsulate.org</a>",
    },
  ];

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
          <Marker key={index} position={[resource.lat, resource.lng]} >
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
    </main>
  );
};

export default ResourcesPage;
*/
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
    // Load external data using fetch()
    fetch('/resources.json') // This assumes that the JSON file is served from the public folder
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

