'use client'
import { useDoctorData } from "@/app/lib/contexts/DoctorContext";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

export const GET_DOCTOR_DETAILS = gql`
  query GetDoctorDetails {
    getDoctorDetails {
      id
      name
      email
      phone
      experience
      languages
      qualifications
      specializations
      location
      hospital
      fees
      image
      description
    }
  }
`;

export const GET_UPCOMING_APPOINTMENTS = gql`
  query GetUpcomingAppointments($limit: Int!) {
    upcomingAppointments(limit: $limit) {
      todayCount
      appointments {
        id
        date
        time
        status
        user {
          id
          firstName
          lastName
          phone
        }
      }
    }
  }
`;

export default function DoctorDashboard() {
  const router = useRouter();
  const { data: doctorData, loading: doctorLoading, error: doctorError } = useQuery(GET_DOCTOR_DETAILS);
  const { data: apptData, loading: apptLoading, error: apptError } = useQuery(GET_UPCOMING_APPOINTMENTS, {
    variables: { limit: 10 },
    fetchPolicy: "network-only"
  });

  if (doctorLoading || apptLoading) return <p>Loading...</p>;
  if (doctorError || apptError) return <p>Error loading dashboard data.</p>;

  const doctor = doctorData?.getDoctorDetails;
  const { todayCount, appointments } = apptData?.upcomingAppointments || { todayCount: 0, appointments: [] };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const nextSlot = appointments.length > 0 ? `${appointments[0].time}` : "No Slots";

  return (
    <main className="flex-1 bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-4xl leading-loose font-bold bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-600 text-transparent bg-clip-text">
            {getGreeting()}, Dr. {doctor?.name || "User"}
          </h2>
          <p className="text-sm font-bold text-gray-500">{new Date().toDateString()}</p>
        </div>
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
          onClick={() => router.push('/doctors/dashboard/slots')}
        >
          Schedule Slots
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card title="Today's Appointments" value={todayCount.toString()} />
        <Card title="Earnings This Week" value="₹7,800" />
        <Card title="Next Slot" value={nextSlot} />
        <Card title="Pending Feedback" value="2" />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-bold mb-4">Upcoming Appointments</h3>
        <AppointmentsTable appointments={appointments} />
      </div>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h4 className="text-gray-600 text-sm font-medium mb-2">{title}</h4>
      <p className="text-2xl font-bold text-teal-700">{value}</p>
    </div>
  );
}

function AppointmentsTable({ appointments }: { appointments: any[] }) {
  if (!appointments) return <p>No appointments data.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Sr No</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Patient Name</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Contact No</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Time</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500">No upcoming appointments</td>
            </tr>
          ) : (
            appointments.map((appt, index) => (
              <tr key={appt.id}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{appt.user.firstName} {appt.user.lastName}</td>
                <td className="px-6 py-4">{appt.user.phone}</td>
                <td className="px-6 py-4">{new Date(appt.date).toLocaleDateString("en-GB", {day: "2-digit", month: "2-digit", year: "numeric"})}</td>
                <td className="px-6 py-4">{appt.time}</td>
                <td className="px-6 py-4">
                  <button className="text-white bg-teal-600 hover:bg-teal-700 px-3 py-1 rounded">
                    Start
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}


