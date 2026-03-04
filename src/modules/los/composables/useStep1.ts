import { computed } from 'vue'
import { useLosStore } from '../stores/losStore'
import type { JobType, WorkDuration, ResidenceStatus } from '../types/los.types'

export function useStep1() {
    const store = useLosStore()

    const nasabah = computed(() => store.nasabah)

    const jobTypes: JobType[] = ['Karyawan Swasta', 'PNS', 'Wiraswasta', 'Profesional']
    const workDurations: WorkDuration[] = ['< 1 Tahun', '1 - 3 Tahun', '3 - 5 Tahun', '> 5 Tahun']
    const residenceStatuses: ResidenceStatus[] = ['Milik Sendiri', 'Sewa / Kontrak', 'Milik Keluarga']

    const incomeFormatted = computed(() => formatRupiah(nasabah.value.penghasilanPerBulan))

    const sidebarInfo = computed(() => [
        {
            icon: 'mdi-account-outline',
            label: 'Identitas',
            value: 'KTP, NPWP, dan data pribadi wajib diisi',
            accent: false,
        },
        {
            icon: 'mdi-briefcase-outline',
            label: 'Pekerjaan',
            value: 'Informasi pekerjaan & penghasilan bulanan',
            accent: true,
        },
        {
            icon: 'mdi-home-outline',
            label: 'Domisili',
            value: 'Alamat tempat tinggal dan status kepemilikan',
            accent: false,
        },
    ])

    function formatRupiah(value: number): string {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    function updateField<K extends keyof typeof store.nasabah>(
        field: K,
        value: (typeof store.nasabah)[K],
    ) {
        ; (store.nasabah as Record<string, unknown>)[field as string] = value
    }

    return {
        nasabah,
        jobTypes,
        workDurations,
        residenceStatuses,
        incomeFormatted,
        sidebarInfo,
        formatRupiah,
        updateField,
    }
}
