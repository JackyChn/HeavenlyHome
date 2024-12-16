import { Calendar, Clock, MapPin, User } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import { deleteBooking } from "@/app/_services/GlobalApi";
import { cn } from "@/lib/utils";

interface HistoryBusiness {
  name: string;
  images: {
    url: string;
  }[];
  contactPerson: string;
  address: string;
}

interface HistoryBusinessListProps {
  businessList: HistoryBusiness[];
  date: string;
  id: string;
  time: string;
}

interface BookingHistoryProps {
  bookingHistory: HistoryBusinessListProps[];
  type: string;
}

function BookingHistoryList({ bookingHistory, type }: BookingHistoryProps) {
  const cancelAppointment = (bookingId: string) => {
    console.log("bookingId: ", bookingId);
    deleteBooking(bookingId).then(
      (res) => {
        if (res) {
          toast("Booking deleted successfully!");
        }
      },
      () => {
        toast("Error while canceling booking!");
      },
    );
  };

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {bookingHistory.map((booking) => (
        <div className="mb-5 rounded-lg border p-4" key={booking.id}>
          <div className="flex gap-4">
            {booking.businessList[0]?.images[0]?.url && (
              <Image
                src={booking.businessList[0].images[0].url}
                alt="Business image"
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
            )}
            <div className="flex flex-col gap-2">
              <h2 className="font-bold">
                {booking.businessList[0]?.name || "No Business Name"}
              </h2>
              <h2 className="flex gap-2 text-primary">
                <User />
                {booking.businessList[0]?.contactPerson || "No Contact Person"}
              </h2>
              <h2 className="flex gap-2 text-gray-500">
                <MapPin className="text-primary" />
                {booking.businessList[0]?.address || "No Address"}
              </h2>
              <h2 className="flex gap-2 text-gray-500">
                <Calendar className="text-primary" />
                Service on: <span className="text-black">{booking.date}</span>
              </h2>
              <h2 className="flex gap-2 text-gray-500">
                <Clock className="text-primary" />
                Time: <span className="text-black">{booking.time}</span>
              </h2>
              {type === "completed" ? (
                <div>Completed Service is uncancelable</div>
              ) : (
                <button
                  className={cn(
                    "mt-2 cursor-pointer rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600",
                  )}
                  onClick={() => cancelAppointment(booking.id)}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingHistoryList;
