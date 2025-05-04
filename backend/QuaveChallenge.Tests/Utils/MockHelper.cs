using Microsoft.EntityFrameworkCore;
using NSubstitute;

namespace QuaveChallenge.Tests.Utils;

public static class MockHelper
{
    // Helper method to mock DbSet
    public static DbSet<T> MockDbSet<T>(List<T> data) where T : class
    {
        var queryable = data.AsQueryable();
        var mockSet = Substitute.For<DbSet<T>, IQueryable<T>, IAsyncEnumerable<T>>();

        // Setup sync query operations
        ((IQueryable<T>)mockSet).Provider.Returns(new TestAsyncQueryProvider<T>(queryable.Provider));
        ((IQueryable<T>)mockSet).Expression.Returns(queryable.Expression);
        ((IQueryable<T>)mockSet).ElementType.Returns(queryable.ElementType);
        ((IQueryable<T>)mockSet).GetEnumerator().Returns(queryable.GetEnumerator());

        // Setup async operations
        var cancellationToken = Arg.Any<CancellationToken>();
        ((IAsyncEnumerable<T>)mockSet)
            .GetAsyncEnumerator(cancellationToken)
            .Returns(new TestAsyncEnumerator<T>(queryable.GetEnumerator()));

        return mockSet;
    }
}
