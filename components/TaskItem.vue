<template>
    <div
        v-if="!hidden || opened"
        class="task"
        @click="handleClick"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
    >
        <div class="task__header">
            <div class="task__info">
                <strong class="task__title">{{ task.title }}</strong> —
                <span class="task__date">{{ formattedDate }}</span>
            </div>
            <button
                :class="[
                    'task__delete-btn',
                    { 'task__delete-btn--visible': hover },
                ]"
                @click.stop="deleteTask"
            >
                <img
                    src="/public/icons/trash.svg"
                    alt="delete"
                    class="task__delete-icon"
                />
            </button>
        </div>

        <div v-if="opened" class="task__details">
            <p class="task__description">
                {{ task.description || 'Без описания' }}
            </p>
            <button class="task__back-btn" @click.stop="closeDetails">
                ← Назад
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'
import type { Task } from '~/types'
import { useTaskStore } from '@/stores/tasks'

const { task, opened, hidden } = defineProps<{
    task: Task
    opened: boolean
    hidden: boolean
}>()

const emit = defineEmits<{
    (e: 'open'): void
    (e: 'close'): void
}>()

const taskStore = useTaskStore()
const hover = ref(false)

const formattedDate = computed(() => {
    const date = new Date(task.date)
    return date.toLocaleDateString()
})

const handleClick = () => {
    emit('open')
}

const closeDetails = () => {
    emit('close')
}

const deleteTask = () => {
    taskStore.deleteTask(task.id)
}
</script>

<style scoped lang="scss">
.task {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: #fff;
    cursor: pointer;
    transition: box-shadow 0.2s;
    box-sizing: border-box;

    &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__info {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    &__title {
        font-weight: bold;
    }

    &__date {
        color: #666;
    }

    &__delete-btn {
        width: 24px;
        height: 24px;
        background: none;
        border: none;
        padding: 0;
        visibility: hidden;
        cursor: pointer;

        &--visible {
            visibility: visible;
        }
    }

    &__delete-icon {
        width: 100%;
        height: 100%;
    }

    &__details {
        margin-top: 1rem;
    }

    &__description {
        margin: 0;
    }

    &__back-btn {
        margin-top: 0.5rem;
        background: none;
        border: 1px solid #888;
        border-radius: 4px;
        padding: 0.3rem 0.6rem;
        cursor: pointer;
    }
}
</style>
