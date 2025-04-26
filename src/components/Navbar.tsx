
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gamepad2, Brain, Home } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <Gamepad2 className="h-6 w-6" />
          <span>ИгроТека</span>
        </Link>
        
        <div className="flex gap-4">
          <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary/80">
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              <span>Главная</span>
            </Link>
          </Button>
          
          <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary/80">
            <Link to="/memory-game" className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5" />
              <span>Игра Память</span>
            </Link>
          </Button>
          
          <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary/80">
            <Link to="/quiz-game" className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              <span>Викторина</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
