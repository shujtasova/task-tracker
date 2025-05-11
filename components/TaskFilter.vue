<template>
    <div class="filter">
        <input class="filter__input" type="date" v-model="model" />
        <button class="filter__clear" v-if="model" @click="clearDate">✕</button>
    </div>
</template>

<script setup lang="ts">
import { defineModel } from 'vue'

const model = defineModel<string | null>('modelValue')

const clearDate = () => {
    model.value = ''
}
</script>

<style scoped lang="scss">
.filter {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &__input {
        font-size: 1rem;
        padding: 0.4rem 0.6rem;
    }

    &__clear {
        background: transparent;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #888;

        &:hover {
            color: #333;
        }
    }
}
</style>
