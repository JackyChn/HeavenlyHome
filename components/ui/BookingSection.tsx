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
import {
  BusinessBookedSlot,
  createNewBooking,
} from "@/app/_services/GlobalApi";
import moment from "moment";
import { toast } from "sonner";

interface Time {
  time: string;
}

function BookingSection({
  children,
  business,
}: {
  children: React.ReactNode;
  business: BusinessList;
}) {
  const [date, setDate] = useState<Date>(new Date());
  const [timeSlot, setTimeSlot] = useState<Time[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>();
  const [bookedSlot, setBookedSlot] = useState<Time[]>([]);
  const { data } = useSession();

  // set the timeSlot with initial render
  useEffect(() => {
    getTime();
  }, []);

  // business being passed in, then
  useEffect(() => {
    //Get Selected Date Business Booked Slot
    if (business) {
      BusinessBookedSlot(business.id, moment(date).format("DD-MMM-yyyy")).then(
        (res) => {
          // the res is an array, which includes all booked businesses, so every setBookedSlot with add new booked business within it by set it again completely
          setBookedSlot(res.bookings);
        },
      );
    }
  }, [business, date]);

  // set timeSlot[] with all time, from 10:00am to 6:30pm with 30min interval
  const getTime = () => {
    const timeList: Time[] = [];
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
      data?.user?.email,
      data?.user?.name,
    ).then(
      (res) => {
        if (res) {
          setDate(new Date());
          setSelectedTime("");
          // Toast Msg
          toast("Service Booked successfully!");
        }
      },
      (e) => {
        toast("Error while creating booking");
        //Error Toast Msg
      },
    );
  };

  const isSlotBooked = (time: string): boolean => {
    return !!bookedSlot.find((item) => item.time === time);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book an Service</SheetTitle>
            <SheetDescription>
              <div>Select Date and Time slot to book a service</div>
              <div className="mt-6 flex flex-col items-baseline gap-5">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(day) => {
                    if (day) setDate(day);
                  }}
                  className="rounded-md border"
                />
              </div>
              <div>
                <h2 className="my-5 font-bold">Select Time Slot</h2>
                <div className="grid grid-cols-3 gap-3">
                  {/* disabled time button selection if isSlotBooked, which checks time in bookedSlot */}
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
