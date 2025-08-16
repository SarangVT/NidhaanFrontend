'use client';
import React, { useEffect, useState } from 'react';
import ProgressTabs from './components/ProgressTabs';
import BasicDetails from './components/BasicDetails';
import DocumentVerification from './components/Documents';
import BankDetails from './components/BankDetails';
import { useDoctorData } from '@/app/lib/contexts/DoctorContext';

export default function DoctorOnboardingPage () {
  const [currentStep, setCurrentStep] = useState(0);
  // const { DoctorId } = useDoctorData();
  // const client = useApolloClient();

  // const fetchCurrentStep = gql`
  //   query CurrentStepDoctor($DoctorId: Int!) {
  //     currentStepDoctor(DoctorId: $DoctorId) {
  //       curStep
  //     }
  //   }
  // `;

  // useEffect(() => {
  //   const loadCurrentStep = async () => {
  //     try {
  //       const { data } = await client.query({
  //         query: fetchCurrentStep,
  //         variables: { DoctorId },
  //         fetchPolicy: 'network-only',
  //       });
  //       if (data?.currentStep?.curStep !== undefined) {
  //         setCurrentStep(data.currentStep.curStep);
  //       }
  //     } catch (err) {
  //       console.error('Failed to fetch current step:', err);
  //     }
  //   };

    // if (DoctorId) {
    //   loadCurrentStep();
    // }
  // }, [DoctorId, client]);

  const steps = [
    <BasicDetails currentStep={currentStep} setCurrentStep={setCurrentStep} />,
    <DocumentVerification currentStep={currentStep} setCurrentStep={setCurrentStep} />,
    <BankDetails currentStep={currentStep} setCurrentStep={setCurrentStep} />,
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ProgressTabs currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className="flex p-6">{steps[currentStep]}</div>
    </div>
  );
};