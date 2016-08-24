package com.github.douglasjunior.javatodoapi;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

@Path("todos")
public class TodosResource {

    private static long countId = 1;
    private static final List<Todo> todos;
    
    static {
        todos = new ArrayList<>();
        todos.add(new Todo(countId++, "make react tutorial", false));
        todos.add(new Todo(countId++, "make angular tutorial 2", true));
        todos.add(new Todo(countId++, "make node tutorial 3", false));
    }
    
    @Context
    private UriInfo context;

    public TodosResource() {
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Todo> getAll(@Context HttpServletResponse res) {
        System.out.println("getAll");
        return todos;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Todo createTodo(Todo todo, @Context HttpServletResponse res) {
        System.out.println("createTodo");
        todo.setId(countId++);
        todos.add(todo);
        return todo;
    }
    
    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Todo deleteTodo(@PathParam("id") long id, @Context HttpServletResponse res) {
        System.out.println("deleteTodo");
        Todo todo = findById(id);
        todos.remove(todo);
        return todo;
    }
    
    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Todo updateTodo(@PathParam("id") long id, Todo newTodo) {
        System.out.println("updateTodo");
        Todo oldTodo = findById(id);
        oldTodo.setTask(newTodo.getTask());
        return oldTodo;
    }
    
    @PUT
    @Path("{id}/toggle")
    @Produces(MediaType.APPLICATION_JSON)
    public Todo toggleTodo(@PathParam("id") long id) {
        System.out.println("toggleTodo");
        Todo todo = findById(id);
        todo.setCompleted(!todo.isCompleted());
        return todo;
    }
    
    private Todo findById(long id){
        for (Todo t : todos) {
            if (t.getId() == id) {
                return t;
            }
        }
        return null;
    }
}
