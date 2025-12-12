import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Shield, Clock, CheckCircle, AlertCircle, FileSearch, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

interface ReportStatus {
  id: string;
  status: "received" | "inReview" | "actionTaken" | "closed";
  crimeType: string;
  submittedAt: string;
  lastUpdated: string;
  updates: {
    date: string;
    status: string;
    message: string;
  }[];
}

const statusConfig = {
  received: {
    label: "Received",
    variant: "received" as const,
    icon: Clock,
    description: "Your report has been received and is awaiting review.",
  },
  inReview: {
    label: "In Review",
    variant: "inReview" as const,
    icon: FileSearch,
    description: "An officer is currently reviewing your report.",
  },
  actionTaken: {
    label: "Action Taken",
    variant: "actionTaken" as const,
    icon: ArrowRight,
    description: "Authorities have taken action based on your report.",
  },
  closed: {
    label: "Closed",
    variant: "closed" as const,
    icon: CheckCircle,
    description: "This case has been closed.",
  },
};

// Mock data for demonstration
const mockReports: Record<string, ReportStatus> = {
  "RPT-ABC12345": {
    id: "RPT-ABC12345",
    status: "inReview",
    crimeType: "Theft / Robbery",
    submittedAt: "2024-01-15T10:30:00",
    lastUpdated: "2024-01-17T14:20:00",
    updates: [
      {
        date: "2024-01-17T14:20:00",
        status: "In Review",
        message: "An officer has been assigned to investigate this case.",
      },
      {
        date: "2024-01-15T10:30:00",
        status: "Received",
        message: "Your report has been successfully submitted.",
      },
    ],
  },
  "RPT-XYZ98765": {
    id: "RPT-XYZ98765",
    status: "closed",
    crimeType: "Vandalism",
    submittedAt: "2024-01-10T08:15:00",
    lastUpdated: "2024-01-20T16:45:00",
    updates: [
      {
        date: "2024-01-20T16:45:00",
        status: "Closed",
        message: "Case has been resolved. Thank you for your report.",
      },
      {
        date: "2024-01-18T11:30:00",
        status: "Action Taken",
        message: "Authorities have responded to the incident location.",
      },
      {
        date: "2024-01-12T09:00:00",
        status: "In Review",
        message: "Report is being reviewed by the local department.",
      },
      {
        date: "2024-01-10T08:15:00",
        status: "Received",
        message: "Your report has been successfully submitted.",
      },
    ],
  },
};

const TrackPage = () => {
  const { toast } = useToast();
  const [reportId, setReportId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [report, setReport] = useState<ReportStatus | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportId.trim()) {
      toast({
        title: "Report ID Required",
        description: "Please enter your Report ID to track your submission.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setNotFound(false);
    setReport(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const foundReport = mockReports[reportId.toUpperCase()];
    
    if (foundReport) {
      setReport(foundReport);
    } else {
      setNotFound(true);
    }
    
    setIsSearching(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-4">
                <Shield className="h-4 w-4" />
                <span>Anonymous Tracking</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                Track Your Report
              </h1>
              <p className="text-muted-foreground">
                Enter your Report ID to check the status of your submission.
              </p>
            </div>

            {/* Search Form */}
            <Card className="bg-card-gradient mb-8">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Enter Report ID (e.g., RPT-ABC12345)"
                      value={reportId}
                      onChange={(e) => setReportId(e.target.value)}
                      className="pl-10 uppercase"
                    />
                  </div>
                  <Button type="submit" variant="hero" disabled={isSearching}>
                    {isSearching ? (
                      <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      "Track"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Demo IDs */}
            <div className="text-center mb-8 text-sm text-muted-foreground">
              <p>Demo IDs: <code className="bg-secondary px-2 py-1 rounded">RPT-ABC12345</code> or <code className="bg-secondary px-2 py-1 rounded">RPT-XYZ98765</code></p>
            </div>

            {/* Not Found State */}
            {notFound && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-card-gradient border-destructive/30">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="h-8 w-8 text-destructive" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-2">Report Not Found</h3>
                    <p className="text-muted-foreground">
                      We couldn't find a report with that ID. Please check the ID and try again.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Report Status */}
            {report && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Status Card */}
                <Card className="bg-card-gradient">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Report ID</p>
                        <CardTitle className="font-mono">{report.id}</CardTitle>
                      </div>
                      <Badge variant={statusConfig[report.status].variant} className="text-sm px-3 py-1">
                        {statusConfig[report.status].label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Crime Type</p>
                        <p className="font-medium">{report.crimeType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Submitted</p>
                        <p className="font-medium">{formatDate(report.submittedAt)}</p>
                      </div>
                    </div>

                    {/* Status Description */}
                    <div className="bg-secondary/30 rounded-lg p-4 flex items-start gap-3">
                      {(() => {
                        const StatusIcon = statusConfig[report.status].icon;
                        return <StatusIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />;
                      })()}
                      <p className="text-sm text-muted-foreground">
                        {statusConfig[report.status].description}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card className="bg-card-gradient">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Status Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {report.updates.map((update, index) => (
                        <div key={index} className="relative pl-6">
                          {index !== report.updates.length - 1 && (
                            <div className="absolute left-[9px] top-6 bottom-0 w-0.5 bg-border" />
                          )}
                          <div className="absolute left-0 top-1.5 w-[18px] h-[18px] rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </div>
                          <div className="pb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{update.status}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(update.date)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{update.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default TrackPage;
