
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, FileText, Settings, Bell, LogOutIcon, FileWarningIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { pastAppointments } from "@/data";

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [appointments, setAppointments] = useState([]);


  useEffect(() => {
    if (user?.uid) {
      fetchAppointments(user.email).then(setAppointments);
    }
  }, [user]);


  if (!user) {
    return <p>Loading...</p>;
  }



  const fetchAppointments = async (email: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/user/${email}`);


      console.log(response.url)


      if (!response.ok) {
        throw new Error("failed in get data");
      }

      const data = await response.json();
      return data.appointments;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return [];
    }
  };

  const deleteAppointment = async (appointmentId: string) => {
    try {
      if (!appointmentId) {
        throw new Error("Missing appointmentId");
      }

      const response = await fetch(`http://localhost:5000/api/appointments/delete/${appointmentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete appointment");
      }

      const data = await response.json();
      console.log("🗑️ Appointment deleted successfully:", data);
      return data;
    } catch (error) {
      console.error("Error deleting appointment:", error);
      return null;
    }
  };

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
                <BreadcrumbPage>My Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="py-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="w-full md:w-1/4">
                <div className="bg-white rounded-xl border border-border/30 shadow-soft p-6 sticky top-24">
                  {/* User Profile */}
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src={user.photoURL} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">{user.displayName}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>

                  {/* Navigation */}
                  <nav className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Appointments
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Medical Records
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button onClick={logout} variant="ghost" className="w-full justify-start">
                      <LogOutIcon color="#f00" className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="w-full md:w-3/4">
                <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

                <Tabs defaultValue="upcoming">
                  <TabsList className="mb-6">
                    <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
                    <TabsTrigger value="past">Past Appointments</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming">
                    <div className="space-y-4">
                      {appointments.length === 0 ? (
                        <div className="flex font-bold my-4 items-center justify-center text-2xl">
                          <FileWarningIcon className="mr-2 h-8 w-8" />
                          No Appiontments Yet!
                        </div>
                      ) : (
                        <>
                          {appointments.map((appointment) => (
                            <Card key={appointment.id}>
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-lg">ِAmmar ElShreef</CardTitle>
                                  <Badge variant="default" >
                                    confirmed
                                  </Badge>
                                </div>
                                <CardDescription>Special</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="flex items-start gap-2">
                                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                      <p className="font-medium text-sm">Date</p>
                                      <p className="text-sm text-muted-foreground"> {new Date(appointment.date).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                      <p className="font-medium text-sm">Time</p>
                                      <p className="text-sm text-muted-foreground">{new Date(appointment.date).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      })}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2 sm:col-span-2">
                                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                      <p className="font-medium text-sm">Location</p>
                                      <p className="text-sm text-muted-foreground">Cairo, Egypt</p>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter className="flex justify-between">
                                <Button variant="outline" size="sm">
                                  Reschedule
                                </Button>
                                <Button onClick={() => deleteAppointment(appointment.id)} variant="destructive" size="sm">
                                  Cancel
                                </Button>
                              </CardFooter>
                            </Card>
                          ))}
                        </>
                      )}

                      <div className="pt-4">
                        <Button asChild>
                          <Link to="/doctors">Book New Appointment</Link>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="past">
                    <div className="space-y-4">
                      {pastAppointments.map((appointment) => (
                        <Card key={appointment.id}>
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{appointment.doctor}</CardTitle>
                              <Badge variant="secondary">
                                Completed
                              </Badge>
                            </div>
                            <CardDescription>{appointment.specialty}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex items-start gap-2">
                                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                  <p className="font-medium text-sm">Date</p>
                                  <p className="text-sm text-muted-foreground">{appointment.date}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                  <p className="font-medium text-sm">Time</p>
                                  <p className="text-sm text-muted-foreground">{appointment.time}</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2 sm:col-span-2">
                                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                  <p className="font-medium text-sm">Location</p>
                                  <p className="text-sm text-muted-foreground">{appointment.location}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button variant="default" size="sm">
                              Book Again
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
