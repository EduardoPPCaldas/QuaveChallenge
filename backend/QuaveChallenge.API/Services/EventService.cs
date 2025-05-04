using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuaveChallenge.API.Data;
using QuaveChallenge.API.Dtos;
using QuaveChallenge.API.Models;
using QuaveChallenge.API.Utils.Exceptions;

namespace QuaveChallenge.API.Services
{
    public class EventService : IEventService
    {
        private readonly ApplicationDbContext _context;

        public EventService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Community>> GetCommunitiesAsync()
        {
            return await _context.Communities.ToListAsync();
        }

        public async Task<IEnumerable<Person>> GetPeopleByEventAsync(int communityId)
        {
            return await _context.People.Where(x => x.CommunityId == communityId).ToListAsync();
        }

        public async Task<Person> CheckInPersonAsync(int personId)
        {
            var person = await _context.People.FirstOrDefaultAsync(x => x.Id == personId)
                ?? throw new ApplicationProblemException(HttpStatusCode.NotFound, new ProblemDetails
            {
                Title = "Entity not found",
                Detail = $"Could not find any person with this Id {personId}",
                Status = (int) HttpStatusCode.NotFound
            });

            person.CheckInDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return person;
        }

        public async Task<Person> CheckOutPersonAsync(int personId)
        {
            var person = await _context.People.FirstOrDefaultAsync(x => x.Id == personId)
                ?? throw new ApplicationProblemException(HttpStatusCode.NotFound, new ProblemDetails
            {
                Title = "Entity not found",
                Detail = $"Could not find any person with this Id {personId}",
                Status = (int) HttpStatusCode.NotFound
            });

            person.CheckOutDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return person;
        }

        public async Task<EventSummary> GetEventSummaryAsync(int communityId)
        {
            var community = await _context.Communities.Include(x => x.People).FirstOrDefaultAsync(x => x.Id == communityId)
                ?? throw new ApplicationProblemException(HttpStatusCode.NotFound, new ProblemDetails
            {
                Title = "Entity not found",
                Detail = $"Could not find any community with this Id {communityId}",
                Status = (int) HttpStatusCode.NotFound
            });

            var peopleCheckedIn = community.People.Where(x => x is { CheckInDate: not null, CheckOutDate: null }).ToList();
            var peopleNotCheckedIn = community.People.Where(x => x is { CheckInDate: null }).ToList();
            var peopleWithCompany = peopleCheckedIn.Where(x => x.CompanyName is not null);

            return new EventSummary
            {
                AttendeeCount = peopleCheckedIn.Count,
                CompanyBreakdown = peopleWithCompany.GroupBy(x => x.CompanyName).ToDictionary(x => x.Key, g => g.Count()),
                PeopleNotChecked = peopleNotCheckedIn.Count
            };
        }
    }
} 