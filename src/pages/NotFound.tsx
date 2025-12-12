import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Shield, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-gradient">
      <div className="text-center px-4">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
          <Shield className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-6xl font-heading font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button variant="hero" size="lg">
            <Home className="h-5 w-5" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
