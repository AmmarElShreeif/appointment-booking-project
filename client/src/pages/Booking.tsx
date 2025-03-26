import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { doctors } from "@/data";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CheckCircle, Clock, CreditCard, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";


const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth()

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [step, setStep] = useState(1);


  const bookAppointment = async (doctorId: string, date: Date) => {
    try {
      const response = await fetch("http://localhost:5000/api/appointments/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId,
          date,
          username: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Someting wrong during appoiment");
      }

      const data = await response.json();
      return data.appointment;
    } catch (error) {
      console.error("Error booking appointment:", error);
      return null;
    }
  };



  // send data
  const handleBooking = async (e) => {
    e.preventDefault();

    const appointment = await bookAppointment(id, date);

    if (appointment) {
      toast({
        title: "Appointment Confirmed!",
        description: `Your appointment with Dr. ${doctor?.name} on ${format(date!, 'PPP')} at ${timeSlot} has been booked.`,
      });

      // Navigate to dashboard after booking
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  };




  // Generate some random available time slots
  const generateTimeSlots = () => {
    if (!date) return [];

    const slots = [];
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    // Start from current hour if it's today
    const startHour = isToday ? Math.max(9, today.getHours() + 1) : 9;

    for (let hour = startHour; hour <= 17; hour++) {
      if (Math.random() > 0.3) { // 70% chance of being available
        slots.push(`${hour}:00`);
      }
      if (hour < 17 && Math.random() > 0.3) {
        slots.push(`${hour}:30`);
      }
    }

    return slots;
  };

  const timeSlots = date ? generateTimeSlots() : [];

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
            <p>Loading booking page...</p>
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
            <p>Doctor not found or error loading booking page.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                <BreadcrumbLink href={`/doctor/${doctor.id}`}>Dr. {doctor.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Book Appointment</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-6">
            {/* Main booking section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Book an Appointment</CardTitle>
                  <CardDescription>Schedule a visit with Dr. {doctor.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  {step === 1 && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Select a Date</h3>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border mx-auto"
                        disabled={(date) => {
                          // Disable past dates and weekends
                          const now = new Date();
                          now.setHours(0, 0, 0, 0);
                          const day = date.getDay();
                          return date < now || day === 0 || day === 6;
                        }}
                      />

                      {date && (
                        <div className="mt-6">
                          <h3 className="text-lg font-medium mb-4">Select a Time</h3>
                          {timeSlots.length > 0 ? (
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                              {timeSlots.map((time) => (
                                <Button
                                  key={time}
                                  variant={timeSlot === time ? "default" : "outline"}
                                  onClick={() => setTimeSlot(time)}
                                  className="flex items-center justify-center"
                                >
                                  <Clock className="mr-2 h-4 w-4" />
                                  {time}
                                </Button>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground">No available time slots for this date.</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Appointment Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                          <div className="flex items-center">
                            <CalendarIcon className="h-5 w-5 text-primary mr-2" />
                            <span>Date & Time</span>
                          </div>
                          <span className="font-medium">{format(date!, 'PPP')} at {timeSlot}</span>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                          <div className="flex items-center">
                            <CreditCard className="h-5 w-5 text-primary mr-2" />
                            <span>Estimated Cost</span>
                          </div>
                          <span className="font-medium">$150 (Consultation)</span>
                        </div>

                        <div className="p-4 bg-blue-50 text-blue-800 rounded-lg flex items-start">
                          <Info className="h-5 w-5 mr-2 mt-0.5" />
                          <p className="text-sm">Your insurance may cover all or part of this cost. Please bring your insurance card to your appointment.</p>
                        </div>

                        <div className="p-4 bg-green-50 text-green-800 rounded-lg flex items-start">
                          <CheckCircle className="h-5 w-5 mr-2 mt-0.5" />
                          <p className="text-sm">Appointment confirmation and details will be sent to your email and phone.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  {step === 1 ? (
                    <>
                      <Button variant="outline" onClick={() => navigate(`/doctor/${doctor.id}`)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={() => setStep(2)}
                        disabled={!date || !timeSlot}
                      >
                        Continue
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button onClick={handleBooking}>
                        Confirm Booking
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            </div>

            {/* Doctor information sidebar */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Doctor Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                      {doctor.available === true && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">Dr. {doctor.name}</h3>
                      <p className="text-sm text-primary">{doctor.specialty}</p>
                      <div className="flex items-center mt-1">
                        <svg className="h-4 w-4 text-yellow-400 fill-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                        <span className="text-xs ml-1">{doctor.rating} ({doctor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{doctor.location}</p>
                    </div>

                    <div>
                      <p className="font-medium">Languages</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {doctor.languages?.map((lang, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-medium">Insurance</p>
                      <p className="text-muted-foreground">
                        {doctor.insurance?.slice(0, 2).join(", ")}
                        {doctor.insurance && doctor.insurance.length > 2 && " and more"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-4 bg-muted p-4 rounded-lg text-sm">
                <p className="font-medium mb-2">About your visit</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Please arrive 15 minutes before your appointment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Bring your insurance card and ID</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Wear a mask during your visit</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
