
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const QuizGame = () => {
  const quizQuestions: Question[] = [
    {
      question: "Какая планета находится ближе всего к Солнцу?",
      options: ["Венера", "Меркурий", "Марс", "Земля"],
      correctAnswer: 1
    },
    {
      question: "Сколько сторон у пятиугольника?",
      options: ["4", "5", "6", "7"],
      correctAnswer: 1
    },
    {
      question: "Какое животное является символом мудрости?",
      options: ["Лев", "Слон", "Сова", "Дельфин"],
      correctAnswer: 2
    },
    {
      question: "Какой элемент обозначается символом 'Fe' в периодической таблице?",
      options: ["Фтор", "Железо", "Фермий", "Фосфор"],
      correctAnswer: 1
    },
    {
      question: "Кто написал роман 'Война и мир'?",
      options: ["Фёдор Достоевский", "Иван Тургенев", "Николай Гоголь", "Лев Толстой"],
      correctAnswer: 3
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<{ question: string; correct: boolean }[]>([]);

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return; // Prevent changing answer after selection
    setSelectedOption(optionIndex);

    const isCorrect = optionIndex === quizQuestions[currentQuestionIndex].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([...answers, {
      question: quizQuestions[currentQuestionIndex].question,
      correct: isCorrect
    }]);

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setQuizComplete(false);
    setAnswers([]);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Викторина</h1>
        
        {!quizComplete ? (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8">
            {/* Progress bar */}
            <div className="mb-6">
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300" 
                  style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-right mt-1 text-sm text-gray-600">
                Вопрос {currentQuestionIndex + 1} из {quizQuestions.length}
              </div>
            </div>
            
            {/* Question */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedOption === index
                        ? selectedOption === currentQuestion.correctAnswer
                          ? "bg-green-100 border-green-500"
                          : "bg-red-100 border-red-500"
                        : "bg-white border-gray-200 hover:border-primary"
                    } ${selectedOption !== null ? "" : "hover:shadow-md"}`}
                    onClick={() => handleOptionSelect(index)}
                    disabled={selectedOption !== null}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {selectedOption === index && (
                        selectedOption === currentQuestion.correctAnswer ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <X className="h-5 w-5 text-red-600" />
                        )
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Result message */}
            {showResult && (
              <div className={`p-4 mb-4 rounded-lg ${
                selectedOption === currentQuestion.correctAnswer 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                {selectedOption === currentQuestion.correctAnswer 
                  ? "Правильно! 👍" 
                  : `Неправильно. Правильный ответ: ${currentQuestion.options[currentQuestion.correctAnswer]}`
                }
              </div>
            )}
            
            {/* Next button */}
            {showResult && (
              <Button 
                onClick={handleNextQuestion}
                className="w-full"
              >
                {currentQuestionIndex < quizQuestions.length - 1 ? "Следующий вопрос" : "Посмотреть результаты"}
              </Button>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Результаты викторины</h2>
            
            <div className="text-center mb-6">
              <div className="text-5xl font-bold mb-2">
                {score} / {quizQuestions.length}
              </div>
              <p className="text-lg">
                {score === quizQuestions.length 
                  ? "Отлично! Вы ответили на все вопросы правильно!" 
                  : score > quizQuestions.length / 2 
                    ? "Хороший результат! Вы ответили на большинство вопросов правильно." 
                    : "Попробуйте еще раз, чтобы улучшить свой результат!"}
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Ваши ответы:</h3>
              <div className="space-y-2">
                {answers.map((answer, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg flex items-center gap-3 ${
                      answer.correct ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {answer.correct ? (
                      <Check className="h-5 w-5 text-green-600 shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-red-600 shrink-0" />
                    )}
                    <span>{answer.question}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={restartQuiz}
              className="w-full"
            >
              Начать викторину заново
            </Button>
          </div>
        )}
        
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Правила викторины</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Выберите один из вариантов ответа на каждый вопрос.</li>
            <li>После выбора ответа вы увидите, правильно ли ответили.</li>
            <li>За каждый правильный ответ вы получаете 1 балл.</li>
            <li>В конце викторины вы увидите свой общий результат.</li>
            <li>Проверьте свои знания и узнайте что-то новое!</li>
          </ul>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuizGame;
