import { ListUsuarios } from '@/presentation/views/ListUsuarios'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/consultarUsuarios')({
    component: ListUsuarios,
})


