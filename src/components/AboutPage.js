import React from 'react';
const connectionImage = require('../img/connection.png');
const helpingHandsImage = require('../img/helping-hands.png');

const AboutPage = () => {
  return (
    <main>
      <h2>About Refugee Connect</h2>
      <p>
        Refugee Connect is a groundbreaking app designed to bridge the gap between refugee communities and the resources they need. Our mission is to provide a comprehensive platform that offers a wide range of services and fosters a sense of community among refugees. With Refugee Connect, refugees can access essential information, connect with aid organizations, find legal assistance, learn languages, and discover educational opportunities. The app also facilitates community engagement, allowing refugees to connect with others, share experiences, and find emotional support.
      </p>
      <img src={helpingHandsImage} alt="Person holding the world in their hand." className="responsive-image" />
      <h2>Get Involved</h2>
      <p>
        We welcome volunteers, organizations, and supporters to join us in our mission. Together, we can make a difference in the lives of refugees and build a more inclusive and compassionate society. Contact us to learn more about how you can get involved. To advertise your services, please email us at volunteers@refugeeconnect.org
      </p>
      <img src={connectionImage} alt="Four people of different backgrounds putting together four puzzle pieces." className="responsive-image" />
    </main>
  );
}

export default AboutPage;
