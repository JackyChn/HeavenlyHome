"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import { GetUserBookingHistory } from "@/app/_services/GlobalApi";
import BookingHistoryList from "@/components/ui/BookingHistoryList";

function MyBooking() {
  const { data } = useSession();
  const [bookingHistory, setBookingHistory] = useState([]);
  useEffect(() => {
    if (data) {
      // Used to Get User Booking History
      GetUserBookingHistory(data?.user?.email).then((res) => {
        console.log(res);
        setBookingHistory(res.bookings);
      });
    }
  }, [data]);

  const filterData = (type: string) => {
    const result = bookingHistory.filter((item) =>
      type == "booked"
        ? new Date(item.date) >= new Date()
        : new Date(item.date) <= new Date(),
    );

    return result;
  };

  return (
    <div className="mx-5 my-10 md:mx-36">
      <h2 className="my-2 text-[20px] font-bold">My Bookings</h2>
      <Tabs defaultValue="booked" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="booked">Booked</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="booked">
          <BookingHistoryList
            bookingHistory={filterData("booked")}
            type="booked"
          />
        </TabsContent>
        <TabsContent value="completed">
          <BookingHistoryList
            bookingHistory={filterData("completed")}
            type="completed"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyBooking;
