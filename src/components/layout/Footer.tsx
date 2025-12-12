import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-heading font-semibold">Anonymous Crime Reporting Portal</p>
              <p className="text-sm text-muted-foreground">Your identity is always protected</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <Link to="/report" className="hover:text-foreground transition-colors">
              Report a Crime
            </Link>
            <Link to="/track" className="hover:text-foreground transition-colors">
              Track Report
            </Link>
            <Link to="/admin/login" className="hover:text-foreground transition-colors">
              Officer Portal
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ACRP. No personal data is collected or stored.</p>
        </div>
      </div>
    </footer>
  );
}
