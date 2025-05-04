// src/components/CheckInOutButtons.tsx
import React, { useState, useEffect } from 'react';
import { Person } from '../types/event';

interface CheckInOutButtonsProps {
  person: Person;
  onCheckIn: (personId: string) => Promise<void>;
  onCheckOut: (personId: string) => Promise<void>;
}

const CheckInOutButtons: React.FC<CheckInOutButtonsProps> = ({ 
  person, 
  onCheckIn, 
  onCheckOut 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isInCooldown, setIsInCooldown] = useState(false);

  const handleAction = async (action: () => Promise<void>) => {
    setIsProcessing(true);
    try {
      await action();
      setIsProcessing(false);
      setIsInCooldown(true);
      setTimeout(() => setIsInCooldown(false), 5000);
    } catch (error) {
      setIsProcessing(false);
      setIsInCooldown(false);
    }
  };

  if (person.checkOutDate) {
    return <span className="text-gray-500 text-sm">Checked out</span>;
  }

  const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
  );

  if (person.checkInDate) {
    return (
      <button
        onClick={() => handleAction(() => onCheckOut(person.id))}
        disabled={isProcessing || isInCooldown}
        className={`px-3 py-1 rounded text-xs flex items-center justify-center gap-2 transition-colors ${
          isProcessing || isInCooldown
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-red-500 text-white hover:bg-red-600'
        }`}
      >
        {isProcessing ? (
          <>
            <LoadingSpinner />
            Processing...
          </>
        ) : isInCooldown ? (
          <LoadingSpinner />
        ) : (
          'Check-out'
        )}
      </button>
    );
  }

  return (
    <button
      onClick={() => handleAction(() => onCheckIn(person.id))}
      disabled={isProcessing || isInCooldown}
      className={`px-3 py-1 rounded text-xs flex items-center justify-center gap-2 transition-colors ${
        isProcessing || isInCooldown
          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
          : 'bg-green-500 text-white hover:bg-green-600'
      }`}
    >
      {isProcessing ? (
        <>
          <LoadingSpinner />
          Processing...
        </>
      ) : isInCooldown ? (
        <LoadingSpinner />
      ) : (
        'Check-in'
      )}
    </button>
  );
};

export default CheckInOutButtons;