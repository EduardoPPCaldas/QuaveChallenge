namespace QuaveChallenge.API.Dtos;

public class EventSummary
{
    public int AttendeeCount { get; set; }
    public Dictionary<string, int> CompanyBreakdown { get; set; } = [];
    public int PeopleNotChecked { get; set; }
}
