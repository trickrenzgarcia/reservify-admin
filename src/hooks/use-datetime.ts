import { dateToday } from "@/lib/utils";
import React from "react";

export default function useDateTimeToday() {
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Return the formatted date as an object
  return {
    formattedDate: dateToday(currentDate),
  };
}
