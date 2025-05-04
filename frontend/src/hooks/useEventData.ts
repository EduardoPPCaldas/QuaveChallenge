import { useState, useEffect, useCallback } from 'react';
import { Community, EventSummaryData, Person } from '../types/event';
import { fetchCommunities, fetchPeople, checkInPerson, checkOutPerson, fetchSummary } from '../api/eventService';

interface UseCommunityDataReturn {
  communities: Community[];
  selectedCommunity: Community | null;
  setSelectedCommunity: (event: Community | null) => void;
  people: Person[];
  summary: EventSummaryData | null
  loading: boolean;
  error: string | null;
  handleCheckIn: (personId: string) => Promise<void>;
  handleCheckOut: (personId: string) => Promise<void>;
}

export const useCommunityData = (): UseCommunityDataReturn => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [summary, setSummary] = useState<EventSummaryData | null>(null)
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadPeople = useCallback(async () => {
    if (!selectedCommunity) return;
    
    try {
      setLoading(true);
      const [peopleData, summaryData] = await Promise.all([fetchPeople(selectedCommunity.id), fetchSummary(selectedCommunity.id)]);
      setPeople(peopleData);
      setSummary(summaryData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [selectedCommunity]);

  useEffect(() => {
    const loadCommunities = async () => {
      try {
        setLoading(true);
        const eventsData = await fetchCommunities();
        setCommunities(eventsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    loadCommunities();
  }, []);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  const handleCheckIn = async (personId: string) => {
    try {
      await checkInPerson(personId);
      await loadPeople(); // Refresh after check-in
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleCheckOut = async (personId: string) => {
    try {
      await checkOutPerson(personId);
      await loadPeople(); // Refresh after check-out
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return {
    communities,
    selectedCommunity,
    setSelectedCommunity,
    people,
    summary,
    loading,
    error,
    handleCheckIn,
    handleCheckOut,
  };
};