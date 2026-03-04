/* ──────────────────────────────────────────────────────────────
 *  LOS Domain Types
 * ────────────────────────────────────────────────────────────── */

// ── Step definitions ──
export interface StepMeta {
    index: number
    label: string
    name: string
    icon: string
}

// ── Step 1: Nasabah ──
export type JobType = 'Karyawan Swasta' | 'PNS' | 'Wiraswasta' | 'Profesional'
export type WorkDuration = '< 1 Tahun' | '1 - 3 Tahun' | '3 - 5 Tahun' | '> 5 Tahun'
export type ResidenceStatus = 'Milik Sendiri' | 'Sewa / Kontrak' | 'Milik Keluarga'

export interface NasabahData {
    namaLengkap: string
    noKtp: string
    tanggalLahir: string
    noNpwp: string
    jenisPekerjaan: JobType
    penghasilanPerBulan: number
    namaPerusahaan: string
    lamaBekerja: WorkDuration
    alamatLengkap: string
    kota: string
    statusTempatTinggal: ResidenceStatus
}

// ── Step 2: Rejection Strategy ──
export type RejectionAction = 'Auto Reject' | 'Manual Review' | 'Pending'
export type RuleStatus = 'Aktif' | 'Review' | 'Nonaktif'

export interface RejectionRule {
    id: string
    rule: string
    threshold: string
    action: RejectionAction
    status: RuleStatus
}

export interface RejectionStats {
    totalDitolak: number
    manualReview: number
    rejectionRate: number
    todayRejected: number
}

export type TimelineStatus = 'completed' | 'in-progress' | 'pending'

export interface TimelineItem {
    title: string
    description: string
    status: TimelineStatus
    badge: string
}

// ── Step 3: Simulation ──
export interface SimulationParams {
    income: number
    cicilanExisting: number
    tenor: number
    interestRate: number
}

export interface SimulationResult {
    dsr: number
    recommendedLimit: number
    estimatedInstallment: number
    maxDsrAllowed: number
}

export interface DashboardStat {
    icon: string
    label: string
    value: string
    trend: string
    trendIcon: string
    trendType: 'positive' | 'warning' | 'neutral'
}

export type EligibilityStatus = 'eligible' | 'conditional' | 'ineligible'

export interface ProductEligibility {
    name: string
    status: EligibilityStatus
    description: string
}

// ── Step 4: Decision ──
export type Decision = 'APPROVED' | 'REJECTED' | 'MANUAL_REVIEW'

export interface ScoreBreakdown {
    label: string
    score: number
    maxScore: number
    color: 'success' | 'primary' | 'warning' | 'error'
}

export interface DecisionParameter {
    parameter: string
    value: string
    status: 'Pass' | 'Fail' | 'Clear' | 'Verified'
}

export interface DecisionResult {
    decision: Decision
    refNumber: string
    approvedLimit: number
    interestRate: number
    tenor: number
    monthlyInstallment: number
    processingTime: number
    scores: ScoreBreakdown[]
    parameters: DecisionParameter[]
}

// ── Global LOS State ──
export interface LosState {
    currentStep: number
    nasabah: NasabahData
    simulation: SimulationParams
    decision: DecisionResult | null
}
