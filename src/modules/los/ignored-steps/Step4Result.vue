<script setup lang="ts">
import { useDecisionEngine } from '../composables/useDecisionEngine'
import { useLosStore } from '../stores/losStore'
import ResultSummaryCard from '../components/ResultSummaryCard.vue'

const store = useLosStore()
const {
  scores,
  totalScore,
  decision,
  decisionColor,
  decisionLabel,
  decisionIcon,
  decisionParameters,
  summaryStats,
  formatRupiah,
  getParameterStatusColor,
} = useDecisionEngine()
</script>

<template>
  <v-row>
    <!-- LEFT SIDEBAR -->
    <v-col cols="12" md="3">
      <v-card class="pa-5 bg-green-lighten-5 h-100 d-flex flex-column">
        <div class="text-subtitle-1 font-weight-bold text-green-darken-3 mb-1">
          Final Decision
        </div>
        <div class="text-caption text-grey-darken-1 mb-4">
          Automated credit decision based on comprehensive risk assessment and policy compliance check.
        </div>

        <v-divider class="mb-4" />

        <div class="d-flex flex-column ga-2 mb-4">
          <v-card class="pa-3 d-flex align-center ga-3">
            <v-avatar size="32" color="green-lighten-4" rounded="lg">
              <v-icon icon="mdi-certificate-outline" size="16" color="green-darken-2" />
            </v-avatar>
            <div>
              <div class="text-caption font-weight-bold text-uppercase">Decision</div>
              <div class="text-caption font-weight-bold" :class="`text-${decisionColor}`">
                {{ decision }}
              </div>
            </div>
          </v-card>
          <v-card class="pa-3 d-flex align-center ga-3">
            <v-avatar size="32" color="green-lighten-4" rounded="lg">
              <v-icon icon="mdi-clock-outline" size="16" color="green-darken-2" />
            </v-avatar>
            <div>
              <div class="text-caption font-weight-bold text-uppercase">Processing</div>
              <div class="text-caption text-grey">Total waktu: 2.4 detik (automated)</div>
            </div>
          </v-card>
          <v-card class="pa-3 d-flex align-center ga-3">
            <v-avatar size="32" color="green-lighten-4" rounded="lg">
              <v-icon icon="mdi-file-check-outline" size="16" color="green-darken-2" />
            </v-avatar>
            <div>
              <div class="text-caption font-weight-bold text-uppercase">Document</div>
              <div class="text-caption text-grey">Surat keputusan siap dicetak</div>
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
        <div class="text-h6 font-weight-bold">Hasil Keputusan Kredit</div>
        <div class="text-body-2 text-grey">
          Ringkasan keputusan akhir berdasarkan seluruh analisis dan scoring yang telah dilakukan.
        </div>
      </div>

      <!-- Verdict Card -->
      <ResultSummaryCard
        :icon="decisionIcon"
        :title="decisionLabel"
        subtitle="Keputusan otomatis berdasarkan analisis risiko komprehensif — Ref: LOS-2026-0314-0087"
        :color="decisionColor"
        class="mb-4"
      />

      <!-- Summary Stats -->
      <v-row dense class="mb-4">
        <v-col
          v-for="(stat, i) in summaryStats"
          :key="i"
          cols="12"
          md="4"
        >
          <v-card class="pa-4">
            <div class="text-overline text-grey-darken-1 d-flex align-center ga-1 mb-1">
              <v-icon :icon="stat.icon" size="14" />
              {{ stat.label }}
            </div>
            <div
              class="text-h5 font-weight-bold"
              :class="stat.valueColor ? `text-${stat.valueColor}` : ''"
            >
              {{ stat.value }}
            </div>
            <div
              class="text-caption d-flex align-center ga-1 mt-1"
              :class="{
                'text-success': stat.trendType === 'positive',
                'text-grey': stat.trendType === 'neutral',
              }"
            >
              <v-icon :icon="stat.trendIcon" size="12" />
              {{ stat.trend }}
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Scoring Breakdown -->
      <v-card class="pa-5 mb-4">
        <div class="d-flex align-center ga-2 text-subtitle-2 font-weight-bold mb-4 pb-3 border-b">
          <v-icon icon="mdi-chart-bar" size="18" color="primary-lighten-1" />
          Scoring Breakdown
          <v-spacer />
          <v-chip size="small" color="primary" variant="tonal">
            Total: {{ totalScore }}/100
          </v-chip>
        </div>

        <div class="d-flex flex-column ga-3">
          <div v-for="(score, i) in scores" :key="i">
            <div class="d-flex justify-space-between text-body-2 font-weight-bold mb-1">
              <span>{{ score.label }}</span>
              <span class="text-grey">{{ score.score }}/{{ score.maxScore }}</span>
            </div>
            <v-progress-linear
              :model-value="(score.score / score.maxScore) * 100"
              :color="score.color"
              rounded
              height="8"
            />
          </div>
        </div>
      </v-card>

      <!-- Decision Parameters Table -->
      <v-card class="pa-5 mb-4">
        <div class="d-flex align-center ga-2 text-subtitle-2 font-weight-bold mb-4 pb-3 border-b">
          <v-icon icon="mdi-file-document-outline" size="18" color="primary-lighten-1" />
          Rincian Keputusan
        </div>

        <v-table density="comfortable">
          <thead>
            <tr>
              <th class="text-overline">Parameter</th>
              <th class="text-overline">Nilai</th>
              <th class="text-overline">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(param, i) in decisionParameters" :key="i">
              <td class="text-body-2">{{ param.parameter }}</td>
              <td class="text-body-2">{{ param.value }}</td>
              <td>
                <v-chip
                  :color="getParameterStatusColor(param.status)"
                  size="x-small"
                  variant="tonal"
                >
                  {{ param.status }}
                </v-chip>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>

      <!-- Action Buttons -->
      <v-card class="pa-4">
        <div class="d-flex justify-center ga-3">
          <v-btn color="primary" prepend-icon="mdi-printer">
            Cetak Surat Keputusan
          </v-btn>
          <v-btn variant="outlined" prepend-icon="mdi-download">
            Download PDF
          </v-btn>
          <v-btn variant="outlined" prepend-icon="mdi-send">
            Kirim ke Nasabah
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
