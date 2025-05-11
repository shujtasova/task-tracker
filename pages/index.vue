<template>
    <div class="page">
        <div class="page__header">
            <h2 class="page__title">Ежедневник</h2>
            <TaskFilter v-model="selectedDate" class="page__filter" />
            <button
                class="page__add-btn"
                :class="{ 'page__add-btn--open': showForm }"
                @click="toggleForm"
            >
                <span class="page__add-icon">+</span>
            </button>
        </div>

        <task-form
            v-if="showForm"
            @created="handleTaskCreated"
            class="page__task-form"
        />

        <TaskList
            :tasks="filteredTasks"
            :opened-task-id="openedTaskId"
            @open="handleOpen"
            @close="handleClose"
            class="page__task-list"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTaskStore } from '@/stores/tasks'
import TaskForm from '@/components/TaskForm.vue'
import TaskFilter from '@/components/TaskFilter.vue'
import TaskList from '@/components/TaskList.vue'

const taskStore = useTaskStore()
const showForm = ref(false)
const selectedDate = ref('')
const openedTaskId = ref<number | null>(null)

const filteredTasks = computed(() => {
    return selectedDate.value
        ? taskStore.tasks.filter((task) => task.date === selectedDate.value)
        : taskStore.tasks
})

onMounted(() => {
    taskStore.loadFromLocalStorage()
})

const handleOpen = (id: number) => {
    openedTaskId.value = id
}

const handleClose = () => {
    openedTaskId.value = null
}

const handleTaskCreated = () => {
    showForm.value = false
}

const toggleForm = () => {
    showForm.value = !showForm.value
}
</script>

<style scoped lang="scss">
.page {
    padding: 1.5rem;
    max-width: 700px;
    margin: 0 auto;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 3rem;
    }

    &__title {
        margin: 0;
        font-size: 1.5rem;
    }

    &__add-btn {
        background-color: #007acc;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        border: none;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        font-size: 24px;
        line-height: 24px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: #005fa3;
        }

        &--open .page__add-icon {
            transform: rotate(45deg);
        }
    }

    &__add-icon {
        display: inline-block;
        font-size: 24px;
        transition: transform 0.2s ease;
    }

    &__task-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}
</style>
