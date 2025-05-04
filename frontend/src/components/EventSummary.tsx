import React from 'react';
import { Person, CompanyBreakdown, EventSummaryData } from '../types/event';

interface EventSummaryProps {
  summary: EventSummaryData | null;
  loading?: boolean
}


const EventSummary: React.FC<EventSummaryProps> = ({ summary, loading }) => {
if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Event Summary</h2>
        <div className="text-center py-4">Loading summary...</div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Event Summary</h2>
        <div className="text-center py-4 text-gray-500">No summary data available</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Event Summary</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-700">Current Attendees</h3>
          <p className="text-2xl font-bold">{summary.attendeeCount}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-700">Not Checked In</h3>
          <p className="text-2xl font-bold text-red-500">{summary.peopleNotChecked}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Company Breakdown</h3>
          <ul className="space-y-2">
            {Object.entries(summary.companyBreakdown).map(([company, count]) => (
              <li key={company} className="flex justify-between">
                <span className="text-gray-600">{company}</span>
                <span className="font-medium">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventSummary;