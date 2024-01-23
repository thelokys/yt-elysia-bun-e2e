import { describe, test, expect } from "bun:test"
import { app } from "./"

describe("Servidor", () => {
    test("deve está de pé a api", async () => {
        const http = await app.handle(new Request("http://localhost/"))
        const json = await http.json()

        expect(http.status).toBe(200)

        expect(json).toStrictEqual({
            api: "está online"
        })
    })
})


//GET  /todos
//GET  /todos/1
//POST /todos

describe("TODOS", () => {
    test("deve listar os todos", async () => {
        const http = await app.handle(new Request("http://localhost/todos/"))
        const json = await http.json()

        expect(http.status).toBe(200)

        expect(json).toStrictEqual([])
    })

    test("criar um novo TODO", async () => {

        const newTodo = {
            title: "novo todo"
        }

        const http = await app.handle(new Request("http://localhost/todos/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTodo)
        }))

        const json = await http.json()

        expect(http.status).toBe(201)
        expect(json.title).toStrictEqual(newTodo.title)
        expect(json).toStrictEqual({
            id: expect.any(Number),
            title: expect.any(String),
            isCompleted: expect.any(Boolean),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        })
    })

    test("deve retornar 404 quando não encontrar o TODO", async () => {
        const http = await app.handle(new Request("http://localhost/todos/0"))
        const json = await http.json()

        expect(http.status).toBe(404)
        expect(json).toStrictEqual({
            message: "Todo não encontrado."
        })
    })

    test("deve conseguir recuperar um todo", async () => {
        const http = await app.handle(new Request("http://localhost/todos/1"))
        const json = await http.json()

        expect(http.status).toBe(200)
        expect(json.id).toBe(1)
        expect(json).toStrictEqual({
            id: expect.any(Number),
            title: expect.any(String),
            isCompleted: expect.any(Boolean),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        })
    })
})