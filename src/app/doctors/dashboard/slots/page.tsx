"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { gql, useMutation, useQuery } from '@apollo/client';
import { useDoctorData } from "@/app/lib/contexts/DoctorContext";

const SAVE_DOCTOR_SCHEDULE = gql`
  mutation SaveDoctorSchedule($rules: [DoctorSlotRuleInput!]!, $overrides: [DoctorSlotOverrideInput!]!) {
    saveDoctorSchedule(rules: $rules, overrides: $overrides) {
      success
      message
    }
  }
`;

const GET_DOCTOR_SCHEDULE = gql`
  query GetDoctorSchedule {
    getDoctorSchedule {
      rules {
        dayOfWeek
        duration
        slots { start end isTaken }
      }
      overrides {
        date
        duration
        slots { start end isTaken }
      }
    }
  }
`;

const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
type Slot = { start: string; end: string };
type DaySlots = { slots: Slot[]; duration: number | null };

type DoctorSlotRuleInput = {
  dayOfWeek: number;
  slots: Slot[];
  duration: number | null;
};

type DoctorSlotOverrideInput = {
  date: string;
  slots: Slot[];
  duration: number | null;
};

const initialSchedule: Record<string, DaySlots> = weekDays.reduce(
  (acc, day) => {
    acc[day] = { slots: [], duration: 30 };
    return acc;
  },
  {} as Record<string, DaySlots>
);

const overrideDays = ["Today", "Tomorrow"];

export default function ScheduleSlots() {
  const { DoctorId } = useDoctorData();

  const [saveSchedule] = useMutation(SAVE_DOCTOR_SCHEDULE);
  const { data: fetchedData, loading: fetchingSchedule } = useQuery(GET_DOCTOR_SCHEDULE, {
    context: { fetchOptions: { credentials: 'include' } },
    fetchPolicy: "no-cache",
  });

  const [schedule, setSchedule] = useState(initialSchedule);
  const [overrides, setOverrides] = useState<Record<string, DaySlots>>({
    Today: { slots: [], duration: 30 },
    Tomorrow: { slots: [], duration: 30 },
  });

  const [showModal, setShowModal] = useState(false);
  const [modalGroup, setModalGroup] = useState<"regular" | "override">("regular");
  const [modalDay, setModalDay] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  // ✅ Hydrate state when schedule is fetched
  useEffect(() => {
    if (!fetchedData?.getDoctorSchedule) return;
    const { rules, overrides: fetchedOverrides } = fetchedData.getDoctorSchedule;

    // --- Map rules ---
    const scheduleFromDb: Record<string, DaySlots> = { ...initialSchedule };
    rules.forEach((r: any) => {
      const day = weekDays[r.dayOfWeek];
      scheduleFromDb[day] = {
        slots: r.slots.map((s: any) => ({ start: s.start, end: s.end })),
        duration: r.duration,
      };
    });

    // --- Map overrides ---
    const overridesFromDb: Record<string, DaySlots> = { Today: { slots: [], duration: 30 }, Tomorrow: { slots: [], duration: 30 } };
    fetchedOverrides.forEach((o: any) => {
      const oDate = new Date(o.date);
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      let key: string | null = null;
      if (oDate.toDateString() === today.toDateString()) key = "Today";
      if (oDate.toDateString() === tomorrow.toDateString()) key = "Tomorrow";

      if (key) {
        overridesFromDb[key] = {
          slots: o.slots.map((s: any) => ({ start: s.start, end: s.end })),
          duration: o.duration,
        };
      }
    });

    setSchedule(scheduleFromDb);
    setOverrides(overridesFromDb);
  }, [fetchedData]);

  const handleSaveSchedule = async (rules: any, overrides: any) => {
    try {
      const response = await saveSchedule({
        variables: { rules, overrides },
        context: { fetchOptions: { credentials: 'include' } },
        fetchPolicy: 'no-cache'
      });
      return response.data.saveDoctorSchedule;
    } catch (err: any) {
      console.error('Error saving schedule:', err);
      return { success: false, message: err.message };
    }
  };

  const addSlot = (group: "regular" | "override", day: string, newSlot: Slot) => {
    const target = group === "regular" ? schedule : overrides;
    const daySlots = target[day]?.slots || [];

    const overlap = daySlots.some((s) => !(newSlot.end <= s.start || newSlot.start >= s.end));
    if (overlap) return alert("Overlapping slot not allowed");

    const updated = [...daySlots, newSlot].sort((a, b) => a.start.localeCompare(b.start));

    if (group === "regular") {
      setSchedule({ ...schedule, [day]: { ...schedule[day], slots: updated } });
    } else {
      setOverrides({ ...overrides, [day]: { ...overrides[day], slots: updated } });
    }
  };

  const removeSlot = (group: "regular" | "override", day: string, idx: number) => {
    const updated = (group === "regular" ? schedule[day].slots : overrides[day].slots)
      .filter((_, i) => i !== idx);

    if (group === "regular") {
      setSchedule({ ...schedule, [day]: { ...schedule[day], slots: updated } });
    } else {
      setOverrides({ ...overrides, [day]: { ...overrides[day], slots: updated } });
    }
  };

  const handleDurationChange = (group: "regular" | "override", day: string, value: number | null) => {
    if (group === "regular") {
      setSchedule({ ...schedule, [day]: { ...schedule[day], duration: value } });
    } else {
      setOverrides({ ...overrides, [day]: { ...overrides[day], duration: value } });
    }
  };

  const handleSaveAll = async () => {
    const rules: DoctorSlotRuleInput[] = weekDays.map((day, idx) => ({
      dayOfWeek: idx,
      slots: schedule[day].slots,
      duration: schedule[day].duration,
    }));

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const overridesInput: DoctorSlotOverrideInput[] = overrideDays.map((day) => ({
      date: day === "Today" ? today.toISOString() : tomorrow.toISOString(),
      slots: overrides[day].slots,
      duration: overrides[day].duration,
    }));

    const response = await handleSaveSchedule(rules, overridesInput);
    if (response.success) alert('Schedule saved successfully');
    else alert('Error saving schedule: ' + response.message);
  };

  if (fetchingSchedule) {
    return <p className="p-6 text-gray-600">Loading schedule...</p>;
  }

  return (
    <div className="p-6 space-y-6 relative">
      <button
        onClick={handleSaveAll}
        className="absolute right-0 top-0 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
      >
        Save Schedule
      </button>

      {/* ------------- Override Slots ------------- */}
      <div>
        <h2 className="text-lg font-bold text-teal-700 mb-6">Override Slots</h2>
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-2 text-left text-sm font-bold text-gray-500">Day</th>
              <th className="px-6 py-2 text-left text-sm font-bold text-gray-500">Slots</th>
              <th className="px-6 py-2 text-left text-sm font-bold text-gray-500">Duration</th>
            </tr>
          </thead>
          <tbody>
            {overrideDays.map((day) => (
              <tr key={day} className="border-t">
                <td className="px-6 py-2 font-medium text-gray-800">{day}</td>
                <td className="px-6 py-2 flex flex-wrap space-x-2">
                  {overrides[day].slots.map((slot, idx) => (
                    <span
                      key={idx}
                      className="flex items-center bg-teal-100 text-teal-800 px-2 py-1 rounded-md text-sm"
                    >
                      {slot.start} - {slot.end}
                      <FiX
                        className="ml-1 cursor-pointer"
                        onClick={() => removeSlot("override", day, idx)}
                      />
                    </span>
                  ))}
                  <button
                    onClick={() => {
                      setModalGroup("override");
                      setModalDay(day);
                      setShowModal(true);
                    }}
                    className="border-2 border-dashed border-teal-400 text-teal-600 rounded-md px-2 py-1 flex items-center text-sm hover:bg-teal-50"
                  >
                    <FiPlus className="mr-1" /> Add Slot
                  </button>
                </td>
                <td className="px-6 py-2">
                  <input
                    type="number"
                    value={overrides[day].duration ?? ''}
                    onChange={(e) => handleDurationChange("override", day, e.target.value ? parseInt(e.target.value) : null)}
                    className="w-20 border border-gray-300 rounded px-2 py-1"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ------------- Regular Slots ------------- */}
      <div>
        <h2 className="text-lg font-bold text-teal-700 mb-6">Regular Slots</h2>
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-2 text-left text-sm font-bold text-gray-500">Day</th>
              <th className="px-6 py-2 text-left text-sm font-bold text-gray-500">Slots</th>
              <th className="px-6 py-2 text-left text-sm font-bold text-gray-500">Duration</th>
            </tr>
          </thead>
          <tbody>
            {weekDays.map((day) => (
              <tr key={day} className="border-t">
                <td className="px-6 py-2 font-medium text-gray-800">{day}</td>
                <td className="px-6 py-2 flex flex-wrap space-x-2">
                  {schedule[day].slots.map((slot, idx) => (
                    <span
                      key={idx}
                      className="flex items-center bg-teal-100 text-teal-800 px-2 py-1 rounded-md text-sm"
                    >
                      {slot.start} - {slot.end}
                      <FiX
                        className="ml-1 cursor-pointer"
                        onClick={() => removeSlot("regular", day, idx)}
                      />
                    </span>
                  ))}
                  <button
                    onClick={() => {
                      setModalGroup("regular");
                      setModalDay(day);
                      setShowModal(true);
                    }}
                    className="border-2 border-dashed border-teal-400 text-teal-600 rounded-md px-2 py-1 flex items-center text-sm hover:bg-teal-50"
                  >
                    <FiPlus className="mr-1" /> Add Slot
                  </button>
                </td>
                <td className="px-6 py-2">
                  <input
                    type="number"
                    value={schedule[day].duration ?? ''}
                    onChange={(e) => handleDurationChange("regular", day, e.target.value ? parseInt(e.target.value) : null)}
                    className="w-20 border border-gray-300 rounded px-2 py-1"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ------------- Add Slot Modal ------------- */}
      {showModal && (
        <div
          className="fixed inset-0 bg-opacity-10 backdrop-blur-xs flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-teal-700 mb-4">
              Add Slot for {modalDay}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!start || !end) return alert('Please fill correct time');
                    addSlot(modalGroup, modalDay, { start, end });
                    setShowModal(false);
                    setStart('');
                    setEnd('');
                  }}
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
