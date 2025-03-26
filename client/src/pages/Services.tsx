import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Briefcase, Clock, Heart, Shield } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";

const Services = () => {
  const services = [
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: "Doctor Consultations",
      description: "Connect with qualified healthcare professionals from various specialties for personalized medical advice."
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Quick Appointments",
      description: "Book same-day or next-day appointments with our extensive network of healthcare providers."
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Preventive Care",
      description: "Access preventive health services including vaccinations, screenings, and wellness check-ups."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure Medical Records",
      description: "Your medical information is stored securely and accessible only to authorized healthcare providers."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <Breadcrumb className="py-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Services</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-4xl mx-auto py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
              <p className="text-lg text-muted-foreground text-center mb-16">
                We provide a comprehensive range of healthcare services to meet your needs.
                Our goal is to make quality healthcare accessible to everyone.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-lg p-6 shadow-soft hover:shadow-medium transition-shadow"
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16 p-8 bg-secondary/50 rounded-lg"
            >
              <h2 className="text-2xl font-semibold mb-4">Need a specialized service?</h2>
              <p className="text-muted-foreground mb-6">
                Contact our healthcare team to learn about additional services tailored to your specific health needs.
              </p>
              <a href="/contact" className="text-primary hover:text-primary/80 font-medium">
                Get in touch →
              </a>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;   