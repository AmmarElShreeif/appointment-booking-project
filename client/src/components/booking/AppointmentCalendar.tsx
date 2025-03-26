
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format, isToday, isTomorrow, isAfter, isBefore, addDays, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AppointmentCalendarProps {
  onSelectDate: (date: Date) => void;
  unavailableDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
}

export function AppointmentCalendar({
  onSelectDate,
  unavailableDates = [],
  minDate = new Date(),
  maxDate = addDays(new Date(), 60),
}: AppointmentCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onSelectDate(selectedDate);
    }
  };
  
  // Custom day rendering to show availability indicators
  const renderDay = (day: Date) => {
    // Check if date is unavailable
    const isUnavailable = unavailableDates.some(unavailableDate => 
      isSameDay(day, unavailableDate)
    );
    
    // Check if date is in the past
    const isPast = isBefore(day, new Date()) && !isToday(day);
    
    // Check if date is outside allowed range
    const isOutOfRange = isBefore(day, minDate) || isAfter(day, maxDate);
    
    // Get day status for styling
    const isSelected = date ? isSameDay(day, date) : false;
    
    return (
      <div
        className={cn(
          "relative w-full h-full flex items-center justify-center rounded-md transition-all",
          isSelected 
            ? "bg-primary text-primary-foreground font-medium" 
            : isUnavailable 
              ? "bg-muted text-muted-foreground" 
              : isPast || isOutOfRange 
                ? "text-muted-foreground opacity-50" 
                : "hover:bg-primary/10",
          isToday(day) && !isSelected && "border border-primary text-primary"
        )}
      >
        {day.getDate()}
        
        {/* Availability indicator dot */}
        {!isPast && !isOutOfRange && !isUnavailable && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-green-500" />
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-border/30 shadow-soft p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Select Date</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Green dots indicate available dates. Select a date to see available time slots.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSelect}
        disabled={date => 
          isBefore(date, minDate) || 
          isAfter(date, maxDate) || 
          unavailableDates.some(unavailableDate => isSameDay(date, unavailableDate))
        }
        initialFocus
        className="rounded-md border-border"
        classNames={{
          head_cell: "text-muted-foreground font-normal",
          cell: "h-10 w-10 font-normal text-center p-0",
          day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          nav_button: "hover:bg-primary/10 rounded-full p-1",
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          caption: "flex justify-center py-2 relative items-center",
          caption_label: "text-sm font-medium",
          row: "flex justify-center mt-2",
        }}
        components={{
          IconLeft: () => <ChevronLeft className="h-4 w-4" />,
          IconRight: () => <ChevronRight className="h-4 w-4" />,
          Day: ({ date, ...props }) => (
            <button {...props} className="w-full p-0">
              {renderDay(date)}
            </button>
          )
        }}
      />
      
      <div className="mt-4 pt-4 border-t border-border/30">
        <div className="text-sm space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border border-primary" />
              <span className="text-muted-foreground">Today</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Selected</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-3 h-3 rounded-full bg-white">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-green-500" />
              </div>
              <span className="text-muted-foreground">Available</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted" />
              <span className="text-muted-foreground">Unavailable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCalendar;
