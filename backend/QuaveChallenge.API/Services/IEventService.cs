using QuaveChallenge.API.Dtos;
using QuaveChallenge.API.Models;

namespace QuaveChallenge.API.Services
{
    public interface IEventService
    {
        Task<IEnumerable<Community>> GetCommunitiesAsync();
        Task<IEnumerable<Person>> GetPeopleByEventAsync(int communityId);
        Task<Person> CheckInPersonAsync(int personId);
        Task<Person> CheckOutPersonAsync(int personId);
        Task<EventSummary> GetEventSummaryAsync(int communityId);
    }
} 