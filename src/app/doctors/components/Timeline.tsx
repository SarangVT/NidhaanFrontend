const timelineData = [
  {
    step: "Step 1",
    title: "Create an Account on the Nidhaan Portal",
    description: "Sign up with your email id to get started.",
    image: "https://via.placeholder.com/150",
  },
  {
    step: "Step 2",
    title: "Upload Your Basic Details, Certifications and Qualifications",
    description: "Securely upload documents for verification and approval.",
    image: "https://via.placeholder.com/150",
  },
  {
    step: "Step 3",
    title: "Add Your Slots",
    description: "List your available time slots and services with pricing.",
    image: "https://via.placeholder.com/150",
  },
  {
    step: "Step 4",
    title: "Start Caring Patients and Expanding Your Network",
    description: "Meet online and care your patients with appropriate advice and prescription.",
    image: "https://via.placeholder.com/150",
  },
];

export default function Timeline() {
  return (
    <div className="flex flex-col items-center w-full py-10">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) }
          to { opacity: 1; transform: translateY(0) }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    <h2 className="text-5xl mb-20 text-left w-full leading-loose font-bold bg-gradient-to-r from-purple-600 via-fuchsia-500 to-red-200 bg-clip-text text-transparent">
    How to Register on the Portal
    </h2>
      <div className="relative w-full max-w-4xl">
        <div className="absolute left-4 sm:left-1/2 top-0 h-full w-0.5 bg-gray-300"></div>
        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`mb-12 flex flex-col sm:flex-row ${index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} relative animate-fadeInUp`}
          >
            <div className={`sm:w-1/2 flex justify-${index % 2 === 0 ? "end" : "start"} sm:px-8 items-center`}>
              <div className="bg-white rounded-lg p-8 shadow-md flex flex-col sm:flex-row items-center space-x-4 shadow-purple-200">
                <img
                  src={item.image}
                  alt={item.step}
                  className="w-24 h-24 rounded object-cover flex-shrink-0"
                />
                <div className="text-gray-800">
                  <div className="font-bold text-lg">{item.step}</div>
                  <div className="font-semibold mt-1">{item.title}</div>
                  <div className="mt-2 text-gray-600">{item.description}</div>
                </div>
              </div>
            </div>
            <div className="absolute left-4 sm:left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-red-500 flex items-center justify-center text-white font-bold">
            </div>
            <div className="sm:w-1/2 hidden sm:block"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
