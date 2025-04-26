
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

const MemoryGame = () => {
  const emojis = ["🚀", "🌟", "🎮", "🎨", "🎵", "🎭", "🧩", "🏆"];
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize game
  const initializeGame = () => {
    const duplicatedEmojis = [...emojis, ...emojis];
    const shuffledEmojis = duplicatedEmojis.sort(() => Math.random() - 0.5);
    
    const newCards = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false
    }));
    
    setCards(newCards);
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
    setTimer(0);
    setGameStarted(true);
  };

  // Handle card click
  const handleCardClick = (id: number) => {
    // Prevent click if card is already flipped or matched
    if (cards[id].flipped || cards[id].matched || flippedCards.length >= 2) {
      return;
    }

    // Flip the card
    const updatedCards = [...cards];
    updatedCards[id].flipped = true;
    setCards(updatedCards);

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Check for match when 2 cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstId, secondId] = newFlippedCards;
      
      if (cards[firstId].emoji === cards[secondId].emoji) {
        // It's a match
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstId].matched = true;
          matchedCards[secondId].matched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          
          // Check if game is complete
          if (matchedCards.every(card => card.matched)) {
            setGameComplete(true);
            setGameStarted(false);
          }
        }, 500);
      } else {
        // Not a match, flip back
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstId].flipped = false;
          resetCards[secondId].flipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameStarted && !gameComplete) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, gameComplete]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Игра "Память"</h1>
        
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-lg font-semibold">Ходы: {moves}</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Время: {formatTime(timer)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-3 mb-4">
            {cards.map(card => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square flex items-center justify-center rounded-lg text-3xl cursor-pointer transition-all duration-300 ${
                  card.flipped || card.matched 
                    ? "bg-primary text-white rotate-y-180" 
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {(card.flipped || card.matched) && card.emoji}
              </div>
            ))}
          </div>
          
          <Button 
            onClick={initializeGame} 
            className="w-full"
          >
            {gameStarted && !gameComplete ? "Начать заново" : "Начать игру"}
          </Button>
          
          {gameComplete && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center">
              <p className="font-bold text-lg">Поздравляем! 🎉</p>
              <p>Вы завершили игру за {moves} ходов и {formatTime(timer)}</p>
            </div>
          )}
        </div>
        
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Правила игры</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Найдите пары одинаковых карточек, переворачивая их по две за ход.</li>
            <li>Если карточки совпадают, они останутся открытыми.</li>
            <li>Если не совпадают, они будут перевёрнуты обратно.</li>
            <li>Цель игры — найти все пары за минимальное количество ходов.</li>
            <li>Тренируйте свою память, запоминая положение карточек!</li>
          </ul>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MemoryGame;
