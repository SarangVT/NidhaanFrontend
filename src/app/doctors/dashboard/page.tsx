'use client'
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

export const GET_DOCTOR_DETAILS = gql`
  query GetDoctorDetails($id: Int!) {
    getDoctorDetails(id: $id) {
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


export default function DoctorDashboard() {
  const doctorId = 3;
  const { data, loading, error } = useQuery(GET_DOCTOR_DETAILS, {
    variables: { id: doctorId }
  });

  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading doctor details.</p>;

  const doctor = data.getDoctorDetails;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex min-h-screen">
      <div
        className={`${
          menuOpen ? "w-64" : "w-16"
        } bg-teal-600 text-white font-bold transition-all duration-300 p-4 flex flex-col items-start`}
      >
        <button onClick={() => setMenuOpen(!menuOpen)} className="mb-6">
          <FiMenu size={24} />
        </button>
        {menuOpen && (
          <ul className="space-y-4">
            <li>Dashboard</li>
            <li>Appointments</li>
            <li>Patient Feedbacks</li>
            <li>Earnings</li>
            <li>Offers</li>
            <Link href="/doctors/dashboard/settings"><li>Settings</li></Link>
          </ul>
        )}
      </div>

      <main className="flex-1 bg-gray-50 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-4xl leading-loose font-bold bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-600 text-transparent bg-clip-text">
              {getGreeting()}, Dr. {doctor?.name || "User"}
            </h2>
            <p className="text-sm font-bold text-gray-500">{new Date().toDateString()}</p>
          </div>
          <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition">Schedule Slots</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card title="Today's Appointments" value="5" />
          <Card title="Earnings This Week" value="₹7,800" />
          <Card title="Next Slot" value="4:30 PM" />
          <Card title="Pending Feedback" value="2" />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4">Upcoming Appointments</h3>
          <AppointmentsTable />
        </div>
      </main>
    </div>
  );
}

function Card({ title, value }: {title: string, value: string}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h4 className="text-gray-600 text-sm font-medium mb-2">{title}</h4>
      <p className="text-2xl font-bold text-teal-700">{value}</p>
    </div>
  );
}

function AppointmentsTable() {
  const appointments = [
    { name: "John Doe", contact: "9876543210", time: "10:00 AM", category: "Follow-Up" },
    { name: "Jane Smith", contact: "9123456789", time: "11:30 AM" , category: "New Patient"},
    { name: "Michael Brown", contact: "9988776655", time: "1:00 PM", category: "New Patient" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Sr No</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Patient Name</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact No</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((appt, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900">{appt.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700">{appt.contact}</td>
              <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700">{appt.time}</td>
              <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700">{appt.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-white bg-teal-600 hover:bg-teal-700 px-3 py-1 rounded text-md font-semibold">Start</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}