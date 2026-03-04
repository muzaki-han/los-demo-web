<script setup lang="ts">
import type { DashboardStat } from '../types/los.types'

defineProps<{
  stats: DashboardStat[]
  columns?: number
}>()
</script>

<template>
  <v-row dense>
    <v-col
      v-for="(stat, index) in stats"
      :key="index"
      :cols="12"
      :md="columns ? 12 / columns : 3"
    >
      <v-card class="pa-4">
        <div class="text-overline text-grey-darken-1 d-flex align-center ga-1 mb-1">
          <v-icon :icon="stat.icon" size="14" />
          {{ stat.label }}
        </div>
        <div class="text-h5 font-weight-bold">
          {{ stat.value }}
        </div>
        <div
          class="text-caption d-flex align-center ga-1 mt-1"
          :class="{
            'text-success': stat.trendType === 'positive',
            'text-warning': stat.trendType === 'warning',
            'text-grey': stat.trendType === 'neutral',
          }"
        >
          <v-icon :icon="stat.trendIcon" size="12" />
          {{ stat.trend }}
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
