import React from 'react';
import { useCommunityData } from '../hooks/useEventData';
import EventSelector from '../components/EventSelector';
import PersonList from '../components/PersonList';
import EventSummary from '../components/EventSummary';

const EventCheckInPage: React.FC = () => {
  const {
    communities,
    selectedCommunity,
    setSelectedCommunity,
    people,
    summary,
    loading,
    error,
    handleCheckIn,
    handleCheckOut
  } = useCommunityData();

  if (loading && !selectedCommunity) return <div className="text-center py-8">Loading events...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <EventSelector 
          communities={communities} 
          selectedEvent={selectedCommunity} 
          onSelectEvent={setSelectedCommunity} 
        />
        
        {selectedCommunity && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <PersonList
                people={people} 
                onCheckIn={handleCheckIn} 
                onCheckOut={handleCheckOut} 
              />
            </div>
            <div className="md:col-span-1">
              <EventSummary summary={summary} loading={loading} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCheckInPage;