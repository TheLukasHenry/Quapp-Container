using Microsoft.AspNetCore.Identity;
using ServerC.Services;
using ServerC.Interfaces;
using ServerC.Models;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

// stored procedures
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IDatabaseHelper, DatabaseHelper>();
builder.Services.AddScoped<ICompaniesService, CompaniesService>();
builder.Services.AddScoped<IFeaturesService, FeaturesService>();
builder.Services.AddScoped<ITestCasesService, TestCasesService>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<ITestRunsService, TestRunsService>();
builder.Services.AddScoped<ICompanyUsersService, CompanyUsersService>();
builder.Services.AddScoped<ITestRunCasesService, TestRunCasesService>();
builder.Services.AddScoped<ITestResultsService, TestResultsService>();
builder.Services.AddScoped<LoginService>();
builder.Services.AddSingleton<JwtTokenHelper>();
builder.Services.AddSingleton(builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>());

// add cors
builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(
      builder =>
      {
        builder.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
      });
});

// Add JwtSettings to the service collection
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));

var jwtSettings = new JwtSettings();
builder.Configuration.Bind("JwtSettings", jwtSettings);

builder.Services.AddAuthentication(options =>
{
  options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
  options.TokenValidationParameters = new TokenValidationParameters
  {
    ValidateIssuer = true,
    ValidateAudience = true,
    ValidateLifetime = true,
    ValidateIssuerSigningKey = true,
    ValidIssuer = jwtSettings.Issuer,
    ValidAudience = jwtSettings.Audience,
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret))
  };
});

// Register the PasswordHasher<User>
builder.Services.AddSingleton<PasswordHasher<User>>();

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
  c.SwaggerDoc("v1", new OpenApiInfo { Title = "ServerC", Version = "v1" });
  c.AddServer(new OpenApiServer { Url = "http://localhost:5001" });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI(c =>
  {
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ServerC V1");
  });
}

// app.UseCors();

app.UseHttpsRedirection();


// app.UseAuthentication();
// app.UseAuthorization();
app.UseMiddleware<CustomApiKeyMiddleware>();

app.MapControllers();

app.Run();
