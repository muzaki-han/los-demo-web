<script setup lang="ts">
import { useStep3Simulation } from '../composables/useStep3Simulation'
import { useLosStore } from '../stores/losStore'
import SimulationParameterCard from '../components/SimulationParameterCard.vue'

const store = useLosStore()
const {
  params,
  dsrPercent,
  recommendedLimit,
  estimatedInstallment,
  creditScorePercent,
  dashboardStats,
  productEligibility,
  formatRupiah,
} = useStep3Simulation()
</script>

<template>
  <v-row>
    <!-- LEFT SIDEBAR -->
    <v-col cols="12" md="3">
      <v-card class="pa-5 bg-purple-lighten-5 h-100 d-flex flex-column">
        <div class="text-subtitle-1 font-weight-bold text-primary mb-1">
          Credit Simulation
        </div>
        <div class="text-caption text-grey-darken-1 mb-4">
          Real-time credit limit calculation based on customer income, risk profile, and bank policy parameters.
        </div>

        <v-divider class="mb-4" />

        <!-- Gauge -->
        <div class="d-flex justify-center my-4">
          <v-progress-circular
            :model-value="creditScorePercent"
            :size="120"
            :width="10"
            color="primary"
          >
            <div class="text-center">
              <div class="text-h5 font-weight-bold text-primary">
                {{ creditScorePercent }}%
              </div>
              <div class="text-caption text-grey">Credit Score</div>
            </div>
          </v-progress-circular>
        </div>

        <div class="d-flex flex-column ga-2 mb-4">
          <v-card class="pa-3 d-flex align-center ga-3">
            <v-avatar size="32" color="secondary" rounded="lg">
              <v-icon icon="mdi-calculator-variant-outline" size="16" color="primary" />
            </v-avatar>
            <div>
              <div class="text-caption font-weight-bold text-uppercase">DSR Ratio</div>
              <div class="text-caption text-primary">
                {{ dsrPercent }}% — {{ dsrPercent <= 40 ? 'Within acceptable range' : 'Exceeds threshold' }}
              </div>
            </div>
          </v-card>
          <v-card class="pa-3 d-flex align-center ga-3">
            <v-avatar size="32" color="secondary" rounded="lg">
              <v-icon icon="mdi-cash" size="16" color="primary" />
            </v-avatar>
            <div>
              <div class="text-caption font-weight-bold text-uppercase">Max Limit</div>
              <div class="text-caption text-grey">
                {{ formatRupiah(recommendedLimit) }} (berdasar DSR)
              </div>
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
        <div class="text-h6 font-weight-bold">Simulasi Limit Kredit</div>
        <div class="text-body-2 text-grey">
          Sesuaikan parameter untuk mensimulasikan batas kredit berdasarkan profil risiko nasabah.
        </div>
      </div>

      <!-- Dashboard Stats -->
      <SimulationParameterCard :stats="dashboardStats" class="mb-4" />

      <!-- Parameter Sliders -->
      <v-card class="pa-5 mb-4">
        <div class="d-flex align-center ga-2 text-subtitle-2 font-weight-bold mb-4 pb-3 border-b">
          <v-icon icon="mdi-tune-variant" size="18" color="primary-lighten-1" />
          Parameter Simulasi
        </div>

        <div class="d-flex flex-column ga-5">
          <div>
            <div class="d-flex justify-space-between text-body-2 font-weight-bold mb-1">
              <span>Penghasilan Bulanan</span>
              <span class="text-primary">{{ formatRupiah(params.income) }}</span>
            </div>
            <v-slider
              v-model="params.income"
              :min="5000000"
              :max="100000000"
              :step="500000"
            />
          </div>

          <div>
            <div class="d-flex justify-space-between text-body-2 font-weight-bold mb-1">
              <span>Cicilan Eksisting</span>
              <span class="text-primary">{{ formatRupiah(params.cicilanExisting) }}</span>
            </div>
            <v-slider
              v-model="params.cicilanExisting"
              :min="0"
              :max="50000000"
              :step="100000"
            />
          </div>

          <div>
            <div class="d-flex justify-space-between text-body-2 font-weight-bold mb-1">
              <span>Tenor (bulan)</span>
              <span class="text-primary">{{ params.tenor }} bulan</span>
            </div>
            <v-slider
              v-model="params.tenor"
              :min="6"
              :max="120"
              :step="6"
            />
          </div>

          <div>
            <div class="d-flex justify-space-between text-body-2 font-weight-bold mb-1">
              <span>Suku Bunga</span>
              <span class="text-primary">{{ params.interestRate }}%</span>
            </div>
            <v-slider
              v-model="params.interestRate"
              :min="5"
              :max="25"
              :step="0.5"
            />
          </div>
        </div>
      </v-card>

      <!-- Simulation Result -->
      <v-card class="pa-5 mb-4">
        <div class="d-flex align-center ga-2 text-subtitle-2 font-weight-bold mb-4 pb-3 border-b">
          <v-icon icon="mdi-chart-bar" size="18" color="primary-lighten-1" />
          Hasil Simulasi
        </div>

        <v-row dense>
          <v-col cols="12" md="6">
            <div class="text-overline text-grey-darken-1 d-flex align-center ga-1 mb-1">
              <v-icon icon="mdi-cash" size="14" />
              Limit Direkomendasikan
            </div>
            <div class="text-h5 font-weight-bold text-primary">
              {{ formatRupiah(recommendedLimit) }}
            </div>
            <div class="text-caption text-grey mt-1">
              Berdasarkan DSR {{ dsrPercent }}%
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="text-overline text-grey-darken-1 d-flex align-center ga-1 mb-1">
              <v-icon icon="mdi-calendar-outline" size="14" />
              Estimasi Cicilan
            </div>
            <div class="text-h5 font-weight-bold text-primary">
              {{ formatRupiah(estimatedInstallment) }}
            </div>
            <div class="text-caption text-grey mt-1">
              Per bulan selama {{ params.tenor }} bulan
            </div>
          </v-col>
        </v-row>
      </v-card>

      <!-- Product Eligibility -->
      <v-card class="pa-5">
        <div class="d-flex align-center ga-2 text-subtitle-2 font-weight-bold mb-4 pb-3 border-b">
          <v-icon icon="mdi-checkbox-marked-outline" size="18" color="primary-lighten-1" />
          Kelayakan Produk
        </div>

        <div class="d-flex flex-column ga-2">
          <v-card
            v-for="(product, i) in productEligibility"
            :key="i"
            class="pa-4 d-flex align-center ga-3"
          >
            <v-avatar
              size="28"
              :color="
                product.status === 'eligible'
                  ? 'success-lighten-4'
                  : product.status === 'conditional'
                    ? 'warning-lighten-4'
                    : 'error-lighten-4'
              "
              rounded="lg"
            >
              <v-icon
                :icon="
                  product.status === 'eligible'
                    ? 'mdi-check'
                    : product.status === 'conditional'
                      ? 'mdi-alert'
                      : 'mdi-close'
                "
                size="16"
                :color="
                  product.status === 'eligible'
                    ? 'success'
                    : product.status === 'conditional'
                      ? 'warning'
                      : 'error'
                "
              />
            </v-avatar>
            <div>
              <div class="text-subtitle-2 font-weight-bold">{{ product.name }}</div>
              <div class="text-caption text-grey">{{ product.description }}</div>
            </div>
          </v-card>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
