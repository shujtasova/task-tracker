<template>
    <div class="task-list">
        <TaskItem
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            :opened="openedTaskId === task.id"
            :hidden="openedTaskId !== null && openedTaskId !== task.id"
            @open="emit('open', task.id)"
            @close="emit('close')"
        />
    </div>
</template>

<script setup lang="ts">
import type { Task } from '~/types'

const props = defineProps<{
    tasks: Task[]
    openedTaskId: number | null
}>()

const emit = defineEmits<{
    (e: 'open', id: number): void
    (e: 'close'): void
}>()
</script>

<style scoped lang="scss">
.task-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
