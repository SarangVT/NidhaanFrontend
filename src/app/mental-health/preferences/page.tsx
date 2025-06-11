import TherapistCard from "./TherapistCard";
const therapistInfo = {
  name: 'Varsha',
  degrees: 'MPhil Clinical Psychology & MDMP',
  specialty: 'Clinical psychology',
  image: "/MentalHealth/profilePic.png",
  tags: [
    'ADHD', 'Addiction', 'Clinical', 'Crisis',
    'Depression', 'Emotional Regulation', 'Grief', 'Workplace',
    'Relationship',
  ],
  languages: ['English', 'Tamil', 'Hindi'],
  counselling: ['Individual', 'Couple'],
  nextSlot: 'Tue, 20 May 01:00 PM',
};

export default function TherapistDisplay () {
    return (
        <div className="bg-teal-50">
            <h1 className="text-teal-600 flex justify-center text-4xl font-bold p-8">Now, choose from the best counsellors</h1>
            <div className="flex justify-center p-5">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-12">
                <div><TherapistCard therapist={therapistInfo}/></div>
                <div><TherapistCard therapist={therapistInfo}/></div>
                <div><TherapistCard therapist={therapistInfo}/></div>
                <div><TherapistCard therapist={therapistInfo}/></div>
                <div><TherapistCard therapist={therapistInfo}/></div>
                <div><TherapistCard therapist={therapistInfo}/></div>
                <div><TherapistCard therapist={therapistInfo}/></div>
            </div>
            </div>
        </div>
    )
}