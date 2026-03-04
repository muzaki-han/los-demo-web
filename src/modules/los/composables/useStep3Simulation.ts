import { computed } from 'vue'
import { useLosStore } from '../stores/losStore'
import type {
    SimulationResult,
    DashboardStat,
    ProductEligibility,
} from '../types/los.types'

export function useStep3Simulation() {
    const store = useLosStore()
    const params = computed(() => store.simulation)

    // ── Core DSR Calculation ──
    const MAX_DSR = 0.40

    const dsr = computed<number>(() => {
        if (params.value.income <= 0) return 0
        return params.value.cicilanExisting / params.value.income
    })

    const dsrPercent = computed(() => +(dsr.value * 100).toFixed(1))

    // ── Maximum installment capacity ──
    const maxNewInstallment = computed(() => {
        return Math.max(params.value.income * MAX_DSR - params.value.cicilanExisting, 0)
    })

    // ── PMT-based limit (flat rate simplification) ──
    const recommendedLimit = computed(() => {
        const monthlyRate = params.value.interestRate / 100 / 12
        const n = params.value.tenor

        if (monthlyRate === 0) {
            return maxNewInstallment.value * n
        }

        // Present value of annuity: PV = PMT * [(1 - (1+r)^-n) / r]
        const pvFactor = (1 - Math.pow(1 + monthlyRate, -n)) / monthlyRate
        return Math.max(Math.round(maxNewInstallment.value * pvFactor), 0)
    })

    // ── Estimated installment from recommended limit ──
    const estimatedInstallment = computed(() => {
        const monthlyRate = params.value.interestRate / 100 / 12
        const n = params.value.tenor

        if (monthlyRate === 0 || recommendedLimit.value === 0) {
            return n > 0 ? Math.round(recommendedLimit.value / n) : 0
        }

        // PMT = PV * [r(1+r)^n / ((1+r)^n - 1)]
        const factor = (monthlyRate * Math.pow(1 + monthlyRate, n)) /
            (Math.pow(1 + monthlyRate, n) - 1)
        return Math.round(recommendedLimit.value * factor)
    })

    const simulationResult = computed<SimulationResult>(() => ({
        dsr: dsrPercent.value,
        recommendedLimit: recommendedLimit.value,
        estimatedInstallment: estimatedInstallment.value,
        maxDsrAllowed: MAX_DSR * 100,
    }))

    // ── Credit Score Gauge ──
    const creditScorePercent = computed(() => {
        // Simplified: invert DSR relative to max threshold
        const dsrWeight = Math.max(0, 1 - dsr.value / MAX_DSR) * 100
        return Math.min(Math.round(dsrWeight), 100)
    })

    // ── Dashboard Stats ──
    const dashboardStats = computed<DashboardStat[]>(() => [
        {
            icon: 'mdi-swap-horizontal',
            label: 'Transaksi / Hari',
            value: '12.840',
            trend: '+8.2% minggu ini',
            trendIcon: 'mdi-trending-up',
            trendType: 'positive',
        },
        {
            icon: 'mdi-currency-usd',
            label: 'Volume Transfer',
            value: 'Rp 4,2M',
            trend: '+3.5% bulan ini',
            trendIcon: 'mdi-trending-up',
            trendType: 'positive',
        },
        {
            icon: 'mdi-alert-outline',
            label: 'Flagged',
            value: '24',
            trend: 'Perlu review',
            trendIcon: 'mdi-minus',
            trendType: 'warning',
        },
        {
            icon: 'mdi-check-circle-outline',
            label: 'Approval Rate',
            value: '98.7%',
            trend: 'Stabil',
            trendIcon: 'mdi-trending-up',
            trendType: 'positive',
        },
    ])

    // ── Product Eligibility ──
    const productEligibility = computed<ProductEligibility[]>(() => {
        const limit = recommendedLimit.value
        return [
            {
                name: 'KPR Rumah Tapak',
                status: limit >= 100_000_000 ? 'eligible' : 'conditional',
                description: 'Eligible — Limit s/d Rp 500jt, tenor max 20 tahun',
            },
            {
                name: 'KTA Personal',
                status: limit >= 10_000_000 ? 'eligible' : 'ineligible',
                description: 'Eligible — Limit s/d Rp 200jt, tenor max 5 tahun',
            },
            {
                name: 'Kredit Kendaraan Bermotor',
                status: 'conditional',
                description: 'Conditional — Perlu verifikasi agunan tambahan',
            },
        ]
    })

    // ── Formatting helpers ──
    function formatRupiah(value: number): string {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    function formatRupiahShort(value: number): string {
        if (value >= 1_000_000_000) return `Rp ${(value / 1_000_000_000).toFixed(1)}M`
        if (value >= 1_000_000) return `Rp ${Math.round(value / 1_000_000)} Jt`
        return formatRupiah(value)
    }

    return {
        // bound to store
        params,
        // computed results
        dsr,
        dsrPercent,
        maxNewInstallment,
        recommendedLimit,
        estimatedInstallment,
        simulationResult,
        creditScorePercent,
        dashboardStats,
        productEligibility,
        // helpers
        formatRupiah,
        formatRupiahShort,
    }
}
