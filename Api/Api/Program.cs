using Api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TestContext>(options =>
  options.UseSqlServer(builder.Configuration.GetConnectionString("dbConexion"))
);

builder.Services.AddCors(param => param.AddPolicy("MyPolicy", builder =>
  builder.AllowAnyOrigin().WithMethods("GET", "PUT", "POST", "DELETE").WithHeaders("*").AllowAnyMethod().AllowAnyHeader()
));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("MyPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
