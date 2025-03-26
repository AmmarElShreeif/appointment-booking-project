
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  available: boolean;
  featured?: boolean;
  index?: number;
}

export function DoctorCard({ 
  id,
  name,
  specialty,
  rating,
  reviews,
  location,
  image,
  available,
  featured = false,
  index = 0 
}: DoctorCardProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`rounded-2xl overflow-hidden border border-border/30 bg-white h-full flex flex-col ${
        featured ? "shadow-medium ring-1 ring-primary/10" : "shadow-soft hover:shadow-medium transition-shadow"
      }`}
    >
      {featured && (
        <div className="bg-primary/10 text-primary text-xs font-medium py-1 px-4 text-center">
          Highly Rated
        </div>
      )}
      
      <div className="aspect-[4/3] relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {available && (
          <Badge variant="default" className="absolute top-3 right-3 bg-green-500">
            Available Today
          </Badge>
        )}
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="font-medium text-sm">{rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
        </div>
        
        <h3 className="font-semibold text-lg mb-1">Dr. {name}</h3>
        <p className="text-primary text-sm font-medium mb-2">{specialty}</p>
        
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{location}</span>
        </div>
        
        <div className="mt-auto pt-4 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            asChild
          >
            <Link to={`/doctor/${id}`}>View Profile</Link>
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            asChild
          >
            <Link to={`/booking/${id}`}>
              <Calendar className="h-4 w-4 mr-1" />
              Book
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default DoctorCard;
