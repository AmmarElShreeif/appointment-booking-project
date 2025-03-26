
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DoctorCard from "./DoctorCard";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { doctors, sortOptions, specialties } from "@/data";

// Filter and sort options


interface FilterState {
  search: string;
  specialty: string;
  availableOnly: boolean;
  sort: string;
}

export function DoctorList() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    specialty: "All Specialties",
    availableOnly: false,
    sort: "recommended",
  });

  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Apply filters and sorting
  useEffect(() => {
    let results = [...doctors];

    // Search filter
    if (filters.search) {
      results = results.filter(doctor =>
        doctor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Specialty filter
    if (filters.specialty !== "All Specialties") {
      results = results.filter(doctor =>
        doctor.specialty === filters.specialty
      );
    }

    // Available only filter
    if (filters.availableOnly) {
      results = results.filter(doctor => doctor.available);
    }

    // Apply sorting
    switch (filters.sort) {
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        results.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "recommended":
      default:
        // Recommended sorting logic - a mix of rating and featured
        results.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
    }

    setFilteredDoctors(results);
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      search: "",
      specialty: "All Specialties",
      availableOnly: false,
      sort: "recommended",
    });
  };

  const hasActiveFilters = filters.specialty !== "All Specialties" || filters.availableOnly || filters.search;

  return (
    <div className="w-full">
      {/* Desktop filters */}
      <div className="hidden md:block mb-6 space-y-5">
        {/* Search and filters row */}
        <div className="flex items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or specialty..."
              className="pl-10"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          <Select
            value={filters.specialty}
            onValueChange={(value) => setFilters({ ...filters, specialty: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.sort}
            onValueChange={(value) => setFilters({ ...filters, sort: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active filters row */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`rounded-full ${filters.availableOnly ? 'bg-primary/10 text-primary border-primary/20' : ''}`}
              onClick={() => setFilters({ ...filters, availableOnly: !filters.availableOnly })}
            >
              Available Today
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-muted-foreground"
              >
                <X className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'} found
          </p>
        </div>
      </div>

      {/* Mobile filters */}
      <div className="md:hidden mb-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={showMobileFilters ? 'bg-primary/10 text-primary border-primary/20' : ''}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-background border border-border rounded-lg p-4 space-y-4 overflow-hidden"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium">Specialty</label>
                <Select
                  value={filters.specialty}
                  onValueChange={(value) => setFilters({ ...filters, specialty: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sort by</label>
                <Select
                  value={filters.sort}
                  onValueChange={(value) => setFilters({ ...filters, sort: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                size="sm"
                className={`w-full rounded-full ${filters.availableOnly ? 'bg-primary/10 text-primary border-primary/20' : ''}`}
                onClick={() => setFilters({ ...filters, availableOnly: !filters.availableOnly })}
              >
                Available Today Only
              </Button>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => setShowMobileFilters(false)}
                >
                  Apply
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile active filters */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.specialty !== "All Specialties" && (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {filters.specialty}
                <button
                  onClick={() => setFilters({ ...filters, specialty: "All Specialties" })}
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {filters.availableOnly && (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Available Today
                <button
                  onClick={() => setFilters({ ...filters, availableOnly: false })}
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-xs text-muted-foreground h-7 px-2"
              >
                Clear all
              </Button>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            {filteredDoctors.length} found
          </p>
        </div>
      </div>

      {/* Doctor cards grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor, index) => (
            <DoctorCard
              key={doctor.id}
              id={doctor.id}
              name={doctor.name}
              specialty={doctor.specialty}
              rating={doctor.rating}
              reviews={doctor.reviews}
              location={doctor.location}
              image={doctor.image}
              available={doctor.available}
              featured={doctor.featured}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No doctors found</h3>
            <p className="text-muted-foreground mb-6">
              No doctors match your current filters. Try adjusting your search criteria.
            </p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default DoctorList;
