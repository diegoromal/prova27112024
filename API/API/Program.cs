using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();

app.MapGet("/", () => "Prova A1");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5273/api/categoria/listar
app.MapGet("/api/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5273/api/categoria/cadastrar
app.MapPost("/api/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5273/api/tarefas/listar
app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.Include(x => x.Categoria).ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5273/api/tarefas/cadastrar
app.MapPost("/api/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

//GET: http://localhost:5273/tarefas/buscar/{id}
app.MapGet("/api/tarefas/buscar/{id}", ([FromRoute] string id,
    [FromServices] AppDataContext ctx) =>
{
    Tarefa? tarefa = ctx.Tarefas.Find(id);
    if (tarefa == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(tarefa);
});

//PUT: http://localhost:5273/tarefas/alterar/{id}

app.MapPut("/api/tarefas/alterar/{id}", ([FromRoute] string id,
    [FromBody] Tarefa tarefaAlterada,
    [FromServices] AppDataContext ctx) =>
{
    Tarefa? tarefa = ctx.Tarefas.Find(id);
    if (tarefa == null)
    {
        return Results.NotFound();
    }
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria is null)
    {
        return Results.NotFound();
    }
    tarefa.Categoria = categoria;
    tarefa.Titulo = tarefaAlterada.Titulo;
    tarefa.Descricao = tarefaAlterada.Descricao;
    tarefa.Status = tarefaAlterada.Status;
    ctx.Tarefas.Update(tarefa);
    ctx.SaveChanges();
    return Results.Ok(tarefa);
});

//GET: http://localhost:5273/tarefas/naoconcluidas
app.MapGet("/api/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefasNaoConcluidas = ctx.Tarefas.Where(tarefa => tarefa.Status != "Concluida" && tarefa.Status != "concluida").ToList();
    if (tarefasNaoConcluidas == null)
    {
        return Results.NotFound("Nenhuma tarefa não concluida encontrada");
    }
    return Results.Ok(ctx.Tarefas.Include(x => x.Categoria).ToList());
    
});

//GET: http://localhost:5273/tarefas/concluidas
app.MapGet("/api/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
     var tarefasConcluidas = ctx.Tarefas.Where(tarefa => tarefa.Status == "Concluida" && tarefa.Status == "concluida").ToList();
    if (tarefasConcluidas == null)
    {
        return Results.NotFound("Nenhuma tarefa concluida encontrada");
    }
    return Results.Ok(ctx.Tarefas.Include(x => x.Categoria).ToList());
});

app.UseCors("Acesso Total");

app.Run();
