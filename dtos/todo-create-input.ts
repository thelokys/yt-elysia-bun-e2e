import { t, type Static } from "elysia"

const TodoCreateInput = t.Object({
    title: t.String()
})

type TodoCreateInputType = Static<typeof TodoCreateInput>

export { TodoCreateInput }
export type { TodoCreateInputType }