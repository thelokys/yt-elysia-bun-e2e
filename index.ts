import { Elysia, t } from "elysia"
import { TodoCreateInput } from "./dtos/todo-create-input"
type Todo = {
    id: number,
    title: string,
    isCompleted: boolean,
    createdAt: Date,
    updatedAt: Date,
}

const TODOS: Todo[] = []

const app = new Elysia()
    .get("/", () => {
        return {
            api: "está online"
        }
    })
    .get("/todos", () => {
        return TODOS
    })
    .get("/todos/:todoId", ({ params, set }) => {
        const foundTodoIndex = TODOS.findIndex(todo => todo.id === params.todoId)
        if (foundTodoIndex === -1) {
            set.status = 404
            return {
                message: "Todo não encontrado."
            }
        }

        return TODOS[foundTodoIndex]
    }, {
        params: t.Object({
            todoId: t.Numeric()
        })
    })
    .post("/todos", ({ set, body }) => {
        set.status = 201

        const newTodo: Todo = {
            id: TODOS.length + 1,
            title: body.title,
            isCompleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        TODOS.push(newTodo)
        return newTodo
    }, {
        body: TodoCreateInput
    })
    .listen(3000)

export { app }