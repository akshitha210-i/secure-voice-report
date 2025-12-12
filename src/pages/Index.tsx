import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, FileText, Search, Lock, ArrowRight, Eye, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";

const features = [
  {
    icon: Shield,
    title: "Complete Anonymity",
    description: "No personal data collected. No IP tracking. No session logs. Your identity remains completely protected.",
  },
  {
    icon: FileText,
    title: "Easy Reporting",
    description: "Submit crime reports with a simple, secure form. Upload evidence safely and receive a tracking ID.",
  },
  {
    icon: Search,
    title: "Track Progress",
    description: "Use your unique Report ID to check the status of your submission at any time, anonymously.",
  },
  {
    icon: Lock,
    title: "End-to-End Security",
    description: "All data is encrypted and stored securely. Only authorized officers can access reports.",
  },
];

const stats = [
  { icon: Eye, value: "100%", label: "Anonymous" },
  { icon: Users, value: "24/7", label: "Available" },
  { icon: MapPin, value: "Secure", label: "Encrypted" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-glow opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-8">
                <Shield className="h-4 w-4" />
                <span>Your Safety, Our Priority</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight"
            >
              Report Crimes{" "}
              <span className="text-gradient">Anonymously</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Help keep your community safe without revealing your identity. 
              Our secure platform ensures your anonymity while enabling authorities to take action.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/report">
                <Button variant="hero" size="xl">
                  Report a Crime
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/track">
                <Button variant="heroOutline" size="xl">
                  Track Your Report
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center gap-8 md:gap-16 mt-16"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-heading font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed with your safety and privacy as the top priority.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card-gradient hover:border-primary/30 transition-colors group">
                  <CardContent className="p-6">
                    <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card-gradient border-primary/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-glow opacity-30" />
              <CardContent className="p-8 md:p-12 relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                    Ready to Make a Difference?
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Your anonymous tip could help solve a case and keep your community safe.
                    Every report matters.
                  </p>
                  <Link to="/report">
                    <Button variant="hero" size="lg">
                      Submit a Report Now
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
