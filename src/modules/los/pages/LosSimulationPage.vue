<script setup lang="ts">
import { useLosStore } from '../stores/losStore'
import ProgressStepper from '../components/ProgressStepper.vue'
import Step1Nasabah from '../steps/Step1Nasabah.vue'
import Step2Strategi from '../steps/Step2Strategi.vue'
import Step3Simulasi from '../steps/Step3Simulasi.vue'
import Step4Result from '../steps/Step4Result.vue'
import { useTheme } from 'vuetify'
import { ref, watchEffect, computed } from 'vue'

const store = useLosStore()
const stepComponents = [Step1Nasabah, Step2Strategi, Step3Simulasi, Step4Result]

const stepTitles = [
  'Customer Information Management',
  'External API & Rejection Strategy',
  'Limit Simulation & Calculation',
  'Final Integration Result',
]

const stepSubtitles = [
  'Step 1 of 4',
  'Step 2 of 4 — Configure Decision Rules',
  'Step 3 of 4 — Configure weightings and simulation parameters',
  'Step 4 of 4 — Core Banking Integration Complete',
]

const currentTitle = computed(() => stepTitles[store.currentStep])
const currentSubtitle = computed(() => stepSubtitles[store.currentStep])

// Theme switcher
const theme = useTheme()
const isDark = ref(theme.global.current.value.dark)
watchEffect(() => {
  theme.global.name.value = isDark.value ? 'dark' : 'bankCoreLightTheme'
})
</script>

<template>
  <v-layout class="d-flex flex-column h-screen">
    <!-- TOPNAV -->
    <v-app-bar
      flat
      
      color="surface"
      density="compact"
      height="85"
      class="position-sticky top-0 z-index-10 px-10"
      style="z-index: 1100;"
    >
      <div class="d-flex align-center flex-grow-1" style="min-width:0;">
        <div class="d-flex flex-column justify-center" style="min-width:0;">
          <span class="text-h6 font-weight-bold text-truncate">LOS Decision Engine</span>
          <span class="text-caption text-grey-darken-1 text-truncate" style="max-width:450px;">
            Simulate end-to-end loan origination process with dynamic data and decisioning
          </span>
        </div>
      </div>
      <template #append>
        <div class="d-flex align-center">
          <v-btn
            icon
            size="x-small"
            variant="outlined"
            :color="isDark ? 'primary' : 'grey-darken-1'"
            @click="isDark = !isDark"
            border="2"
            class="bg-transparent border-primary me-2"
          >
            <v-icon>
              {{ isDark ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}
            </v-icon>
          </v-btn>
          <v-btn
            color="primary"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-email"
            style="border-width:2px;"
          >
            Contact Us
          </v-btn>
        </div>
      </template>
    </v-app-bar>

    <!-- STEPPER -->
    <!-- <v-container fluid class="stepper-wrapper px-10 py-0 flex-grow-0">
      <ProgressStepper />
    </v-container> -->

    <!-- STEP HEADER (Progress Bar & Title) -->
    <v-container fluid class="px-10 pt-6 pb-0 flex-grow-0">
      <div class="d-flex align-center justify-space-between mb-2">
        <div class="text-h5 font-weight-bold">{{ currentTitle }}</div>
        <div class="text-body-2 text-grey font-weight-medium">{{ currentSubtitle }}</div>
      </div>
      <v-progress-linear
        :model-value="store.progressPercent"
        color="primary"
        rounded
        height="8"
        class="mb-0"
      />
    </v-container>

    <!-- MAIN BODY -->
    <v-container fluid class="flex-grow-1 overflow-y-auto px-10 py-6">
      <v-window v-model="store.currentStep">
        <v-window-item
          v-for="(_, index) in stepComponents"
          :key="index"
          :value="index"
        >
          <component :is="stepComponents[index]" />
        </v-window-item>
      </v-window>
    </v-container>

    <!-- FOOTER NAV -->
    <v-footer  app class="d-flex align-center justify-space-between px-10 py-2" color="surface">
      <v-btn
        variant="outlined"
        :disabled="store.isFirstStep"
        prepend-icon="mdi-arrow-left"
        @click="store.prevStep()"
      >
        Back
      </v-btn>

      <v-btn
        color="primary"
        :append-icon="store.isLastStep ? 'mdi-check' : 'mdi-arrow-right'"
        @click="store.nextStep()"
      >
        {{ store.isLastStep ? 'Finish' : 'Next Step' }}
      </v-btn>
    </v-footer>
  </v-layout>
</template>

<style>
.stepper-wrapper {
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
</style>