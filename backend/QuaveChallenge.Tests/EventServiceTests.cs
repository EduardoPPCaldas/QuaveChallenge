using Microsoft.EntityFrameworkCore;
using NSubstitute;
using QuaveChallenge.API.Data;
using QuaveChallenge.API.Models;
using QuaveChallenge.API.Services;
using QuaveChallenge.API.Utils.Exceptions;
using QuaveChallenge.Tests;
using QuaveChallenge.Tests.Utils;
using Xunit;

namespace QuaveChallenge.API.Tests.Services;

public class EventServiceTests
{
    private readonly EventService _eventService;
    private readonly ApplicationDbContext _mockContext;

    public EventServiceTests()
    {
        _mockContext = Substitute.For<ApplicationDbContext>(new DbContextOptions<ApplicationDbContext>());
        _eventService = new EventService(_mockContext);
    }

    [Fact]
    public async Task GetCommunitiesAsync_ReturnsAllCommunities()
    {
        // Arrange
        var communities = new List<Community>
        {
            new() { Id = 1, Name = "Community 1" },
            new() { Id = 2, Name = "Community 2" }
        };

        var mockSet = MockHelper.MockDbSet(communities);
        _mockContext.Communities.Returns(mockSet);

        // Act
        var result = await _eventService.GetCommunitiesAsync();

        // Assert
        Assert.Equal(2, result.Count());
        Assert.Contains(result, c => c.Name == "Community 1");
        Assert.Contains(result, c => c.Name == "Community 2");
    }

    [Fact]
    public async Task GetPeopleByEventAsync_ReturnsPeopleForSpecificCommunity()
    {
        // Arrange
        var people = new List<Person>
        {
            new() { Id = 1, FirstName = "Person 1", LastName = "Person 1", CommunityId = 1 },
            new() { Id = 2, FirstName = "Person 2", LastName = "Person 2", CommunityId = 1 },
            new() { Id = 3, FirstName = "Person 3", LastName = "Person 3", CommunityId = 2 }
        };

        var mockSet = MockHelper.MockDbSet(people);
        _mockContext.People.Returns(mockSet);

        // Act
        var result = await _eventService.GetPeopleByEventAsync(1);

        // Assert
        Assert.Equal(2, result.Count());
        Assert.Contains(result, p => p.FirstName == "Person 1");
        Assert.Contains(result, p => p.FirstName == "Person 2");
        Assert.DoesNotContain(result, p => p.FirstName == "Person 3");
    }

    [Fact]
    public async Task CheckInPersonAsync_UpdatesCheckInDate_WhenPersonExists()
    {
        // Arrange
        var people = new List<Person>
        {
            new() { Id = 1, FirstName = "Person 1", LastName = "Person 1", CheckInDate = null }
        };

        var mockSet = MockHelper.MockDbSet(people);
        _mockContext.People.Returns(mockSet);

        // Act
        var result = await _eventService.CheckInPersonAsync(1);

        // Assert
        Assert.NotNull(result.CheckInDate);
        Assert.Null(result.CheckOutDate);
    }

    [Fact]
    public async Task CheckInPersonAsync_Throws_WhenPersonNotFound()
    {
        // Arrange
        var people = new List<Person>();
        var mockSet = MockHelper.MockDbSet(people);
        _mockContext.People.Returns(mockSet);

        // Act & Assert
        await Assert.ThrowsAsync<ApplicationProblemException>(() =>
            _eventService.CheckInPersonAsync(1));
    }

    [Fact]
    public async Task CheckOutPersonAsync_UpdatesCheckOutDate_WhenPersonExists()
    {
        // Arrange
        var people = new List<Person>
        {
            new() { Id = 1, FirstName = "Person 1", LastName = "Person 1", CheckInDate = DateTime.UtcNow, CheckOutDate = null }
        };

        var mockSet = MockHelper.MockDbSet(people);
        _mockContext.People.Returns(mockSet);

        // Act
        var result = await _eventService.CheckOutPersonAsync(1);

        // Assert
        Assert.NotNull(result.CheckInDate);
        Assert.NotNull(result.CheckOutDate);
    }

    [Fact]
    public async Task CheckOutPersonAsync_Throws_WhenPersonNotFound()
    {
        // Arrange
        var people = new List<Person>();
        var mockSet = MockHelper.MockDbSet(people);
        _mockContext.People.Returns(mockSet);

        // Act & Assert
        await Assert.ThrowsAsync<ApplicationProblemException>(() =>
            _eventService.CheckOutPersonAsync(1));
    }

    [Fact]
    public async Task GetEventSummaryAsync_ReturnsCorrectSummary()
    {
        // Arrange
        var community = new Community
        {
            Id = 1,
            Name = "Test Community",
            People = new List<Person>
            {
                new() { Id = 1, FirstName = "Person 1", LastName = "Person 1", CompanyName = "Company A", CheckInDate = DateTime.UtcNow, CheckOutDate = null },
                new() { Id = 2, FirstName = "Person 2", LastName = "Person 2", CompanyName = "Company B", CheckInDate = DateTime.UtcNow, CheckOutDate = null },
                new() { Id = 3, FirstName = "Person 3", LastName = "Person 3", CompanyName = "Company A", CheckInDate = null, CheckOutDate = null },
                new() { Id = 4, FirstName = "Person 4", LastName = "Person 4", CompanyName = "Company C", CheckInDate = DateTime.UtcNow, CheckOutDate = DateTime.UtcNow }
            }
        };

        var communities = new List<Community> { community };
        var mockSet = MockHelper.MockDbSet(communities);
        _mockContext.Communities.Returns(mockSet);

        // Act
        var result = await _eventService.GetEventSummaryAsync(1);

        // Assert
        Assert.Equal(2, result.AttendeeCount);
        Assert.Equal(1, result.PeopleNotChecked);
        Assert.Equal(2, result.CompanyBreakdown.Count);
        Assert.Contains("Company A", result.CompanyBreakdown);
        Assert.Contains("Company B", result.CompanyBreakdown);
    }

    [Fact]
    public async Task GetEventSummaryAsync_Throws_WhenCommunityNotFound()
    {
        // Arrange
        var communities = new List<Community>();
        var mockSet = MockHelper.MockDbSet(communities);
        _mockContext.Communities.Returns(mockSet);

        // Act & Assert
        await Assert.ThrowsAsync<ApplicationProblemException>(() =>
            _eventService.GetEventSummaryAsync(1));
    }
}