
using QuaveChallenge.API.Utils.Exceptions;

namespace QuaveChallenge.API.Middlewares;

public class ApplicationProblemMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ApplicationProblemException ex)
        {
            context.Response.StatusCode = (int) ex.StatusCode;
            await context.Response.WriteAsJsonAsync(ex.ProblemDetails);
        }
    }
}
