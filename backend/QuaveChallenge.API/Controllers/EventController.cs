using Microsoft.AspNetCore.Mvc;
using QuaveChallenge.API.Services;

namespace QuaveChallenge.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [HttpGet("communities")]
        public async Task<IActionResult> GetCommunities()
        {
            return Ok(await _eventService.GetCommunitiesAsync());
        }

        [HttpGet("people/{communityId}")]
        public async Task<IActionResult> GetPeople(int communityId)
        {
            return Ok(await _eventService.GetPeopleByEventAsync(communityId));
        }

        [HttpPost("check-in/{personId}")]
        public async Task<IActionResult> CheckIn(int personId)
        {
            return Ok(await _eventService.CheckInPersonAsync(personId));
        }

        [HttpPost("check-out/{personId}")]
        public async Task<IActionResult> CheckOut(int personId)
        {
            return Ok(await _eventService.CheckOutPersonAsync(personId));
        }

        [HttpGet("summary/{communityId}")]
        public async Task<IActionResult> GetSummary(int communityId)
        {
            return Ok(await _eventService.GetEventSummaryAsync(communityId));
        }
    }
} 