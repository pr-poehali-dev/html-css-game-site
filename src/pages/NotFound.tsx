
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4">
      <div className="text-9xl font-bold text-primary mb-4">404</div>
      <h1 className="text-3xl font-bold mb-6 text-center">Страница не найдена</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Упс! Похоже, вы попали на страницу, которой не существует. Вернитесь на главную страницу.
      </p>
      <Button asChild size="lg">
        <Link to="/" className="flex items-center gap-2">
          <Home className="h-5 w-5" />
          <span>Вернуться на главную</span>
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
