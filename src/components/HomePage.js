import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import ChatBox from "./ChatBox";
import io from "socket.io-client";
const resourceMapping = require("../img/resource-mapping.png");
const legalAssistance = require("../img/legal-assistance.png");
const languageLearning = require("../img/language-learning.png");
const chatBoxImage = require('../img/chat.png');
const socket = io();

const handleQuizSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const feedbackContainer = document.getElementById("quiz-feedback");
    const correctAnswers = { q1: "option3" };

    let score = 0;
    formData.forEach((value, name) => {
      if (correctAnswers[name] === value) {
        score++;
      }
    });

    let feedback = "";
    if (score === 1) {
      feedback = "You got 1 out of 1 question correct!";
    } else if (score > 1) {
      feedback = `You got ${score} out of 1 questions correct!`;
    } else {
      feedback = "You didn't get any questions correct. Keep practicing!";
    }

    feedbackContainer.textContent = feedback;
};

const handleLegalFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    const messageInput = form.querySelector("#message");

    if (nameInput.value.trim() === "" || emailInput.value.trim() === "" || messageInput.value.trim() === "") {
      alert("Please fill out all fields.");
    } else {
      alert("Form submitted successfully!");
      form.reset();
    }
};

export default function HomePage () {
    const [messages, setMessages] = useState([
        { user: "Tanya Mi", message: "Does anybody know what living in Bellevue is like?" },
        { user: "Maxym Ca", message: "Depends where you are, but it can be expensive. Schools are decent, but not a lot of refugees there." },
        { user: "Lina K.", message: "Does anyone want to start a Ukrainian book club or cooking club?" },
        { user: "Bohdan Kh.", message: "Looking for someone for my eight year old daughter to go on a playdate with!" }
      ]);
    const [messageInput, setMessageInput] = useState("");
    const [myMessages, setMyMessages] = useState([]);
    
    useEffect(() => {
        socket.on("chatMessage", (message) => {
            setMessages((prevMessages) => [...prevMessages, { user: "Other User", message }]);
        });
    }, []);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (messageInput.trim() !== "") {
          socket.emit("chatMessage", messageInput);
          setMyMessages((prevMyMessages) => [...prevMyMessages, { user: "You", message: messageInput }]);
          setMessageInput("");
        }
    };

  const handleFilterResources = () => {
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');
    const resourceList = document.getElementById('resource-list').getElementsByTagName('li');

    const searchQuery = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value.toLowerCase();

    for (const resource of resourceList) {
      const resourceText = resource.textContent.toLowerCase();
      const resourceCategory = resource.getAttribute('data-category').toLowerCase();

      const isMatch = resourceText.includes(searchQuery) && (selectedCategory === '' || resourceCategory === selectedCategory);

      resource.style.display = isMatch ? 'block' : 'none';
    }
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h2>Empowering Refugee Communities</h2>
          <p className="tagline">A platform to connect, support, and uplift refugee communities around the world.</p>
          <Link to="/resources" className="cta-button">Explore Resources</Link>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container">
          <h2>About Refugee Connect</h2>
          <p>
            Refugee Connect is a groundbreaking app designed to bridge the gap between refugee communities and the resources they need. Our mission is to provide a comprehensive platform that offers a wide range of services and fosters a sense of community among refugees.
          </p>
          <p>
            With Refugee Connect, refugees can access essential information, connect with aid organizations, find legal assistance, learn languages, and discover educational opportunities. The app also facilitates community engagement, allowing refugees to connect with others, share experiences, and find emotional support.
          </p>
          <Link to="/about" className="cta-button">Learn More</Link>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2>Key Features</h2>
          <div className="feature">
            <p>Connect with other refugees and find support in the community:</p>
            <p>This is the general chat. For more specialized chatting, go to our <Link to="/community">Community Section</Link></p>
            <hr />
            <ChatBox messages={[...messages, ...myMessages]} />
            <form className="chat-form" onSubmit={handleSubmit}>
                <input
                type="text"
                id="message-input"
                placeholder="Type your message..."
                required
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                />
                <hr />
                <button type="submit">Send</button>
            </form>
            <img src={chatBoxImage} alt="Two cute chickens chatting" className="responsive-image" />
          </div>

          <div className="language-learning-section">
          <div class="container">
            <h2>Language Learning</h2>
            <p>Enhance your language skills with various language-learning features:</p>
            <hr />
            
            <div class="lesson">
                <h3>A1 Vocabulary</h3>
                <p>Lesson to introduce basic vocabulary and phrases. You can view the lesson materials and practice exercises.</p>
                <a href="https://www.esolcourses.com/content/topics/health-and-safety/fire-safety-words.html">View Lesson</a>
            </div>
            
            <div class="lesson">
                <h3>A1 Grammar</h3>
                <p>Lessons that focus on grammar rules and sentence structure. You can study the lesson materials and complete interactive exercises.</p>
                <a href="https://www.englishgrammar101.com/module-1/nouns/lesson-1/what-is-a-noun">View Lesson</a>
            </div>
            
            <div class="language-quiz">
                <h3>Language Quiz</h3>
                <p>Test your knowledge with a language quiz. Choose the correct answers and receive instant feedback.</p>
                <form id="quiz-form" onSubmit={handleQuizSubmit}>
                    <p>Question 1: What's the correct past form of "visit?"</p>
                    <label>
                        <input type="radio" name="q1" value="option1" /> Visit
                    </label>
                    <br />
                    <label>
                        <input type="radio" name="q1" value="option2" /> Visiting
                    </label>
                    <br />
                    <label>
                        <input type="radio" name="q1" value="option3" /> Visited
                    </label>
                    <br />
                    <hr />
                    <button type="submit">Submit</button>
                </form>
                <hr />
                <div id="quiz-feedback"></div>
                <p>If you would like to play an interactive language learning game go to our <Link to="/language-learning">Language Learning</Link> section.</p>
            </div>
            </div>
            <div class="container">
                <img src={languageLearning} alt="Alphabet letters on the floor" class="responsive-image"></img>
            </div>
          </div>

          <div className="resource-discovery-section">
            <div className="container">
              <h2>Resource Navigation</h2>
              <p>Explore resources available to refugees:</p>

              <div className="filter-container">
                <input type="text" id="search-input" placeholder="Search resources..." onChange={handleFilterResources} />
                <select id="category-select" onChange={handleFilterResources}>
                  <option value="">All Categories</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="employment">Employment</option>
                </select>
              </div>

              <ul id="resource-list">
                <li data-category="healthcare"><a href="https://drive.google.com/drive/folders/1hBjU9xiAYHd6SjdJ4-aRnGFSYrULtBOi">Ukrainian and Russian-speaking health providers</a></li>
                <li data-category="healthcare"><a href="https://drive.google.com/drive/folders/1hBjU9xiAYHd6SjdJ4-aRnGFSYrULtBOi">List of Ukrainian and Russian-speaking mental health specialists</a></li>
                <li data-category="education"><a href="https://vax4school.org/">School readiness for new Ukrainian arrivals</a></li>
                <li data-category="employment"><a href="https://www.ziprecruiter.com/">Employment</a></li>
                <li data-category="housing"><a href="https://www.rescue.org/announcement/welcoming-our-ukrainian-neighbors-washington">Financial Support Programs for Housing</a></li>
                <li data-category="food"><a href="https://www.dshs.wa.gov/esa/community-services-offices/basic-food">Applying for Supplemental Nutrition</a></li>
              </ul>

              <div className="resources-visualization">
                <div className="resource-card">
                  <h4>Uniting for Ukraine</h4>
                  <p>Website: <a href="https://www.uscis.gov">www.uscis.gov</a></p>
                </div>
                <div className="resource-card">
                  <h4>Ukrainian Association of Washington State</h4>
                  <p>Website: <a href="https://www.uaws.org">www.uaws.org</a></p>
                </div>
                <div className="resource-card">
                  <h4><a href="https://uaws.org/resources-for-ukrainian-refugees/">Find more resources here</a></h4>
                  <img src={resourceMapping} alt="Paper maps on top of other paper maps" className="responsive-image" />
                </div>
              </div>

              <p>Explore more resources on the <Link to="/resources">Resources Map</Link>.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="legal-assistance-section">
        <div className="container">
          <h2>Legal Assistance</h2>
          <p>If you need legal assistance, please fill out the form below and we will get back to you as soon as possible:</p>
          <br />
          <form id="legal-form" onSubmit={handleLegalFormSubmit}>
            <label htmlFor="name">Full Name:</label>
            <input type="text" id="name" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" required />
            <label htmlFor="message">Message:</label>
            <textarea id="message" rows="4" required></textarea>
            <button type="submit">Submit</button>
          </form>
          <br />
          <p>For more detailed legal assistance, visit our <Link to="/legal-assistance">Legal Assistance Section</Link>.</p>
        </div>
        <div className="container">
          <img src={legalAssistance} alt="Bookshelf full of legal books" className="responsive-image" />
        </div>  
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2023 Refugee Connect. All rights reserved.</p>
          <ul className="social-icons">
            <li><a href="#"><i className="fab fa-twitter" aria-label="Twitter"></i></a></li>
            <li><a href="#"><i className="fab fa-facebook" aria-label="Facebook"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram" aria-label="Instagram"></i></a></li>
          </ul>
        </div>
      </footer>
    </main>
  );
}

