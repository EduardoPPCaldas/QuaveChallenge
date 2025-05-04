
import React from 'react';
import { Community } from '../types/event';

interface EventSelectorProps {
  communities: Community[];
  selectedEvent: Community | null;
  onSelectEvent: (event: Community | null) => void;
}

const EventSelector: React.FC<EventSelectorProps> = ({ 
  communities, 
  selectedEvent, 
  onSelectEvent 
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <label htmlFor="event-select" className="block text-sm font-medium text-gray-700 mb-1">
        Select an Event
      </label>
      <select
        id="event-select"
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        value={selectedEvent?.id || ''}
        onChange={(e) => {
          const community = communities.find(ev => ev.id.toString() === e.target.value);
          onSelectEvent(community || null);
        }}
      >
        <option value="">Select an event</option>
        {communities.map(event => (
          <option key={event.id} value={event.id}>
            {event.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EventSelector;