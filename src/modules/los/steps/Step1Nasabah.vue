<script setup lang="ts">
import { useLosStore } from '../stores/losStore'
import { computed, ref } from 'vue'

const store = useLosStore()

// Masking helpers
function maskName(name: string): string {
  if (!name) return ''
  const parts = name.split(' ')
  return parts.map(p => p[0] + '**').join(' ')
}
function maskKtp(ktp: string): string {
  if (!ktp) return ''
  const clean = ktp.split('').filter(c => c >= '0' && c <= '9').join('')
  return clean.slice(0, 4) + '****' + clean.slice(-4)
}

const selectedCustomer = ref(1)

const customers = computed(() => [
  {
    id: 0,
    name: 'J** S**',
    ktp: '3201****1234',
    height: '175cm',
    pefindoDate: '2023-10-25',
    status: 'Pending',
    statusColor: 'info',
  },
  {
    id: 1,
    name: maskName(store.nasabah.namaLengkap),
    ktp: maskKtp(store.nasabah.noKtp),
    height: '162cm',
    pefindoDate: '2023-10-24',
    status: 'Verified',
    statusColor: 'success',
  },
  {
    id: 2,
    name: 'A** B**',
    ktp: '3671****9012',
    height: '180cm',
    pefindoDate: '2023-10-24',
    status: 'Pending',
    statusColor: 'info',
  },
  {
    id: 3,
    name: 'C** D**',
    ktp: '3512****3456',
    height: '158cm',
    pefindoDate: '2023-10-23',
    status: 'Review',
    statusColor: 'warning',
  },
  {
    id: 4,
    name: 'E** F**',
    ktp: '3321****7890',
    height: '165cm',
    pefindoDate: '2023-10-22',
    status: 'Pending',
    statusColor: 'info',
  },
  {
    id: 5,
    name: 'G** H**',
    ktp: '3402****2345',
    height: '170cm',
    pefindoDate: '2023-10-21',
    status: 'Rejected',
    statusColor: 'error',
  },
])

const kpiStats = [
  { icon: 'mdi-timer-outline', label: 'Avg Approval Time', value: '1.2s' },
  { icon: 'mdi-check-circle-outline', label: 'Approval Rate', value: '68%' },
  { icon: 'mdi-chart-line', label: 'Risk Accuracy', value: '99.4%' },
]
</script>

<template>
  <v-row>
    <!-- LEFT: Main Content (70%) -->
    <v-col cols="12" lg="8">
      <!-- KPI Ribbon -->
      <v-row dense class="mb-4">
        <v-col v-for="(stat, i) in kpiStats" :key="i" cols="12" sm="4">
          <v-card class="pa-5">
            <div class="d-flex align-center ga-2 text-grey mb-1">
              <v-icon :icon="stat.icon" size="18" />
              <span class="text-caption font-weight-medium">{{ stat.label }}</span>
            </div>
            <div class="text-h4 font-weight-bold">{{ stat.value }}</div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Customer Queue Table -->
      <v-card>
        <div class="d-flex align-center justify-space-between pa-4 pb-2">
          <div class="text-subtitle-1 font-weight-bold">Customer Queue</div>
          <div class="d-flex ga-2">
            <v-btn variant="outlined" size="small" prepend-icon="mdi-filter-outline">
              Filter
            </v-btn>
            <v-btn variant="outlined" size="small" prepend-icon="mdi-download">
              Export
            </v-btn>
          </div>
        </div>

        <v-table density="comfortable">
          <thead>
            <tr>
              <th scope="col" class="text-left">Select</th>
              <th scope="col" class="text-left">Masked Name</th>
              <th scope="col" class="text-left">Masked KTP</th>
              <th scope="col" class="text-left">Height</th>
              <th scope="col" class="text-left">Pefindo Request Date</th>
              <th scope="col" class="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="customer in customers"
              :key="customer.id"
              class="cursor-pointer"
              :class="{ 'bg-grey-lighten-5': selectedCustomer === customer.id }"
              @click="selectedCustomer = customer.id"
            >
              <td>
                <v-radio-group v-model="selectedCustomer" hide-details inline>
                  <v-radio :value="customer.id" density="compact" />
                </v-radio-group>
              </td>
              <td class="font-weight-medium">{{ customer.name }}</td>
              <td class="text-grey font-weight-medium" style="font-family: monospace;">{{ customer.ktp }}</td>
              <td class="text-grey">{{ customer.height }}</td>
              <td class="text-grey">{{ customer.pefindoDate }}</td>
              <td>
                <v-chip :color="customer.statusColor" size="small" variant="tonal">
                  {{ customer.status }}
                </v-chip>
              </td>
            </tr>
          </tbody>
        </v-table>

        <v-divider />
        <div class="d-flex align-center justify-space-between pa-3 text-caption text-grey">
          <span>Showing 1-6 of 24 records</span>
          <div class="d-flex ga-2">
            <v-btn variant="text" size="x-small" disabled>Previous</v-btn>
            <v-btn variant="text" size="x-small" color="primary">Next</v-btn>
          </div>
        </div>
      </v-card>
    </v-col>

    <!-- RIGHT: Business Impact Panel (30%) -->
    <v-col cols="12" lg="4">
      <v-card class="pa-6 h-100 bg-grey-darken-4 text-white" theme="dark" style="position: relative; overflow: hidden;">
        <!-- Decorative blurs -->
        <div style="position:absolute; right:-40px; top:-40px; width:160px; height:160px; border-radius:50%; background: rgba(19,109,236,0.2); filter:blur(60px);"></div>
        <div style="position:absolute; bottom:0; left:0; width:128px; height:128px; border-radius:50%; background:rgba(59,130,246,0.1); filter:blur(40px);"></div>

        <div style="position: relative; z-index: 1;">
          <div class="text-h6 font-weight-bold mb-2">Business Impact</div>
          <p class="text-body-2 text-grey-lighten-1 mb-6">
            Secure data management with advanced masking ensures compliance while maintaining fast review cycles.
          </p>

          <div class="d-flex flex-column ga-3">
            <div class="d-flex align-start ga-3 pa-3 rounded-lg" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
              <v-avatar size="36" color="primary" variant="tonal" rounded="circle">
                <v-icon icon="mdi-shield-check" size="18" />
              </v-avatar>
              <div>
                <div class="text-body-2 font-weight-bold">Secure Data</div>
                <div class="text-caption text-grey-lighten-1">AES-256 Encrypted storage for all customer records.</div>
              </div>
            </div>

            <div class="d-flex align-start ga-3 pa-3 rounded-lg" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
              <v-avatar size="36" color="primary" variant="tonal" rounded="circle">
                <v-icon icon="mdi-eye-off" size="18" />
              </v-avatar>
              <div>
                <div class="text-body-2 font-weight-bold">PII Masking</div>
                <div class="text-caption text-grey-lighten-1">Automatic field masking protects sensitive customer PII.</div>
              </div>
            </div>

            <div class="d-flex align-start ga-3 pa-3 rounded-lg" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);">
              <v-avatar size="36" color="primary" variant="tonal" rounded="circle">
                <v-icon icon="mdi-gavel" size="18" />
              </v-avatar>
              <div>
                <div class="text-body-2 font-weight-bold">Compliant Review</div>
                <div class="text-caption text-grey-lighten-1">Built-in audit trails for full regulatory adherence.</div>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>
