using Microsoft.EntityFrameworkCore;
using TpProg2.Models;
using TpProg2.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configuraci�n de la conexi�n a la base de datos
builder.Services.AddDbContext<VeterinariaDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Repositorios
builder.Services.AddScoped<IMascotaRepository, MascotaRepository>();
builder.Services.AddScoped<IClienteRepository, ClienteRepository>();
builder.Services.AddScoped<IEspecieRepository, EspecieRepository>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendLocalhost", policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5500") // Cambia al origen correcto de tu frontend
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Condicional para entorno de desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Aplicar la pol�tica de CORS
app.UseCors("AllowFrontendLocalhost");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

