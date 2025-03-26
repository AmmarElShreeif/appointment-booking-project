import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { teamMembers } from "@/data";

const About = () => {

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
                <BreadcrumbPage>About</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-4xl mx-auto py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-center mb-8">About MedBook</h1>
              <p className="text-lg text-muted-foreground text-center mb-16">
                We're on a mission to transform healthcare accessibility through technology.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  MedBook was founded in 2020 with a simple idea: make healthcare more accessible.
                  We noticed how difficult it was for people to find and book appointments with
                  qualified healthcare providers, especially on short notice.
                </p>
                <p className="text-muted-foreground">
                  Our platform bridges this gap by connecting patients with healthcare professionals
                  through a seamless online booking system. Since our launch, we've helped thousands
                  of patients find the right care at the right time.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-lg overflow-hidden shadow-medium"
              >
                <img
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Medical team meeting"
                  className="w-full h-auto"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-20"
            >
              <h2 className="text-2xl font-semibold mb-8 text-center">Our Team</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                    className="text-center"
                  >
                    <div className="mb-4 rounded-full overflow-hidden w-32 h-32 mx-auto">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-lg">{member.name}</h3>
                    <p className="text-muted-foreground text-sm">{member.role}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-20 p-8 bg-secondary/50 rounded-lg text-center"
            >
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full">Accessibility</span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full">Quality Care</span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full">Innovation</span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full">Patient Privacy</span>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full">Inclusivity</span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
