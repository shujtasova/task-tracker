import { defineStore } from 'pinia'
import type { Task } from '~/types'

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: [] as Task[],
    }),

    actions: {
        addTask(task: Omit<Task, 'id'>) {
            const newTask: Task = { id: Date.now(), ...task }
            this.tasks.push(newTask)
            this.saveToLocalStorage()
        },

        deleteTask(id: number) {
            this.tasks = this.tasks.filter((task) => task.id !== id)
            this.saveToLocalStorage()
        },

        saveToLocalStorage() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        },

        loadFromLocalStorage() {
            const raw = localStorage.getItem('tasks')
            try {
                const parsed = raw ? JSON.parse(raw) : []
                this.tasks = Array.isArray(parsed) ? parsed : []
            } catch {
                this.tasks = []
            }
        },
    },
})
