
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { doctors } from "@/data";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const DoctorProfile = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch doctor data
  const { data: doctor, isLoading, error } = useQuery({
    queryKey: ['doctor', id],
    queryFn: () => {
      const foundDoctor = doctors.find(doc => doc.id === id);
      if (!foundDoctor) {
        throw new Error('Doctor not found');
      }
      return foundDoctor;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-8">
            <p>Loading doctor profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-8">
            <p>Doctor not found or error loading profile.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Mock data for the doctor profile page
  const educationData = doctor.education?.map(edu => {
    const parts = edu.split(", ");
    return {
      degree: parts[0],
      institution: parts.length > 1 ? parts[1] : "",
      year: parts.length > 2 ? parts[2] : ""
    };
  }) || [];

  const experienceData = doctor.experience?.map(exp => {
    const parts = exp.split(" (");
    return {
      position: parts[0].split(", ")[0],
      hospital: parts[0].includes(", ") ? parts[0].split(", ")[1] : "",
      duration: parts.length > 1 ? parts[1].replace(")", "") : ""
    };
  }) || [];

  const certifications = [
    "Board Certified in " + doctor.specialty,
    "American Medical Association",
    "Fellow of the American College of " + doctor.specialty
  ];

  // Mock reviews
  const reviewList = [
    {
      id: "review-1",
      name: "John D.",
      rating: 5,
      date: "2 months ago",
      comment: "Dr. " + doctor.name + " was very thorough and took the time to explain everything. I felt comfortable and well-cared for during my visit."
    },
    {
      id: "review-2",
      name: "Maria S.",
      rating: 4,
      date: "3 months ago",
      comment: "Very professional and knowledgeable. The office was clean and the staff was friendly. I would definitely recommend."
    },
    {
      id: "review-3",
      name: "Robert K.",
      rating: 5,
      date: "5 months ago",
      comment: "Excellent care and attention to detail. Dr. " + doctor.name + " listened to all my concerns and provided clear explanations."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="py-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/doctors">Doctors</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Dr. {doctor.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Doctor profile header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl overflow-hidden border border-border/30 shadow-soft mb-8"
          >
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Image and basic info - mobile view */}
                <div className="md:hidden flex space-x-4 items-center">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-primary/10">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                    {doctor.available && (
                      <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Dr. {doctor.name}</h1>
                    <p className="text-primary font-medium">{doctor.specialty}</p>
                    <div className="flex items-center mt-1">
                      <svg className="h-4 w-4 text-yellow-400 fill-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                      <span className="font-medium text-sm ml-1">{doctor.rating.toFixed(1)}</span>
                      <span className="text-sm text-muted-foreground ml-1">({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Image - desktop view */}
                <div className="hidden md:block">
                  <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary/10">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                    {doctor.available && (
                      <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                </div>

                {/* Basic info - desktop view */}
                <div className="hidden md:block text-center">
                  <h1 className="text-3xl font-bold mb-2">Dr. {doctor.name}</h1>
                  <p className="text-primary text-lg font-medium mb-2">{doctor.specialty}</p>
                  <div className="flex items-center justify-center mb-3">
                    <svg className="h-5 w-5 text-yellow-400 fill-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    <span className="font-medium text-base ml-1">{doctor.rating.toFixed(1)}</span>
                    <span className="text-base text-muted-foreground ml-1">({doctor.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="text-sm">{doctor.location}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 items-center justify-between md:justify-end">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                  </Button>

                  <Button asChild>
                    <Link to={`/booking/${doctor.id}`} className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span className="hidden sm:inline">Book Appointment</span>
                      <span className="sm:hidden">Book</span>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Contact info row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center text-muted-foreground">
                  <Phone className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Phone</p>
                    <p className="font-medium">(212) 555-1234</p>
                  </div>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">{doctor.name.toLowerCase().split(' ')[0]}@example.com</p>
                  </div>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Availability</p>
                    <p className="font-medium">
                      {doctor.available ? (
                        <span className="text-green-600 flex items-center">
                          <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                          Available Today
                        </span>
                      ) : (
                        <span className="text-orange-600">Next available: Tomorrow</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content tabs */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="location" className="hidden md:inline-flex">Location</TabsTrigger>
              <TabsTrigger value="insurances" className="hidden md:inline-flex">Insurance</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">About Dr. {doctor.name}</h2>
                  <p className="text-muted-foreground">{doctor.bio}</p>

                  <h3 className="text-lg font-medium mt-6 mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-primary/10 text-primary border-none hover:bg-primary/20">
                      {doctor.specialty}
                    </Badge>
                    <Badge className="bg-primary/10 text-primary border-none hover:bg-primary/20">
                      General Medicine
                    </Badge>
                    <Badge className="bg-primary/10 text-primary border-none hover:bg-primary/20">
                      Consultation
                    </Badge>
                  </div>

                  <h3 className="text-lg font-medium mt-6 mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages?.map((language, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-secondary/50"
                      >
                        {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <svg className="h-5 w-5 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></svg>
                    <h2 className="text-xl font-semibold">Education</h2>
                  </div>

                  <div className="space-y-4">
                    {educationData.map((edu, index) => (
                      <div key={index} className="pl-4 border-l-2 border-primary/30">
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <svg className="h-5 w-5 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></svg>
                    <h2 className="text-xl font-semibold">Certifications</h2>
                  </div>

                  <ul className="space-y-2">
                    {certifications.map((cert, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-4 w-4 text-primary mr-2 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experience tab content would go here */}
            <TabsContent value="experience">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <svg className="h-5 w-5 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11V7a5 5 0 0 1 10 0v4" /><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /></svg>
                    <h2 className="text-xl font-semibold">Work Experience</h2>
                  </div>

                  <div className="space-y-6">
                    {experienceData.map((exp, index) => (
                      <div key={index} className="pl-8 relative">
                        <div className="absolute left-0 top-0 w-4 h-4 bg-primary rounded-full mt-1"></div>
                        <div className="border-l-2 border-primary/30 pl-6 pb-6 ml-2">
                          <p className="font-semibold text-lg">{exp.position}</p>
                          <p className="text-primary">{exp.hospital}</p>
                          <p className="text-sm text-muted-foreground mt-1">{exp.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews tab content */}
            <TabsContent value="reviews">
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Rating summary */}
                    <div className="text-center p-4">
                      <div className="text-5xl font-bold mb-2">{doctor.rating.toFixed(1)}</div>
                      <div className="flex justify-center mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`h-5 w-5 ${star <= Math.round(doctor.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                              }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-muted-foreground">{doctor.reviews} reviews</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Review list */}
              <div className="space-y-4">
                {reviewList.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary font-semibold">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`h-4 w-4 ${star <= review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                                }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Location tab content */}
            <TabsContent value="location">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    <h2 className="text-xl font-semibold">Location</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Address</h3>
                      <p className="text-muted-foreground mb-4">
                        123 Medical Center Drive<br />
                        Suite 456<br />
                        New York, NY 10001
                      </p>

                      <h3 className="font-medium mb-2">Office Hours</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span>9:00 AM - 5:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday</span>
                          <span>10:00 AM - 2:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday</span>
                          <span>Closed</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button size="sm" variant="outline" className="mr-3">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Office
                        </Button>
                        <Button size="sm" variant="outline">
                          <MapPin className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </div>

                    <div className="bg-muted rounded-lg h-[250px] flex items-center justify-center">
                      <p className="text-muted-foreground">Map view would go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Insurance tab content */}
            <TabsContent value="insurances">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <svg className="h-5 w-5 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 9h.01" /><path d="M15 9h.01" /><path d="M9 15h.01" /><path d="M15 15h.01" /></svg>
                    <h2 className="text-xl font-semibold">Accepted Insurance Plans</h2>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    Dr. {doctor.name} accepts the following insurance plans. Please confirm coverage details prior to your appointment.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {doctor.insurance?.map((insurance, index) => (
                      <div key={index} className="flex items-center p-3 border border-border rounded-lg">
                        <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        <span>{insurance}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorProfile;
