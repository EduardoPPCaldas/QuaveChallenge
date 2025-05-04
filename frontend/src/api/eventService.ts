import { Community, EventSummaryData, Person } from "../types/event"

const API_BASE_URL = "http://localhost:5203"

export const fetchCommunities = async (): Promise<Community[]> => {
    const response = await fetch(`${API_BASE_URL}/api/event/communities`)
    if (!response.ok) throw new Error('Failed to fetch communities');
    return await response.json()
}

export const fetchPeople = async (eventId: string): Promise<Person[]> => {
  const response = await fetch(`${API_BASE_URL}/api/event/people/${eventId}`);
  if (!response.ok) throw new Error('Failed to fetch people');
  return await response.json();
};

export const fetchSummary = async (eventId: string): Promise<EventSummaryData | null> => {
  const response = await fetch(`${API_BASE_URL}/api/event/summary/${eventId}`);
  if (!response.ok) throw new Error('Failed to fetch people');
  return await response.json();
};

export const checkInPerson = async (personId: string): Promise<{ success: boolean }> => {
  const response = await fetch(`${API_BASE_URL}/api/event/check-in/${personId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to check in');
  return await response.json();
};

export const checkOutPerson = async (personId: string): Promise<{ success: boolean }> => {
  const response = await fetch(`${API_BASE_URL}/api/event/check-out/${personId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to check out');
  return await response.json();
};