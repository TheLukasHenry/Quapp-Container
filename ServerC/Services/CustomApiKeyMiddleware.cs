public class CustomApiKeyMiddleware
{
  private readonly RequestDelegate _next;
  private const string APIKEYNAME = "apikey";
  private const string APIKEYVALUE = "1234567890000"; // replace with your API key

  public CustomApiKeyMiddleware(RequestDelegate next)
  {
    _next = next;
  }

  public async Task InvokeAsync(HttpContext context)
  {
    var path = context.Request.Path;
    var isSwagger = context.Request.Headers.ContainsKey("Referer") &&
                    context.Request.Headers["Referer"].ToString().StartsWith("http://localhost:5001/swagger");

    if (path.StartsWithSegments("/swagger", StringComparison.OrdinalIgnoreCase) ||
        path.StartsWithSegments("/swagger/v1/swagger.json", StringComparison.OrdinalIgnoreCase) ||
        path.StartsWithSegments("/Swagger", StringComparison.OrdinalIgnoreCase) ||
        path.StartsWithSegments("/swagger-ui", StringComparison.OrdinalIgnoreCase) ||
        path.StartsWithSegments("/swagger-ui/index.html", StringComparison.OrdinalIgnoreCase) ||
        isSwagger)
    {
      await _next.Invoke(context);
      return;
    }

    if (!context.Request.Headers.Keys.Contains(APIKEYNAME) || context.Request.Headers[APIKEYNAME].First() != APIKEYVALUE)
    {
      context.Response.StatusCode = 401; // Unauthorized
      await context.Response.WriteAsync("Unauthorized");
      return;
    }

    await _next.Invoke(context);
  }
}
