<script setup lang="ts">
import { useLosStore } from '../stores/losStore'

const store = useLosStore()
</script>

<template>
  <div>
    <v-row no-gutters>
      <v-col
        v-for="step in store.steps"
        :key="step.index"
        cols="3"
        class="d-flex align-center ga-3 pa-3 cursor-pointer stepper-col"
        :class="{
          'stepper-active': store.currentStep === step.index,
        }"
        @click="store.goToStep(step.index)"
      >
        <v-avatar
          :size="28"
          :color="
            step.index < store.currentStep
              ? 'purple-darken-4'
              : step.index === store.currentStep
                ? 'primary'
                : 'grey-lighten-3'
          "
        >
          <v-icon
            v-if="step.index < store.currentStep"
            size="14"
            icon="mdi-check"
            color="white"
          />
          <span
            v-else
            class="text-caption font-weight-bold"
            :class="step.index === store.currentStep ? 'text-white' : 'text-grey'"
          >
            {{ step.index + 1 }}
          </span>
        </v-avatar>

        <div>
          <div
            class="text-caption font-weight-medium"
            :class="{
              'text-primary': store.currentStep === step.index || step.index < store.currentStep,
              'text-grey': step.index > store.currentStep,
            }"
          >
            {{ step.label }}
          </div>
          <div
            class="text-body-2 font-weight-bold"
            :class="{
              'text-primary': store.currentStep === step.index || step.index < store.currentStep,
              'text-grey': step.index > store.currentStep,
            }"
          >
            {{ step.name }}
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>


.stepper-col {
  border-right: 1px solid #e0e0e0;
  border-bottom: 3px solid transparent;
  transition: border-color 0.2s;
}

.stepper-col:last-child {
  border-right: none;
}

.stepper-active {
  border-bottom: 3px solid rgb(var(--v-theme-primary)) !important;
}
</style>