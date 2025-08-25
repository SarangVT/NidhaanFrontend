'use client'
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_DOCTOR_APPOINTMENTS = gql`
  query DoctorAppointments($status: AppointmentStatus!) {
    doctorAppointments(status: $status) {
      id
      date
      time
      duration
      status
      amount
      user {
        id
        name
        phone
      }
    }
  }
`

const tabs = [
  { label: "Upcoming", status: "SCHEDULED" },
  { label: "Completed", status: "COMPLETED" },
  { label: "Cancelled", status: "CANCELLED" }
]

export default function Appointments() {
  const [activeTab, setActiveTab] = useState("SCHEDULED")

  const { data, loading } = useQuery(GET_DOCTOR_APPOINTMENTS, {
    variables: { status: activeTab },
    fetchPolicy: "network-only",
    context: { credentials: 'include' }
  })

  return (
    <div className="p-4">
      <div className="flex space-x-4 border-b border-b-gray-400 mb-4">
        {tabs.map(tab => (
          <button
            key={tab.status}
            onClick={() => setActiveTab(tab.status)}
            className={`pb-2 px-4 font-semibold ${
              activeTab === tab.status ? "border-b-2 border-teal-600 text-teal-600" : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <AppointmentsTable appointments={data?.doctorAppointments || []} />
      )}
    </div>
  )
}

function AppointmentsTable({ appointments }: any) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Sr No</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Patient Name</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Time</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Category</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-6 text-gray-500">No appointments found</td>
            </tr>
          ) : (
            appointments.map((appt: any, index: number) => (
              <tr key={appt.id}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{appt.user.name}</td>
                <td className="px-6 py-4">{appt.user.phone}</td>
                <td className="px-6 py-4">{new Date(appt.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">{appt.time}</td>
                <td className="px-6 py-4">{appt.status}</td>
                <td className="px-6 py-4">
                  <button className="text-white bg-teal-600 hover:bg-teal-700 px-3 py-1 rounded">
                    {appt.status === "SCHEDULED" ? "Start" : "View"}
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
