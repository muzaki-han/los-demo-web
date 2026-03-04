<script setup lang="ts">
import { ref, computed } from 'vue'

interface StrategyCard {
  id: string
  title: string
  subtitle: string
  icon: string
  iconBg: string
  iconColor: string
  enabled: boolean
  weight: number
  calculatedLimit: number | null
}

const strategies = ref<StrategyCard[]>([
  {
    id: 'salary',
    title: 'Income Based on Salary',
    subtitle: 'Multiplier: 3.5x Net Monthly Salary',
    icon: 'mdi-currency-usd',
    iconBg: 'green-lighten-4',
    iconColor: 'green-darken-1',
    enabled: true,
    weight: 100,
    calculatedLimit: 45000,
  },
  {
    id: 'exposure',
    title: 'Loan Exposure Cap',
    subtitle: 'Total Exposure Ratio < 45%',
    icon: 'mdi-briefcase-outline',
    iconBg: 'blue-lighten-4',
    iconColor: 'blue-darken-1',
    enabled: true,
    weight: 80,
    calculatedLimit: 32500,
  },
  {
    id: 'mortgage',
    title: 'Mortgage Obligation',
    subtitle: 'Deduct Monthly Payment from Limit',
    icon: 'mdi-home-city-outline',
    iconBg: 'orange-lighten-4',
    iconColor: 'orange-darken-1',
    enabled: false,
    weight: 0,
    calculatedLimit: null,
  },
  {
    id: 'creditcard',
    title: 'Credit Card Utilization',
    subtitle: 'Impact factor if utilization > 70%',
    icon: 'mdi-credit-card-outline',
    iconBg: 'purple-lighten-4',
    iconColor: 'purple-darken-1',
    enabled: true,
    weight: 50,
    calculatedLimit: 38000,
  },
])

const proposedLimit = computed(() => {
  const activeStrategies = strategies.value.filter((s: StrategyCard) => s.enabled && s.calculatedLimit !== null)
  if (activeStrategies.length === 0) return 0
  return Math.min(...activeStrategies.map((s: StrategyCard) => s.calculatedLimit!))
})

const proposedLimitSource = computed(() => {
  const activeStrategies = strategies.value.filter((s: StrategyCard) => s.enabled && s.calculatedLimit !== null)
  if (activeStrategies.length === 0) return ''
  const min = Math.min(...activeStrategies.map((s: StrategyCard) => s.calculatedLimit!))
  return activeStrategies.find((s: StrategyCard) => s.calculatedLimit === min)?.title ?? ''
})

function formatCurrency(value: number): string {
  return '$' + value.toLocaleString('en-US')
}

function resetDefaults() {
  strategies.value[0].weight = 100
  strategies.value[0].enabled = true
  strategies.value[1].weight = 80
  strategies.value[1].enabled = true
  strategies.value[2].weight = 0
  strategies.value[2].enabled = false
  strategies.value[3].weight = 50
  strategies.value[3].enabled = true
}

const riskFactors = [
  { icon: 'mdi-check-circle', color: 'success', text: 'Salary stability coefficient (0.85)' },
  { icon: 'mdi-alert', color: 'warning', text: 'Previous delinquency history check' },
  { icon: 'mdi-information', color: 'primary', text: 'Cross-border exposure rules applied' },
]
</script>

<template>
  <v-row>
    <!-- LEFT: Strategy Cards (70%) -->
    <v-col cols="12" lg="8">
      <!-- Strategy Header -->
      <div class="d-flex align-center justify-space-between pb-3 mb-4" style="border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));">
        <div class="d-flex align-center ga-2">
          <v-icon icon="mdi-tune" color="primary" />
          <span class="text-subtitle-1 font-weight-bold">Active Strategies</span>
        </div>
        <v-btn variant="text" color="primary" size="small" @click="resetDefaults">Reset Defaults</v-btn>
      </div>

      <!-- Strategy Cards -->
      <div class="d-flex flex-column ga-4 mb-6">
        <v-card
          v-for="strategy in strategies"
          :key="strategy.id"
          class="pa-5"
          :style="{ opacity: strategy.enabled ? 1 : 0.6 }"
        >

          <div class="d-flex align-start justify-space-between flex-wrap ga-3">
            <div class="d-flex ga-3">
              <v-avatar :color="strategy.iconBg" size="48" rounded="lg">
                <v-icon :icon="strategy.icon" :color="strategy.iconColor" />
              </v-avatar>
              <div>
                <div class="text-body-1 font-weight-bold">{{ strategy.title }}</div>
                <div class="text-body-2 text-grey mt-1">{{ strategy.subtitle }}</div>
              </div>
            </div>
            <v-switch
              v-model="strategy.enabled"
              hide-details
              density="compact"
              color="primary"
              inset
            />
          </div>

          <v-row class="mt-4 pl-0 pl-sm-15" dense>
            <v-col cols="12" sm="6">
              <div class="d-flex justify-space-between text-caption font-weight-medium text-grey mb-1">
                <span>Weighting</span>
                <span>{{ strategy.enabled ? strategy.weight : 0 }}%</span>
              </div>
              <v-slider
                v-model="strategy.weight"
                :min="0"
                :max="100"
                :disabled="!strategy.enabled"
                hide-details
                color="primary"
                track-color="grey-lighten-3"
                thumb-size="16"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-card variant="flat" color="grey-lighten-4" class="pa-3 d-flex justify-space-between align-center">
                <span class="text-overline text-grey">Calculated Limit</span>
                <span class="text-subtitle-1 font-weight-bold">
                  {{ strategy.enabled && strategy.calculatedLimit ? formatCurrency(strategy.calculatedLimit) : '--' }}
                </span>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </div>

      <!-- Final Decision Logic -->
      <v-card class="pa-6" style="border-left: 4px solid rgb(var(--v-theme-primary));">
        <div class="d-flex flex-column flex-sm-row justify-space-between align-sm-center ga-4">
          <div>
            <div class="d-flex align-center ga-2 mb-2">
              <v-icon icon="mdi-gavel" color="primary" />
              <span class="text-subtitle-1 font-weight-bold">Final Decision Logic</span>
            </div>
            <p class="text-body-2 text-grey mb-0" style="max-width: 480px;">
              The system is configured to adopt a conservative risk approach. The
              <strong class="text-high-emphasis">lowest calculated value</strong>
              from all active strategies will be proposed as the final customer limit.
            </p>
          </div>
          <v-card variant="flat" color="primary" class="pa-4 text-center" style="min-width: 200px; background: rgba(var(--v-theme-primary), 0.05) !important; border: 1px solid rgba(var(--v-theme-primary), 0.2);">
            <div class="text-overline text-primary font-weight-bold mb-1">Proposed Limit</div>
            <div class="text-h4 font-weight-black">{{ formatCurrency(proposedLimit) }}</div>
            <v-chip size="x-small" variant="tonal" class="mt-2">
              Based on {{ proposedLimitSource }}
            </v-chip>
          </v-card>
        </div>
      </v-card>
    </v-col>

    <!-- RIGHT: Info Panel (30%) -->
    <v-col cols="12" lg="4">
      <v-card class="pa-6" color="grey-lighten-5" style="position: sticky; top: 100px;">
        <v-avatar color="blue-lighten-4" size="40" rounded="lg" class="mb-3">
          <v-icon icon="mdi-lightbulb-outline" color="primary" />
        </v-avatar>

        <div class="text-subtitle-1 font-weight-bold mb-3">Understanding the Calculation</div>
        <p class="text-body-2 text-grey mb-4">
          The decision engine runs multiple parallel simulations. By adjusting the weight sliders, you influence
          the sensitivity of the final score, but the <strong class="text-high-emphasis">Hard Limit Logic</strong>
          ensures regulatory compliance by defaulting to the most restrictive outcome.
        </p>

        <v-divider class="my-4" />

        <div class="text-body-2 font-weight-bold mb-3">Risk-Based Pricing Factors</div>
        <div class="d-flex flex-column ga-3">
          <div v-for="factor in riskFactors" :key="factor.text" class="d-flex ga-2 text-body-2 text-grey">
            <v-icon :icon="factor.icon" :color="factor.color" size="18" class="flex-shrink-0 mt-1" />
            <span>{{ factor.text }}</span>
          </div>
        </div>

        <!-- System Status -->
        <v-card variant="outlined" class="pa-4 mt-6">
          <div class="text-overline text-grey font-weight-bold mb-2">System Status</div>
          <div class="d-flex align-center ga-2 text-body-2 font-weight-medium text-success">
            <div class="position-relative" style="width: 8px; height: 8px;">
              <div style="position:absolute; inset:0; border-radius:50%; background:rgb(var(--v-theme-success)); animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite; opacity: 0.75;"></div>
              <div style="position:relative; width:8px; height:8px; border-radius:50%; background:rgb(var(--v-theme-success));"></div>
            </div>
            Live Scoring Active
          </div>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
