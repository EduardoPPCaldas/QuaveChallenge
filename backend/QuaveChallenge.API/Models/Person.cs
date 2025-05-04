using System;

namespace QuaveChallenge.API.Models;

public class Person
{

    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string? CompanyName { get; set; }
    public string? Title { get; set; }
    public DateTime? CheckInDate { get; set; }
    public DateTime? CheckOutDate { get; set; }
    public int CommunityId { get; set; }
    public Community Community { get; set; } = null!;
}
