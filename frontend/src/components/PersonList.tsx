// src/components/PersonList.tsx
import React from 'react';
import { Person } from '../types/event';
import CheckInOutButtons from './CheckInOutButtons';

interface PersonListProps {
  people: Person[];
  onCheckIn: (personId: string) => Promise<void>;
  onCheckOut: (personId: string) => Promise<void>;
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const PersonList: React.FC<PersonListProps> = ({ 
  people, 
  onCheckIn, 
  onCheckOut, 
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Registered Attendees</h2>
      </div>
      
      {people.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No attendees found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Check-In</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Check-Out</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {people.map((person) => (
                <tr key={person.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {person.firstName} {person.lastName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 truncate max-w-[150px]">
                    {person.companyName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 truncate max-w-[150px]">
                    {person.title}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(person.checkInDate)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(person.checkOutDate)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <CheckInOutButtons 
                      person={person} 
                      onCheckIn={onCheckIn} 
                      onCheckOut={onCheckOut} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PersonList;