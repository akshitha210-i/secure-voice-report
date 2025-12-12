import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, MapPin, Calendar, FileText, Upload, Send, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

const crimeTypes = [
  "Theft / Robbery",
  "Assault / Violence",
  "Drug-related",
  "Vandalism",
  "Fraud / Scam",
  "Harassment",
  "Domestic Violence",
  "Cybercrime",
  "Traffic Violation",
  "Suspicious Activity",
  "Other",
];

function generateReportId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "RPT-";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const ReportPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reportId, setReportId] = useState("");

  const [formData, setFormData] = useState({
    crimeType: "",
    location: "",
    date: "",
    time: "",
    description: "",
  });

  const [files, setFiles] = useState<File[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.crimeType || !formData.location || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newReportId = generateReportId();
    setReportId(newReportId);
    setIsSubmitted(true);
    setIsSubmitting(false);

    toast({
      title: "Report Submitted Successfully",
      description: `Your Report ID is: ${newReportId}`,
    });
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto"
            >
              <Card className="bg-card-gradient border-success/30">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold mb-2">Report Submitted</h2>
                  <p className="text-muted-foreground mb-6">
                    Your anonymous report has been received and will be reviewed by authorities.
                  </p>

                  <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Your Report ID</p>
                    <p className="text-2xl font-mono font-bold text-primary">{reportId}</p>
                  </div>

                  <div className="flex items-start gap-3 text-left bg-warning/10 rounded-lg p-4 mb-6">
                    <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Important:</strong> Save this Report ID. 
                      You will need it to track the status of your report. We do not store any way to 
                      identify you, so this ID is your only way to follow up.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="heroOutline"
                      className="flex-1"
                      onClick={() => navigate("/track")}
                    >
                      Track Report
                    </Button>
                    <Button
                      variant="hero"
                      className="flex-1"
                      onClick={() => navigate("/")}
                    >
                      Return Home
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

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
                <span>100% Anonymous</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                Report a Crime
              </h1>
              <p className="text-muted-foreground">
                Submit your report securely. No personal information is collected.
              </p>
            </div>

            {/* Form */}
            <Card className="bg-card-gradient">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Incident Details
                </CardTitle>
                <CardDescription>
                  Provide as much detail as possible to help authorities investigate.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Crime Type */}
                  <div className="space-y-2">
                    <Label htmlFor="crimeType">Type of Crime *</Label>
                    <Select
                      value={formData.crimeType}
                      onValueChange={(value) => handleInputChange("crimeType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select crime type" />
                      </SelectTrigger>
                      <SelectContent>
                        {crimeTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      Location *
                    </Label>
                    <Input
                      id="location"
                      placeholder="Enter the location of the incident"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleInputChange("time", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the incident in detail. Include any relevant information that could help the investigation."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="min-h-[150px]"
                    />
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      Evidence (Optional)
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        accept="image/*,video/*,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Images, videos, or PDFs (max 5 files)
                        </p>
                      </label>
                    </div>
                    {files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2"
                          >
                            <span className="text-sm truncate">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Privacy Notice */}
                  <div className="bg-secondary/30 rounded-lg p-4 text-sm text-muted-foreground">
                    <p className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>
                        Your privacy is protected. We do not collect your IP address, browser 
                        information, or any personally identifiable data. You will receive a 
                        unique Report ID to track your submission anonymously.
                      </span>
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Submit Report
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ReportPage;
