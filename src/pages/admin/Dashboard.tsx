import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  LogOut,
  Bell,
  ChevronDown,
  Eye,
  MapPin,
  Calendar,
  TrendingUp,
  Users,
  FileSearch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: string;
  crimeType: string;
  location: string;
  status: "received" | "inReview" | "actionTaken" | "closed";
  submittedAt: string;
  priority: "low" | "medium" | "high";
}

const mockReports: Report[] = [
  {
    id: "RPT-ABC12345",
    crimeType: "Theft / Robbery",
    location: "Downtown Market Area",
    status: "inReview",
    submittedAt: "2024-01-17T10:30:00",
    priority: "high",
  },
  {
    id: "RPT-DEF67890",
    crimeType: "Vandalism",
    location: "Central Park",
    status: "received",
    submittedAt: "2024-01-17T08:15:00",
    priority: "medium",
  },
  {
    id: "RPT-GHI13579",
    crimeType: "Suspicious Activity",
    location: "Residential Block 5",
    status: "received",
    submittedAt: "2024-01-16T22:45:00",
    priority: "low",
  },
  {
    id: "RPT-JKL24680",
    crimeType: "Drug-related",
    location: "Industrial Zone",
    status: "actionTaken",
    submittedAt: "2024-01-15T14:20:00",
    priority: "high",
  },
  {
    id: "RPT-XYZ98765",
    crimeType: "Vandalism",
    location: "School District",
    status: "closed",
    submittedAt: "2024-01-10T08:15:00",
    priority: "medium",
  },
];

const statusConfig = {
  received: { label: "Received", variant: "received" as const },
  inReview: { label: "In Review", variant: "inReview" as const },
  actionTaken: { label: "Action Taken", variant: "actionTaken" as const },
  closed: { label: "Closed", variant: "closed" as const },
};

const priorityConfig = {
  low: { label: "Low", className: "text-muted-foreground" },
  medium: { label: "Medium", className: "text-warning" },
  high: { label: "High", className: "text-destructive" },
};

const stats = [
  { label: "Total Reports", value: "247", icon: FileText, change: "+12%" },
  { label: "Pending Review", value: "18", icon: Clock, change: "-5%" },
  { label: "In Progress", value: "32", icon: FileSearch, change: "+8%" },
  { label: "Resolved", value: "197", icon: CheckCircle, change: "+15%" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been signed out successfully.",
    });
    navigate("/admin/login");
  };

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.crimeType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-hero-gradient">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <span className="font-heading font-bold text-lg">ACRP</span>
                <span className="text-muted-foreground text-sm ml-2">Dashboard</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <span className="hidden sm:inline">Officer</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card-gradient">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-heading font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">{stat.change}</span>
                  <span className="text-xs text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Reports Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card-gradient">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Crime Reports
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-9"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px] h-9">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="received">Received</SelectItem>
                      <SelectItem value="inReview">In Review</SelectItem>
                      <SelectItem value="actionTaken">Action Taken</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredReports.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No reports found matching your criteria.</p>
                  </div>
                ) : (
                  filteredReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
                      onClick={() => setSelectedReport(report)}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            report.priority === "high"
                              ? "bg-destructive"
                              : report.priority === "medium"
                              ? "bg-warning"
                              : "bg-muted-foreground"
                          }`}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm">{report.id}</span>
                            <Badge variant={statusConfig[report.status].variant}>
                              {statusConfig[report.status].label}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium mt-1">{report.crimeType}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {report.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(report.submittedAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
