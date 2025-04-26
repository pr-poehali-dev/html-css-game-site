
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GameController, Brain } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-accent text-white py-20">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-5xl font-bold mb-6 animate-float">Добро пожаловать в ИгроТеку!</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Наш школьный проект предлагает интересные образовательные игры, которые помогут вам развить память и эрудицию.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/memory-game">Играть в Игру Память</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/quiz-game">Играть в Викторину</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Games Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Наши Игры</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Memory Game Card */}
              <div className="game-card bg-white rounded-xl shadow-lg overflow-hidden border border-border">
                <div className="h-48 bg-primary/20 flex items-center justify-center">
                  <GameController className="h-20 w-20 text-primary" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Игра Память</h3>
                  <p className="text-gray-600 mb-4">
                    Проверьте свою память, находя пары одинаковых карточек. Чем быстрее вы найдёте все пары, тем лучше результат!
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/memory-game">Играть</Link>
                  </Button>
                </div>
              </div>
              
              {/* Quiz Game Card */}
              <div className="game-card bg-white rounded-xl shadow-lg overflow-hidden border border-border">
                <div className="h-48 bg-accent/20 flex items-center justify-center">
                  <Brain className="h-20 w-20 text-accent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">Викторина</h3>
                  <p className="text-gray-600 mb-4">
                    Проверьте свои знания в увлекательной викторине на разные темы. С каждым вопросом задания становятся сложнее!
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/quiz-game">Играть</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="py-16 px-4 bg-secondary">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-6">О Проекте</h2>
            <p className="text-lg mb-6">
              Этот сайт был создан как школьный проект для демонстрации возможностей веб-разработки и создания интерактивных образовательных игр.
            </p>
            <p className="text-lg">
              Игры разработаны с целью развития памяти, логического мышления и расширения кругозора.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
