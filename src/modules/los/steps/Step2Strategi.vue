<script setup lang="ts">
import { ref } from 'vue'

interface Strategy {
  id: string
  name: string
  description: string
  checked: boolean
  badge?: { text: string; color: string }
  tooltip: string
}

const strategies = ref<Strategy[]>([
  {
    id: 'stratA',
    name: 'Existing Rejection Strategy A',
    description: 'Baseline credit score filtering (< 650) and debt-to-income ratio checks.',
    checked: true,
    badge: { text: 'Active', color: 'success' },
    tooltip: 'Standard risk assessment protocol v1.2',
  },
  {
    id: 'stratB',
    name: 'Existing Rejection Strategy B',
    description: 'Triggers manual review for applicants with incomplete employment history.',
    checked: true,
    badge: { text: 'Active', color: 'success' },
    tooltip: 'Secondary manual review triggers',
  },
  {
    id: 'highRisk',
    name: 'High Risk Employer Rule',
    description: 'Automatically flag applicants from industries with high volatility or turnover rates.',
    checked: false,
    tooltip: 'Industry specific flagging',
  },
  {
    id: 'suspicious',
    name: 'Suspicious Transaction Pattern',
    description: 'AI-driven analysis of bank statements to detect circular flow of funds.',
    checked: false,
    badge: { text: 'AI Beta', color: 'purple' },
    tooltip: 'ML based fraud detection',
  },
  {
    id: 'blacklist',
    name: 'Blacklist Database Match',
    description: 'Cross-reference applicants against OFAC, PEP, and internal fraud lists.',
    checked: false,
    tooltip: 'Government and internal sanctions',
  },
])

const apiFeatures = [
  { label: 'Real-time Connection', desc: 'Changes deploy instantly to production.', color: 'success' },
  { label: 'Audit Logging', desc: 'All rule changes are versioned and logged.', color: 'info' },
  { label: 'Fail-safe Mode', desc: 'Fallback rules if external APIs timeout.', color: 'purple' },
]
</script>

<template>
  <v-row>
    <!-- LEFT: Strategy Selection (70%) -->
    <v-col cols="12" lg="8">
      <v-card class="pa-6 mb-4">
        <div class="mb-4">
          <div class="text-h6 font-weight-bold">Strategy Control</div>
          <div class="text-body-2 text-grey mt-1">
            Select the rejection strategies and external data sources to apply for this loan product.
          </div>
        </div>

        <div class="d-flex flex-column ga-3">
          <v-card
            v-for="strategy in strategies"
            :key="strategy.id"
            variant="outlined"
            class="pa-4 cursor-pointer"
            :class="{ 'border-primary': strategy.checked }"
            @click="strategy.checked = !strategy.checked"
          >
            <div class="d-flex align-start ga-3">
              <v-checkbox
                v-model="strategy.checked"
                hide-details
                density="compact"
                class="mt-0 pt-0 flex-grow-0"
                @click.stop
              />
              <div class="flex-grow-1">
                <div class="d-flex align-center ga-2">
                  <span class="text-body-1 font-weight-medium">{{ strategy.name }}</span>
                  <v-tooltip :text="strategy.tooltip" location="top">
                    <template #activator="{ props }">
                      <v-icon v-bind="props" icon="mdi-information-outline" size="16" color="grey" />
                    </template>
                  </v-tooltip>
                </div>
                <p class="text-body-2 text-grey mt-1 mb-0">{{ strategy.description }}</p>
              </div>
              <v-chip
                v-if="strategy.badge"
                :color="strategy.badge.color"
                size="small"
                variant="tonal"
              >
                {{ strategy.badge.text }}
              </v-chip>
            </div>
          </v-card>
        </div>
      </v-card>
    </v-col>

    <!-- RIGHT: Info Panel (30%) -->
    <v-col cols="12" lg="4">
      <div class="d-flex flex-column ga-4" style="position: sticky; top: 100px;">
        <!-- Hero Card -->
        <v-card class="text-white" style="position:relative; overflow:hidden; background: #0f172a;">
          <v-img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1Qyf6Fcl_5bUKELKm9ntfAIImI50xyZ0JiYKpAZjvMtjZRKk54is0sBrgqn0rvdaBXhRwQLu93-DeXOhu6A_FCRUqZt0_4k71KZ3gt00SH_b8xgKOAQ6vWvOA1zH8brWd0ERZsOzDVKftRXIUcb3WcNvta1Vs4o8dgNJEuiMjS5Rv92ovb2JmOwI44iZezeH8o-DZZzHfuia5aSdgMMfCSksJ5zeVKJiLiByoBxL3XvqsOVxqepg6O4Aivr6NpmJPzEZsEkDJo_M"
            cover
            height="300"
            style="opacity: 0.4;"
          >
            <div style="position:absolute; inset:0; background: linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.6) 50%, transparent 100%);"></div>
          </v-img>
          <div class="pa-6" style="position:absolute; bottom:0; left:0; right:0; z-index:1;">
            <v-avatar color="white" variant="tonal" size="40" class="mb-3" rounded="lg">
              <v-icon icon="mdi-hub" color="blue-lighten-2" />
            </v-avatar>
            <div class="text-h6 font-weight-bold mb-2">Flexible Rule Engine</div>
            <p class="text-body-2 text-grey-lighten-1 mb-0">
              Our no-code workflow control allows you to integrate external APIs and adjust risk parameters in real-time without engineering support.
            </p>
          </div>
        </v-card>

        <!-- API Integration Info -->
        <v-card class="pa-5">
          <div class="d-flex align-center ga-2 mb-4">
            <v-icon icon="mdi-api" color="primary" />
            <span class="text-subtitle-2 font-weight-bold">API Integration</span>
          </div>
          <div class="d-flex flex-column ga-4">
            <div v-for="feature in apiFeatures" :key="feature.label" class="d-flex ga-3">
              <div class="mt-1">
                <div :style="{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: `rgb(var(--v-theme-${feature.color}))` }"></div>
              </div>
              <div>
                <div class="text-body-2 font-weight-medium">{{ feature.label }}</div>
                <div class="text-caption text-grey">{{ feature.desc }}</div>
              </div>
            </div>
          </div>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>
