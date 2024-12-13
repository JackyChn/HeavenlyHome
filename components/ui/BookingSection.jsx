import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  BusinessBookedSlot,
  createNewBooking,
} from "@/app/_services/GlobalApi";
import moment from "moment";

function BookingSection({ children, business }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [bookedSlot, setBookedSlot] = useState([]);
  const { data } = useSession();

  console.log("business: ", business);

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    //Get Selected Date Business Booked Slot
    if (business)
      BusinessBookedSlot(business.id, moment(date).format("DD-MMM-yyyy")).then(
        (res) => {
          setBookedSlot(res.bookings);
        },
      );
  }, [business]);

  /**
   *
   */

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }

    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    createNewBooking(
      business.id,
      moment(date).format("DD-MMM-yyyy"),
      selectedTime,
      data.user.email,
      data.user.name,
    ).then(
      (resp) => {
        console.log(resp);
        if (resp) {
          setDate();
          setSelectedTime("");
          toast("Service Booked successfully!");
          // Toast Msg
        }
      },
      (e) => {
        toast("Error while creating booking");
        //Error Toast Msg
      },
    );
  };

  const isSlotBooked = (time) => {
    return bookedSlot.find((item) => item.time == time);
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book an Service</SheetTitle>
            <SheetDescription as="div">
              <div>Select Date and Time slot to book a service</div>
              <div className="flex flex-col items-baseline gap-5">
                <span className="mt-5 font-bold">Select Date</span>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              <div>
                <h2 className="my-5 font-bold">Select Time Slot</h2>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlot.map((item, index) => (
                    <Button
                      key={index}
                      disabled={isSlotBooked(item.time)}
                      variant="outline"
                      className={`rounded-full border p-2 px-3 hover:bg-primary hover:text-white ${
                        selectedTime == item.time && "bg-primary text-white"
                      }`}
                      onClick={() => setSelectedTime(item.time)}
                    >
                      {item.time}
                    </Button>
                  ))}
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="mt-5">
            <SheetClose asChild>
              <div className="flex gap-5">
                <Button variant="destructive" className="">
                  Cancel
                </Button>

                <Button
                  disabled={!(selectedTime && date)}
                  onClick={() => saveBooking()}
                >
                  Book
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;
