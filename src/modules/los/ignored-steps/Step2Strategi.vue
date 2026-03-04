<script setup lang="ts">
import { useStep2 } from '../composables/useStep2'
import { useLosStore } from '../stores/losStore'
import SimulationParameterCard from '../components/SimulationParameterCard.vue'

const store = useLosStore()
const {
  rules,
  riskTags,
  timeline,
  dashboardStats,
  activeRulesCount,
  reviewRulesCount,
  getStatusColor,
  getTimelineDotColor,
  getTimelineBadgeColor,
} = useStep2()
</script>

<template>
  <v-row>
    <!-- LEFT SIDEBAR -->
    <v-col cols="12" md="3">
      <v-card class="pa-5 bg-blue-lighten-5 h-100 d-flex flex-column">
        <div class="text-subtitle-1 font-weight-bold text-blue-darken-3 mb-1">
          Rejection Engine
        </div>
        <div class="text-caption text-grey-darken-1 mb-4">
          Configure auto-rejection rules and risk thresholds to streamline credit decisioning.
        </div>

        <v-divider class="mb-4" />

        <div class="text-overline text-grey-darken-1 mb-2">Risk Categories</div>
        <div class="d-flex flex-wrap ga-1 mb-4">
          <v-chip
            v-for="tag in riskTags"
            :key="tag"
            size="small"
            color="primary"
            variant="tonal"
            prepend-icon="mdi-alert-circle-outline"
          >
            {{ tag }}
          </v-chip>
        </div>

        <div class="d-flex flex-column ga-2 mb-4">
          <v-card class="pa-3 d-flex align-center ga-3">
            <v-avatar size="32" color="blue-lighten-4" rounded="lg">
              <v-icon icon="mdi-shield-off-outline" size="16" color="blue-darken-2" />
            </v-avatar>
            <div>
              <div class="text-caption font-weight-bold text-uppercase">Auto-Reject</div>
              <div class="text-caption text-grey">{{ activeRulesCount }} rules active</div>
            </div>
          </v-card>
          <v-card class="pa-3 d-flex align-center ga-3">
            <v-avatar size="32" color="blue-lighten-4" rounded="lg">
              <v-icon icon="mdi-eye-outline" size="16" color="blue-darken-2" />
            </v-avatar>
            <div>
              <div class="text-caption font-weight-bold text-uppercase">Manual Review</div>
              <div class="text-caption text-primary">{{ reviewRulesCount }} pending cases</div>
            </div>
          </v-card>
        </div>

        <v-spacer />

        <!-- Progress -->
        <v-divider class="mb-3" />
        <div class="d-flex justify-space-between text-caption text-grey mb-1">
          <span>Progress</span>
          <span class="font-weight-bold text-primary">{{ store.progressPercent }}%</span>
        </div>
        <v-progress-linear
          :model-value="store.progressPercent"
          color="primary"
          rounded
          height="4"
          class="mb-3"
        />
        <div class="d-flex flex-column ga-1">
          <div
            v-for="step in store.steps"
            :key="step.index"
            class="d-flex align-center ga-2 text-caption"
          >
            <v-icon
              :icon="
                step.index < store.currentStep
                  ? 'mdi-check-circle'
                  : step.index === store.currentStep
                    ? 'mdi-radiobox-marked'
                    : 'mdi-radiobox-blank'
              "
              :color="
                step.index < store.currentStep
                  ? 'primary'
                  : step.index === store.currentStep
                    ? 'primary-lighten-1'
                    : 'grey-lighten-2'
              "
              size="14"
            />
            <span
              :class="{
                'font-weight-bold': step.index === store.currentStep,
                'text-grey': step.index > store.currentStep,
              }"
            >
              {{ step.name }}
            </span>
          </div>
        </div>
      </v-card>
    </v-col>

    <!-- MAIN CONTENT -->
    <v-col cols="12" md="9">
      <div class="mb-4">
        <div class="text-h6 font-weight-bold">Strategi Penolakan</div>
        <div class="text-body-2 text-grey">
          Konfigurasi aturan penolakan otomatis berdasarkan kriteria risiko dan kebijakan internal.
        </div>
      </div>

      <!-- Dashboard Stats -->
      <SimulationParameterCard :stats="dashboardStats" :columns="3" class="mb-4" />

      <!-- Rejection Rules Table -->
      <v-card class="pa-5 mb-4">
        <div class="d-flex align-center ga-2 text-subtitle-2 font-weight-bold mb-4 pb-3 border-b">
          <v-icon icon="mdi-format-list-checks" size="18" color="primary-lighten-1" />
          Aturan Penolakan Aktif
        </div>

        <v-table density="comfortable">
          <thead>
            <tr>
              <th class="text-overline">Rule</th>
              <th class="text-overline">Threshold</th>
              <th class="text-overline">Aksi</th>
              <th class="text-overline">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rule in rules" :key="rule.id">
              <td class="text-body-2">{{ rule.rule }}</td>
              <td class="text-body-2">{{ rule.threshold }}</td>
              <td class="text-body-2">{{ rule.action }}</td>
              <td>
                <v-chip
                  :color="getStatusColor(rule.status)"
                  size="x-small"
                  variant="tonal"
                >
                  {{ rule.status }}
                </v-chip>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>

      <!-- Timeline -->
      <v-card class="pa-5">
        <div class="d-flex align-center ga-2 text-subtitle-2 font-weight-bold mb-4 pb-3 border-b">
          <v-icon icon="mdi-timeline-outline" size="18" color="primary-lighten-1" />
          Rejection Flow Timeline
        </div>

        <v-timeline side="end" density="compact" truncate-line="both">
          <v-timeline-item
            v-for="(item, i) in timeline"
            :key="i"
            :dot-color="getTimelineDotColor(item.status)"
            size="x-small"
            :fill-dot="item.status === 'completed'"
          >
            <div class="text-subtitle-2 font-weight-bold">{{ item.title }}</div>
            <div class="text-caption text-grey">{{ item.description }}</div>
            <v-chip
              :color="getTimelineBadgeColor(item.status)"
              size="x-small"
              variant="tonal"
              class="mt-1"
            >
              {{ item.badge }}
            </v-chip>
          </v-timeline-item>
        </v-timeline>
      </v-card>
    </v-col>
  </v-row>
</template>
