'use client';
import React, { useEffect, useState } from 'react';
import ProgressTabs from './components/ProgressTabs';
import AccountDetails from './components/AccountDetails';
import GSTDetails from './components/GSTDetails';
import BankDetails from './components/BankDetails';
import StoreDetails from './components/StoreDetails';
import { useSellerData } from '@/app/lib/contexts/SellerContext';
import { gql, useApolloClient } from '@apollo/client';

const SellerSignupPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { sellerId } = useSellerData();
  const client = useApolloClient();

  const fetchCurrentStep = gql`
    query CurrentStep($sellerId: Int!) {
      currentStep(sellerId: $sellerId) {
        curStep
      }
    }
  `;

  useEffect(() => {
    const loadCurrentStep = async () => {
      try {
        const { data } = await client.query({
          query: fetchCurrentStep,
          variables: { sellerId },
          fetchPolicy: 'network-only',
        });
        if (data?.currentStep?.curStep !== undefined) {
          setCurrentStep(data.currentStep.curStep);
        }
      } catch (err) {
        console.error('Failed to fetch current step:', err);
      }
    };

    if (sellerId) {
      loadCurrentStep();
    }
  }, [sellerId, client]);

  const storeDetails = {
    storeName: '',
    pharmacistName: '',
    pharmacistRegNo: '',
    inTime: '',
    outTime: '',
    workingDays: [],
    acceptsReturns: false,
    address: '',
    pincode: '',
    city: '',
    state: '',
    latitude: null,
    longitude: null,
  };

  const steps = [
    <AccountDetails currentStep={currentStep} setCurrentStep={setCurrentStep} />,
    <GSTDetails currentStep={currentStep} setCurrentStep={setCurrentStep} />,
    <StoreDetails data={storeDetails} currentStep={currentStep} setCurrentStep={setCurrentStep} sellerId={sellerId}/>,
    <BankDetails currentStep={currentStep} setCurrentStep={setCurrentStep} />,
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ProgressTabs currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <div className="flex p-6">{steps[currentStep]}</div>
    </div>
  );
};

export default SellerSignupPage;
