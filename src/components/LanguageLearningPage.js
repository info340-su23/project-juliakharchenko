import React, { useState } from 'react';
var gameImage = require('../img/game.png');

const LanguageLearningPage = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = [
    { foreign: 'Де знаходиться туалет?', translation: 'Where is the bathroom?' },
    { foreign: 'Привіт як ти сьогодні?', translation: 'Hello how are you today?' },
    { foreign: 'Я щойно приїха(в/ла) з України', translation: 'I just came from Ukraine' },
    { foreign: 'Моя англійська мінімальна, але я вчуся!', translation: 'My English is minimal but I am learning!' },
    { foreign: 'Ви можете повторити це?', translation: 'Can you please repeat that?'},
    { foreign: 'Викличте швидку допомогу', translation: 'Call the ambulance'},
    { foreign: 'Скільки це коштує?', translation: 'How much does this cost?'},
    { foreign: 'Дякую, це дуже допомагає', translation: 'Thank you, that helps a lot'},
    { foreign: 'Вибачте', translation: 'Excuse me'},
    { foreign: 'Приємно познайомитись', translation: 'Nice to meet you'},
    { foreign: 'У вас є Facebook?', translation: 'Do you have Facebook?'},
  ];

  const startGame = () => {
    setGameStarted(true);
    setCurrentWordIndex(0);
    setGameScore(0);
  };

  const handleWordSelect = (selectedTranslation) => {
    const currentWord = words[currentWordIndex];
    if (currentWord.translation === selectedTranslation) {
      setGameScore((prevScore) => prevScore + 1);
    }
    setCurrentWordIndex((prevIndex) => prevIndex + 1);
  };

  const renderGameContent = () => {
    if (currentWordIndex >= words.length) {
      return (
        <div>
          <p>Game Over! Your score: {gameScore}</p>
          <button onClick={startGame}>Play Again</button>
        </div>
      );
    }

    const currentWord = words[currentWordIndex];
    const options = [currentWord.translation];

    while (options.length < 3) {
      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex].translation;
      if (!options.includes(randomWord)) {
        options.push(randomWord);
      }
    }

    options.sort(() => Math.random() - 0.5);

    return (
      <div>
        <p>Translate the word:</p>
        <h3>{currentWord.foreign}</h3>
        <div>
          {options.map((option) => (
            <button key={option} onClick={() => handleWordSelect(option)}>
              {option}
            </button>
          ))}
        </div>
        <p>Current Score: {gameScore}</p>
        <img src={gameImage} alt="Assortment of pieces from different board games" class="responsive-image"></img>
      </div>
    );
  };

  return (
    <main>
      <h2>Language Learning</h2>
      <p>Enhance your language skills with various language-learning features:</p>

      <div className="game">
        <h3>Language Game: Word Matching</h3>
        <p>Match the foreign words with their English translations.</p>
        {gameStarted ? (
          renderGameContent()
        ) : (
          <button onClick={startGame}>Start Game</button>
        )}
        <img src={gameImage} alt="Assortment of pieces from different board games" class="responsive-image"></img>
      </div>
    </main>
  );
};

export default LanguageLearningPage;

