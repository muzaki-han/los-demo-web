import { ref, computed } from 'vue'
import type {
    RejectionRule,
    RejectionStats,
    TimelineItem,
} from '../types/los.types'

export function useStep2() {
    // ── Rejection Rules ──
    const rules = ref<RejectionRule[]>([
        { id: 'dti', rule: 'Debt-to-Income Ratio', threshold: '> 50%', action: 'Auto Reject', status: 'Aktif' },
        { id: 'bi', rule: 'BI Checking Score', threshold: 'Collectability 3+', action: 'Auto Reject', status: 'Aktif' },
        { id: 'age', rule: 'Usia Pemohon', threshold: '> 60 tahun', action: 'Manual Review', status: 'Review' },
        { id: 'work', rule: 'Masa Kerja', threshold: '< 6 bulan', action: 'Auto Reject', status: 'Aktif' },
        { id: 'blacklist', rule: 'Blacklist SLIK', threshold: 'Terdaftar', action: 'Auto Reject', status: 'Aktif' },
        { id: 'doc', rule: 'Dokumen Tidak Lengkap', threshold: 'Missing > 2', action: 'Pending', status: 'Review' },
    ])

    // ── Stats ──
    const stats = ref<RejectionStats>({
        totalDitolak: 147,
        manualReview: 23,
        rejectionRate: 11.2,
        todayRejected: 12,
    })

    // ── Timeline ──
    const timeline = ref<TimelineItem[]>([
        { title: 'Data Masuk', description: 'Pengajuan diterima & di-parsing oleh sistem', status: 'completed', badge: 'Selesai' },
        { title: 'Pre-Screening Check', description: 'Cek blacklist, usia, dan kelengkapan dokumen', status: 'completed', badge: 'Passed' },
        { title: 'Risk Scoring', description: 'Penilaian DTI, BI Checking, dan scoring internal', status: 'in-progress', badge: 'In Progress' },
        { title: 'Final Decision', description: 'Approve, reject, atau eskalasi ke manual review', status: 'pending', badge: 'Pending' },
    ])

    // ── Risk Tags ──
    const riskTags = ref([
        'High DTI', 'Blacklist', 'NPL History', 'Age Limit', 'Incomplete Doc',
    ])

    const activeRulesCount = computed(() => rules.value.filter(r => r.status === 'Aktif').length)
    const reviewRulesCount = computed(() => rules.value.filter(r => r.status === 'Review').length)

    const dashboardStats = computed(() => [
        {
            icon: 'mdi-shield-off-outline',
            label: 'Total Ditolak',
            value: stats.value.totalDitolak.toLocaleString('id-ID'),
            trend: `+${stats.value.todayRejected} hari ini`,
            trendIcon: 'mdi-trending-up',
            trendType: 'warning' as const,
        },
        {
            icon: 'mdi-eye-outline',
            label: 'Manual Review',
            value: stats.value.manualReview.toLocaleString('id-ID'),
            trend: 'Dalam antrian',
            trendIcon: 'mdi-clock-outline',
            trendType: 'neutral' as const,
        },
        {
            icon: 'mdi-percent-outline',
            label: 'Rejection Rate',
            value: `${stats.value.rejectionRate}%`,
            trend: '-2.1% bulan ini',
            trendIcon: 'mdi-trending-down',
            trendType: 'positive' as const,
        },
    ])

    function getStatusColor(status: string): string {
        const map: Record<string, string> = {
            'Aktif': 'error',
            'Review': 'warning',
            'Nonaktif': 'grey',
        }
        return map[status] ?? 'grey'
    }

    function getTimelineDotColor(status: string): string {
        const map: Record<string, string> = {
            'completed': 'success',
            'in-progress': 'primary',
            'pending': 'grey',
        }
        return map[status] ?? 'grey'
    }

    function getTimelineBadgeColor(status: string): string {
        const map: Record<string, string> = {
            'completed': 'success',
            'in-progress': 'warning',
            'pending': 'error',
        }
        return map[status] ?? 'grey'
    }

    return {
        rules,
        stats,
        timeline,
        riskTags,
        activeRulesCount,
        reviewRulesCount,
        dashboardStats,
        getStatusColor,
        getTimelineDotColor,
        getTimelineBadgeColor,
    }
}
