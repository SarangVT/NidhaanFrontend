'use client';
import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import dayjs from 'dayjs';

export const GET_DOCTOR_SLOTS_FOR_DATE = gql`
  query GetDoctorSlotsForDate($input: DoctorSlotsForDateInput!) {
    getDoctorSlotsForDate(input: $input) {
      slots {
        start
        end
        isTaken
      }
      pauseAllBookings
    }
  }
`;

export default function DoctorSlots({ doctor }: { doctor?: any }) {
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format('YYYY-MM-DD')
  );
  const [selectedSlot, setSelectedSlot] = useState<{
    date: string;
    start?: string;
    end?: string;
  } | null>(null);

  const shouldSkip = !doctor?.id;
  const { data, loading, error, refetch } = useQuery(GET_DOCTOR_SLOTS_FOR_DATE, {
    variables: shouldSkip
      ? undefined
      : { input: { doctorId: doctor.id, date: selectedDate } },
    skip: shouldSkip,
    fetchPolicy: 'network-only',
  });

  const slots = Array.isArray(data?.getDoctorSlotsForDate?.slots)
    ? data.getDoctorSlotsForDate.slots
    : [];
  const pauseAllBookings = data?.getDoctorSlotsForDate?.pauseAllBookings ?? false;
  const isBookEnabled = !!(selectedSlot?.date && selectedSlot?.start && selectedSlot?.end);

  // Refetch when date or doctor changes
  useEffect(() => {
    if (doctor?.id) {
      refetch({ input: { doctorId: doctor.id, date: selectedDate } });
      setSelectedSlot({ date: selectedDate });
    }
  }, [selectedDate, doctor?.id, refetch]);

  if (!doctor) return <p>Loading doctor info...</p>;

  const nextDays = Array.from({ length: 15 }).map((_, i) => dayjs().add(i, 'day'));

  return (
    <div className="md:w-1/3">
      <h2 className="text-2xl font-bold text-teal-600 mb-3">Select Appointment</h2>

      {pauseAllBookings ? (
        <p className="text-red-500 font-semibold">Booking is paused for this doctor</p>
      ) : (
        <>
          {/* Date pills */}
          <div className="flex overflow-x-auto gap-2 mb-4 pb-2">
            {nextDays.map((day) => {
              const iso = day.format('YYYY-MM-DD');
              const isSelected = selectedDate === iso;
              return (
                <button
                  key={iso}
                  className={`flex-shrink-0 rounded-lg p-2 w-14 text-center border-2 transition text-sm font-bold
                    ${isSelected ? 'border-green-500' : 'border-gray-200'}`}
                  onClick={() => setSelectedDate(iso)}
                >
                  <div>{day.format('ddd')}</div>
                  <div>{day.format('DD')}</div>
                </button>
              );
            })}
          </div>

          <div className="border rounded-lg p-3">
            <p className="font-semibold mb-2">{dayjs(selectedDate).format('ddd, DD MMM')}</p>

            {loading ? (
              <p className="text-sm">Loading slots...</p>
            ) : slots.length === 0 ? (
              <p className="text-sm">No available slots</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {slots.map((slot: any) => {
                    const isSelected =
                        selectedSlot?.date === selectedDate &&
                        selectedSlot?.start === slot.start &&
                        selectedSlot?.end === slot.end;

                    return (
                        <button
                        key={slot.start}
                        onClick={() =>
                            setSelectedSlot({
                            date: selectedDate,
                            start: slot.start,
                            end: slot.end,
                            })
                        }
                        className={`text-sm font-semibold py-2 rounded border transition
                            ${
                            isSelected
                                ? 'border-teal-600 bg-green-50'
                                : slot.isTaken
                                ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                        disabled={slot.isTaken}
                        >
                        {dayjs(`${selectedDate} ${slot.start}`, 'YYYY-MM-DD HH:mm').format('h:mm A')}
                        </button>
                    );
                })}
              </div>
            )}

            <button
              className={`mt-4 w-full py-2 rounded font-semibold text-white transition
                ${
                  isBookEnabled
                    ? 'bg-teal-600 hover:bg-teal-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              disabled={!isBookEnabled}
              onClick={() => console.log('Booking payload:', selectedSlot)}
            >
              Book Appointment
            </button>
          </div>
        </>
      )}
    </div>
  );
}
