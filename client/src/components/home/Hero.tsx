
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Calendar, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative pt-28 md:pt-32 lg:pt-40 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Text content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center lg:text-left max-w-xl mx-auto lg:mx-0"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="inline-block bg-primary/10 px-3 py-1 rounded-full text-primary font-medium text-sm mb-6">
                  Healthcare made simple
                </div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6"
              >
                Quality Healthcare at Your Fingertips
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
              >
                Book appointments with top doctors online, manage your health records, and receive personalized care—all in one platform.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button size="lg" asChild className="rounded-full">
                  <Link to="/doctors">
                    Find a Doctor
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-full">
                  <Link to="/services">
                    Our Services
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Image/Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="relative mx-auto lg:mx-0 max-w-md lg:max-w-none"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-medium border border-border/20">
                <img
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="Doctor with patient"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating cards */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 flex items-center bg-white glass p-3 rounded-xl shadow-soft max-w-[220px] border border-white/30"
              >
                <Search className="h-8 w-8 text-primary flex-shrink-0 mr-3" />
                <div>
                  <p className="text-sm font-medium">Find Doctors</p>
                  <p className="text-xs text-muted-foreground">Search by specialty, name or condition</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -top-6 -right-6 flex items-center bg-white glass p-3 rounded-xl shadow-soft max-w-[220px] border border-white/30"
              >
                <Calendar className="h-8 w-8 text-primary flex-shrink-0 mr-3" />
                <div>
                  <p className="text-sm font-medium">Book Online</p>
                  <p className="text-xs text-muted-foreground">Schedule appointments in just a few clicks</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 md:mt-28 px-4 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">1000+</p>
              <p className="text-sm text-muted-foreground">Doctors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">50K+</p>
              <p className="text-sm text-muted-foreground">Patients</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">20+</p>
              <p className="text-sm text-muted-foreground">Specialties</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">100K+</p>
              <p className="text-sm text-muted-foreground">Appointments</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
