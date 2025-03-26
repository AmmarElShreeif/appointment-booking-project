
import React from "react";
import { motion } from "framer-motion";
import { Clock, Heart, Shield, Calendar, Search, Zap, ClipboardCheck, UserCheck } from "lucide-react";

const features = [
  {
    title: "Find the Right Doctor",
    description: "Search and filter through our extensive network of qualified healthcare providers.",
    icon: Search,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500"
  },
  {
    title: "Book Instantly",
    description: "Schedule appointments online with real-time availability for your preferred doctors.",
    icon: Calendar,
    bgColor: "bg-green-50",
    iconColor: "text-green-500"
  },
  {
    title: "Save Time",
    description: "No more waiting on hold. Book, reschedule, or cancel appointments in seconds.",
    icon: Clock,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500"
  },
  {
    title: "Digital Health Records",
    description: "Access your medical history, prescriptions, and test results all in one place.",
    icon: ClipboardCheck,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-500"
  },
  {
    title: "Secure & Private",
    description: "Your health information is protected with enterprise-grade security and encryption.",
    icon: Shield,
    bgColor: "bg-red-50",
    iconColor: "text-red-500"
  },
  {
    title: "Reminders & Notifications",
    description: "Never miss an appointment with automated reminders and follow-up notifications.",
    icon: Zap,
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-500"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function Features() {
  return (
    <section className="py-20 md:py-32 overflow-hidden bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Designed for a Better Healthcare Experience</h2>
            <p className="text-lg text-muted-foreground">
              Our platform simplifies every step of your healthcare journey, from finding doctors to managing appointments.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="group rounded-2xl p-8 transition-all duration-300 hover:shadow-medium hover:-translate-y-1 bg-white border border-border/40"
            >
              <div className={`${feature.bgColor} w-14 h-14 flex items-center justify-center rounded-lg mb-6`}>
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
