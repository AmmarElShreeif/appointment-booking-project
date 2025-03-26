export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  available: boolean;
  featured?: boolean;
  bio?: string;
  education?: string[];
  experience?: string[];
  languages?: string[];
  insurance?: string[];
}

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "Doctors", path: "/doctors" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export const teamMembers = [
  {
    name: "Dr. Emma Wilson",
    role: "Founder & Medical Director",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Dr. James Chen",
    role: "Chief Medical Officer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Sarah Johnson",
    role: "Chief Technology Officer",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Michael Turner",
    role: "Head of Customer Experience",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
];

export const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Highest Rated" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
];

export const specialties = [
  "All Specialties",
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Gynecology",
  "Ophthalmology",
];

export const doctors = [
  {
    id: "dr-1",
    name: "Sarah Johnson",
    specialty: "Cardiology",
    rating: 4.9,
    reviews: 124,
    location: "New York Medical Center",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    available: true,
    featured: true,
    bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and heart failure management.",
    education: [
      "MD, Harvard Medical School",
      "Residency, Massachusetts General Hospital",
      "Fellowship in Cardiology, Cleveland Clinic",
    ],
    experience: [
      "Chief of Cardiology, New York Medical Center (2018-Present)",
      "Associate Professor of Medicine, Columbia University (2015-2018)",
      "Staff Cardiologist, Mayo Clinic (2010-2015)",
    ],
    languages: ["English", "Spanish"],
    insurance: ["Aetna", "Blue Cross", "Cigna", "Medicare"],
  },
  {
    id: "dr-2",
    name: "Michael Chen",
    specialty: "Dermatology",
    rating: 4.8,
    reviews: 98,
    location: "Skin Health Clinic, Brooklyn",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    available: true,
    bio: "Dr. Michael Chen is a dermatologist who specializes in treating skin conditions like acne, eczema, and psoriasis. He's known for his patient-centered approach to skincare.",
    education: [
      "MD, Stanford University School of Medicine",
      "Residency in Dermatology, UCSF Medical Center",
    ],
    languages: ["English", "Mandarin"],
    insurance: ["Aetna", "United Healthcare", "Cigna"],
  },
  {
    id: "dr-3",
    name: "Emily Rodriguez",
    specialty: "Pediatrics",
    rating: 4.9,
    reviews: 156,
    location: "Children's Wellness Center",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    available: true,
    featured: true,
    bio: "Dr. Emily Rodriguez is a compassionate pediatrician with special interest in newborn care, childhood development, and adolescent medicine.",
    education: [
      "MD, Johns Hopkins University School of Medicine",
      "Residency in Pediatrics, Boston Children's Hospital",
    ],
    languages: ["English", "Spanish", "Portuguese"],
    insurance: ["Blue Cross", "Cigna", "Humana", "Medicaid"],
  },
  {
    id: "dr-4",
    name: "David Wilson",
    specialty: "Orthopedics",
    rating: 4.7,
    reviews: 87,
    location: "Manhattan Sports Medicine",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    available: false,
    bio: "Dr. David Wilson specializes in sports medicine, joint replacement, and minimally invasive orthopedic surgery. He works with athletes of all levels.",
    education: [
      "MD, Duke University School of Medicine",
      "Residency in Orthopedic Surgery, Hospital for Special Surgery",
      "Fellowship in Sports Medicine, Andrews Institute",
    ],
    languages: ["English"],
    insurance: ["Aetna", "Blue Cross", "United Healthcare"],
  },
  {
    id: "dr-5",
    name: "Priya Patel",
    specialty: "Neurology",
    rating: 4.8,
    reviews: 112,
    location: "Neurological Institute of New York",
    image:
      "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    available: true,
    bio: "Dr. Priya Patel is a neurologist specializing in headache disorders, multiple sclerosis, and neurodegenerative diseases. She takes a holistic approach to neurological care.",
    education: [
      "MD, Yale School of Medicine",
      "Residency in Neurology, NYU Langone",
      "Fellowship in Headache Medicine, Mayo Clinic",
    ],
    languages: ["English", "Hindi", "Gujarati"],
    insurance: ["Medicare", "Aetna", "Cigna", "Oxford"],
  },
  {
    id: "dr-6",
    name: "James Thompson",
    specialty: "Gynecology",
    rating: 4.6,
    reviews: 76,
    location: "Women's Health Associates",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    available: false,
    bio: "Dr. James Thompson is an OB/GYN who provides comprehensive women's health services, from routine exams to complex surgeries and pregnancy care.",
    education: [
      "MD, University of Pennsylvania School of Medicine",
      "Residency in Obstetrics and Gynecology, Brigham and Women's Hospital",
    ],
    languages: ["English"],
    insurance: ["Blue Cross", "Cigna", "United Healthcare"],
  },
];

// Mock upcoming appointments
export const upcomingAppointments = [
  {
    id: "1",
    name: "Dr. Sarah Wilson",
    specialty: "Cardiologist",
    date: "Monday, June 10, 2023",
    time: "10:30 AM",
    location: "123 Medical Center, San Francisco",
  },
  {
    id: "2",
    doctor: "Dr. Michael Chen",
    specialty: "Dermatologist",
    date: "Thursday, June 20, 2023",
    time: "3:00 PM",
    location: "456 Health Clinic, San Francisco",
    status: "pending",
  },
];

// Mock past appointments
export const pastAppointments = [
  {
    id: "3",
    doctor: "Dr. James Smith",
    specialty: "General Practitioner",
    date: "Tuesday, May 15, 2023",
    time: "9:00 AM",
    location: "789 Family Practice, San Francisco",
    status: "completed",
  },
  {
    id: "4",
    doctor: "Dr. Emily Johnson",
    specialty: "Neurologist",
    date: "Friday, April 28, 2023",
    time: "2:15 PM",
    location: "321 Neurology Center, San Francisco",
    status: "completed",
  },
];
