<script setup lang="ts">
import { useStep2 } from '../composables/useStep2'
import { useLosStore } from '../stores/losStore'
import { computed, ref } from 'vue'

const store = useLosStore()
const {
  dashboardStats,
} = useStep2()

// Masking helpers
function maskName(name: string): string {
  if (!name) return ''
  const parts = name.split(' ')
  return parts.map(p => p[0] + (p.length > 1 ? '*'.repeat(Math.max(1, p.length - 2)) + p.slice(-1) : '')).join(' ')
}
function maskKtp(ktp: string): string {
  if (!ktp) return ''
  return ktp.slice(0, 4) + '****' + ktp.slice(-4)
}

const headers = [
  { title: 'Nama', value: 'name', align: 'start' },
  { title: 'KTP', value: 'ktp', align: 'start' },
  { title: 'Income', value: 'income', align: 'end' },
] as const

const items = computed(() => [
  {
    name: maskName(store.nasabah.namaLengkap),
    ktp: maskKtp(store.nasabah.noKtp.replace(/[^0-9]/g, '')),
    income: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(store.nasabah.penghasilanPerBulan),
  }
])
</script>

<template>
  <v-row align="stretch" no-gutters>
    <!-- LEFT SIDEBAR: Business Impact Block -->
    <SimulationParameterCard :stats="dashboardStats" :columns="3" class="mb-4" />
    
    <v-col cols="12" md="3" class="pa-0">
      <v-card class="pa-0 bg-transparent h-100 d-flex flex-column rounded-0" flat>
        <div class="pa-6">
          <div class="text-h6 font-weight-bold text-primary mb-2">
            Business Impact
          </div>
          <div class="text-body-2 text-grey-darken-2 mb-3">
            Centralized customer data orchestration ensures compliant, structured, and decision-ready borrower profiles before entering the credit evaluation workflow.
          </div>
          <v-divider class="mb-3" />
          <div class="d-flex flex-column ga-3">
          <div class="d-flex align-start ga-2">
            <v-icon color="primary" size="18">mdi-check-circle</v-icon>
            <div>
              <span class="font-weight-bold">Structured Underwriting Readiness</span><br />
              <span class="text-caption">Customer profiles are standardized and pre-validated before entering the decision engine, reducing manual verification errors.</span>
            </div>
          </div>
          <div class="d-flex align-start ga-2">
            <v-icon color="primary" size="18">mdi-check-circle</v-icon>
            <div>
              <span class="font-weight-bold">Compliance & Data Governance</span><br />
              <span class="text-caption">Sensitive information is masked and audit-ready, aligned with regulatory and internal risk policies.</span>
            </div>
          </div>
          <div class="d-flex align-start ga-2">
            <v-icon color="primary" size="18">mdi-check-circle</v-icon>
            <div>
              <span class="font-weight-bold">Bureau Traceability & Transparency</span><br />
              <span class="text-caption">Credit bureau request history is recorded and visible, ensuring accountability and regulatory reporting support.</span>
            </div>
          </div>
          <div class="d-flex align-start ga-2">
            <v-icon color="primary" size="18">mdi-check-circle</v-icon>
            <div>
              <span class="font-weight-bold">Faster Credit Review Cycle</span><br />
              <span class="text-caption">Pre-organized borrower data reduces underwriting turnaround time and improves approval throughput.</span>
            </div>
          </div>
          <div class="d-flex align-start ga-2">
            <v-icon color="primary" size="18">mdi-check-circle</v-icon>
            <div>
              <span class="font-weight-bold">Reduced Operational Dependency</span><br />
              <span class="text-caption">Front-office teams can access structured applicant data without IT intervention.</span>
            </div>
          </div>
        </div>
          <v-spacer />
          <v-divider class="my-3" />
          <div class="text-caption text-grey-darken-1">Kategori: Informasi Nasabah</div>
        </div>
      </v-card>
    </v-col>

    <!-- MAIN CONTENT: Table Summary -->
    <v-col cols="12" md="9" class="pa-0">
      <v-card class="pa-6 h-100" flat>
        <div class="text-h6 font-weight-bold mb-2">Business Impact</div>
        <div class="text-body-2 text-grey mb-4">
          Centralized customer data orchestration ensures compliant, structured, and decision-ready borrower profiles before entering the credit evaluation workflow.
        </div>
        <v-data-table
          :headers="headers"
          :items="items"
          show-select
          select-strategy="single"
          class="elevation-0"
        />
      </v-card>
    </v-col>
  </v-row>
</template>
