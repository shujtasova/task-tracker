<template>
    <div class="form">
        <h2 class="form__title">Создать задачу</h2>
        <form class="form__body" @submit.prevent="handleSubmit">
            <div class="form__group">
                <label class="form__label" for="title">Название задачи*</label>
                <input
                    class="form__input"
                    id="title"
                    v-model="title"
                    type="text"
                    required
                />
            </div>

            <div class="form__group">
                <label class="form__label" for="date">Дата задачи*</label>
                <input
                    class="form__input"
                    id="date"
                    v-model="date"
                    type="date"
                    required
                />
            </div>

            <div class="form__group">
                <label class="form__label" for="description">Описание</label>
                <textarea
                    class="form__textarea"
                    id="description"
                    v-model="description"
                    rows="3"
                />
            </div>

            <div class="form__actions">
                <button class="form__submit" type="submit">Добавить</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { useTaskStore } from '@/stores/tasks'

const emit = defineEmits<{
    (e: 'created'): void
}>()

const title = ref('')
const date = ref('')
const description = ref('')

const taskStore = useTaskStore()

const handleSubmit = () => {
    if (!title.value || !date.value) return

    taskStore.addTask({
        title: title.value,
        date: date.value,
        description: description.value,
    })

    title.value = ''
    date.value = ''
    description.value = ''

    emit('created')
}
</script>

<style scoped lang="scss">
.form {
    max-width: 500px;
    margin: 2rem auto;
    background: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &__title {
        margin-bottom: 1rem;
        font-size: 1.4rem;
    }

    &__body {
        display: flex;
        flex-direction: column;
    }

    &__group {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
    }

    &__label {
        margin-bottom: 0.4rem;
        font-weight: 500;
    }

    &__input,
    &__textarea {
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;

        &:focus {
            outline: none;
            border-color: #888;
        }
    }

    &__actions {
        text-align: right;
    }

    &__submit {
        padding: 0.5rem 1rem;
        background-color: #007acc;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: #005fa3;
        }
    }
}
</style>
