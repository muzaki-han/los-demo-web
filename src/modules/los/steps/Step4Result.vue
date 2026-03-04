<script setup lang="ts">
import { useLosStore } from '../stores/losStore'

const store = useLosStore()

const processingSteps = [
  { label: 'Credit Bureau Response Received', time: '0.2s' },
  { label: 'Internal Risk Engine Analysis Complete', time: '0.3s' },
  { label: 'Fraud Detection Passed', time: '0.1s' },
  { label: 'Core Banking System Updated', time: '0.2s' },
]

const automationFeatures = [
  {
    icon: 'mdi-flash',
    title: 'Instant Decisioning',
    desc: 'Reduced from 2 days to <1 second',
  },
  {
    icon: 'mdi-shield-check',
    title: 'Compliance Assured',
    desc: '100% audit trail generation',
  },
]
</script>

<template>
  <v-row>
    <!-- LEFT: Main Results (70%) -->
    <v-col cols="12" lg="8">
      <!-- Checklist Section -->
      <v-card class="pa-6 pa-sm-8 mb-6">
        <div class="d-flex align-center ga-3 mb-6">
          <v-icon icon="mdi-check-circle" color="success" size="32" />
          <div class="text-h5 font-weight-bold">Application Processing Complete</div>
        </div>

        <div class="d-flex flex-column ga-3 mb-6">
          <v-card
            v-for="(step, i) in processingSteps"
            :key="i"
            variant="flat"
            color="grey-lighten-5"
            class="pa-4 d-flex align-center justify-space-between"
          >
            <div class="d-flex align-center ga-3">
              <v-avatar size="24" color="green-lighten-4">
                <v-icon icon="mdi-check" size="14" color="success" />
              </v-avatar>
              <span class="text-body-1 font-weight-medium">{{ step.label }}</span>
            </div>
            <span class="text-body-2 text-grey">{{ step.time }}</span>
          </v-card>
        </div>

        <!-- Final Result Card -->
        <v-card class="text-white" style="position: relative; overflow: hidden; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);">
          <div
            style="position:absolute; inset:0; opacity:0.2; background-size:cover; background-position:center;"
            :style="{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAIhEsX1b1I4KwZ4gS6je-_k1f7OqCOyFJ2cZrd0jQ1uGj7ocYFWUVNyWyRPbdhgXcNzVyiDE8nKgbnMnAFuVPsfpLS2b_Li1eFXoPJ0f-54yDj7-zXvsghZxybOOuVJFvXzSEsykJSPI-5vF-Px7sGMttFLcNn7kOjy7JBlD33WXiLLUa3hPSyos1UjQuA50XwC9e011uLvyiM2V5kdd_4x-47NZ6pVYgpfiT0MfN6X1xne0BpVLcGvnlXfioHim2uSjMHRJsg14o')` }"
          ></div>

          <div class="d-flex flex-column flex-sm-row justify-space-between align-start align-sm-end ga-6 pa-6 pa-sm-8" style="position: relative; z-index: 1;">
            <div>
              <div class="d-flex align-center ga-2 mb-3">
                <v-chip color="success" size="small" variant="flat" class="font-weight-bold text-uppercase">
                  Approved
                </v-chip>
                <span class="text-grey-lighten-1 text-caption d-flex align-center ga-1">
                  <v-icon icon="mdi-timer-outline" size="14" /> Total Time: 0.8s
                </span>
              </div>
              <div class="text-h3 font-weight-bold mb-1">$50,000.00</div>
              <div class="text-body-2 text-grey-lighten-1">Approved Credit Limit</div>
            </div>

            <v-card
              variant="flat"
              class="pa-4"
              style="min-width: 140px; background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.1);"
            >
              <div class="text-caption text-grey-lighten-1 text-uppercase font-weight-medium mb-1">Risk Grade</div>
              <div class="d-flex align-center ga-2">
                <span class="text-h4 font-weight-bold text-white">A1</span>
                <div style="width:8px; height:8px; border-radius:50%; background:#4ade80; box-shadow: 0 0 8px rgba(74,222,128,0.6);"></div>
              </div>
              <div class="text-caption text-grey-lighten-1 mt-1">Excellent Profile</div>
            </v-card>
          </div>
        </v-card>
      </v-card>
    </v-col>

    <!-- RIGHT: Automation Impact (30%) -->
    <v-col cols="12" lg="4">
      <v-card class="pa-6 h-100 d-flex flex-column" style="background: rgba(var(--v-theme-primary), 0.03); border: 1px solid rgba(var(--v-theme-primary), 0.1);">
        <div class="mb-6">
          <v-avatar color="primary" variant="tonal" size="44" rounded="lg" class="mb-4">
            <v-icon icon="mdi-trending-up" />
          </v-avatar>
          <div class="text-h6 font-weight-bold mb-2">Automation Impact</div>
          <p class="text-body-2 text-grey">
            End-to-end automation reduces operational costs by approximately 45% per application and eliminates human error in data entry and risk assessment.
          </p>
        </div>

        <div class="d-flex flex-column ga-4 mb-6">
          <div v-for="feature in automationFeatures" :key="feature.title" class="d-flex align-start ga-3">
            <v-icon :icon="feature.icon" color="primary" size="20" class="mt-1" />
            <div>
              <div class="text-body-2 font-weight-bold">{{ feature.title }}</div>
              <div class="text-caption text-grey">{{ feature.desc }}</div>
            </div>
          </div>
        </div>

        <v-spacer />

        <v-divider class="mb-4" />

        <div class="text-body-2 font-weight-bold mb-3">Next Actions</div>
        <div class="d-flex flex-column ga-3">
          <v-btn color="primary" block prepend-icon="mdi-refresh" @click="store.resetAll()">
            Restart Demo
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
