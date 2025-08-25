'use client'
import { useParams } from 'next/navigation';
import { useQuery, gql } from '@apollo/client';
import DoctorInfo from './DoctorInfo';
import DoctorSlots from './DoctorSlots';

const GET_DOCTOR_INFO = gql`
  query GetDoctorInfo($id: Int!) {
    getDoctorInfo(id: $id) {
      id
      name
      experience
      languages
      qualifications
      location
      hospital
      image
      description
      registrationNo
      specializations
      fees
    }
  }
`;

export default function DoctorInfoPage() {
  const params = useParams();
  const idParam = Array.isArray((params as any).id)
    ? (params as any).id[0]
    : (params as any).id;
  const doctorId = idParam ? parseInt(idParam, 10) : NaN;

  const { data, loading, error } = useQuery(GET_DOCTOR_INFO, {
    variables: { id: doctorId },
    skip: !Number.isFinite(doctorId),
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <p>Loading doctor details...</p>;
  if (error || !data?.getDoctorInfo)
    return <p className="text-red-500">Error loading doctor</p>;

  const doctor = data.getDoctorInfo;

  return (
    <div className="max-w-6xl mx-auto mt-20 flex flex-col md:flex-row gap-16">
      <DoctorInfo doctor={doctor} />
      <DoctorSlots doctor={doctor} />
    </div>
  );
}
