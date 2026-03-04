import { computed } from 'vue'
import { useLosStore } from '../stores/losStore'
import { useStep3Simulation } from './useStep3Simulation'
import type {
    DecisionResult,
    ScoreBreakdown,
    DecisionParameter,
    Decision,
} from '../types/los.types'

export function useDecisionEngine() {
    const store = useLosStore()
    const { recommendedLimit, estimatedInstallment, dsrPercent, formatRupiah, formatRupiahShort } =
        useStep3Simulation()

    // ── Score Breakdown ──
    const scores = computed<ScoreBreakdown[]>(() => [
        { label: 'Income Stability', score: 92, maxScore: 100, color: 'success' },
        { label: 'Credit History', score: 78, maxScore: 100, color: 'primary' },
        { label: 'Debt Ratio (DSR)', score: Math.round(Math.max(0, 100 - dsrPercent.value * 2)), maxScore: 100, color: 'warning' },
        { label: 'Employment Duration', score: 85, maxScore: 100, color: 'success' },
        { label: 'Document Completeness', score: 100, maxScore: 100, color: 'success' },
    ])

    const totalScore = computed(() => {
        const total = scores.value.reduce((sum, s) => sum + s.score, 0)
        const max = scores.value.reduce((sum, s) => sum + s.maxScore, 0)
        return Math.round((total / max) * 100)
    })

    // ── Decision Logic ──
    const decision = computed<Decision>(() => {
        if (totalScore.value >= 70 && dsrPercent.value <= 50) return 'APPROVED'
        if (totalScore.value >= 50) return 'MANUAL_REVIEW'
        return 'REJECTED'
    })

    const decisionColor = computed(() => {
        const map: Record<Decision, string> = {
            APPROVED: 'success',
            REJECTED: 'error',
            MANUAL_REVIEW: 'warning',
        }
        return map[decision.value]
    })

    const decisionLabel = computed(() => {
        const map: Record<Decision, string> = {
            APPROVED: 'Pengajuan Kredit Disetujui',
            REJECTED: 'Pengajuan Kredit Ditolak',
            MANUAL_REVIEW: 'Perlu Review Manual',
        }
        return map[decision.value]
    })

    const decisionIcon = computed(() => {
        const map: Record<Decision, string> = {
            APPROVED: 'mdi-check-circle',
            REJECTED: 'mdi-close-circle',
            MANUAL_REVIEW: 'mdi-alert-circle',
        }
        return map[decision.value]
    })

    // ── Decision Parameters Table ──
    const decisionParameters = computed<DecisionParameter[]>(() => [
        { parameter: 'BI Checking', value: 'Collectability 1', status: 'Pass' },
        { parameter: 'DTI Ratio', value: `${dsrPercent.value}%`, status: dsrPercent.value <= 50 ? 'Pass' : 'Fail' },
        { parameter: 'Masa Kerja', value: '4 Tahun', status: 'Pass' },
        { parameter: 'Usia', value: '37 Tahun', status: 'Pass' },
        { parameter: 'Blacklist Check', value: 'Tidak Terdaftar', status: 'Clear' },
        { parameter: 'Agunan', value: 'Sertifikat Rumah', status: 'Verified' },
    ])

    // ── Summary Stats ──
    const summaryStats = computed(() => [
        {
            icon: 'mdi-cash',
            label: 'Limit Disetujui',
            value: formatRupiahShort(recommendedLimit.value),
            trend: 'Final',
            trendIcon: 'mdi-check',
            trendType: 'positive' as const,
            valueColor: 'success',
        },
        {
            icon: 'mdi-percent-outline',
            label: 'Suku Bunga',
            value: `${store.simulation.interestRate}%`,
            trend: 'Fixed rate',
            trendIcon: 'mdi-trending-down',
            trendType: 'neutral' as const,
            valueColor: undefined,
        },
        {
            icon: 'mdi-calendar-outline',
            label: 'Tenor',
            value: `${store.simulation.tenor} bln`,
            trend: `${formatRupiahShort(estimatedInstallment.value)}/bln`,
            trendIcon: 'mdi-check',
            trendType: 'positive' as const,
            valueColor: undefined,
        },
    ])

    // ── Build full result ──
    const decisionResult = computed<DecisionResult>(() => ({
        decision: decision.value,
        refNumber: 'LOS-2026-0314-0087',
        approvedLimit: recommendedLimit.value,
        interestRate: store.simulation.interestRate,
        tenor: store.simulation.tenor,
        monthlyInstallment: estimatedInstallment.value,
        processingTime: 2.4,
        scores: scores.value,
        parameters: decisionParameters.value,
    }))

    function getParameterStatusColor(status: string): string {
        const map: Record<string, string> = {
            Pass: 'success',
            Fail: 'error',
            Clear: 'success',
            Verified: 'info',
        }
        return map[status] ?? 'grey'
    }

    function commitDecision() {
        store.setDecisionResult(decisionResult.value)
    }

    return {
        scores,
        totalScore,
        decision,
        decisionColor,
        decisionLabel,
        decisionIcon,
        decisionParameters,
        summaryStats,
        decisionResult,
        formatRupiah,
        formatRupiahShort,
        getParameterStatusColor,
        commitDecision,
    }
}
