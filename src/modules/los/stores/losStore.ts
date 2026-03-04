import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
    NasabahData,
    SimulationParams,
    DecisionResult,
    StepMeta,
} from '../types/los.types'

export const useLosStore = defineStore('los', () => {
    // ── Step Navigation ──
    const currentStep = ref(0)
    const totalSteps = 4

    const steps: StepMeta[] = [
        { index: 0, label: 'Step 1', name: 'Customer Management', icon: 'mdi-account-outline' },
        { index: 1, label: 'Step 2', name: 'Strategy Control', icon: 'mdi-shield-alert-outline' },
        { index: 2, label: 'Step 3', name: 'Limit Simulation', icon: 'mdi-calculator-variant-outline' },
        { index: 3, label: 'Step 4', name: 'Final Result', icon: 'mdi-file-check-outline' },
    ]

    const progressPercent = computed(() => ((currentStep.value + 1) / totalSteps) * 100)
    const isFirstStep = computed(() => currentStep.value === 0)
    const isLastStep = computed(() => currentStep.value === totalSteps - 1)

    function goToStep(step: number) {
        if (step >= 0 && step < totalSteps) {
            currentStep.value = step
        }
    }

    function nextStep() {
        if (!isLastStep.value) currentStep.value++
    }

    function prevStep() {
        if (!isFirstStep.value) currentStep.value--
    }

    // ── Nasabah Data (shared across steps) ──
    const nasabah = ref<NasabahData>({
        namaLengkap: 'Ahmad Fauzan Hidayat',
        noKtp: '3201••••••••0001',
        tanggalLahir: '1988-05-14',
        noNpwp: '09.456.••••.0-•••.000',
        jenisPekerjaan: 'Karyawan Swasta',
        penghasilanPerBulan: 18_500_000,
        namaPerusahaan: 'PT Nusantara Digital',
        lamaBekerja: '3 - 5 Tahun',
        alamatLengkap: 'Jl. Merdeka Raya No.45, Kel. Cikini, Kec. Menteng',
        kota: 'Jakarta Pusat',
        statusTempatTinggal: 'Milik Sendiri',
    })

    // ── Simulation Params (shared between step 3 & 4) ──
    const simulation = ref<SimulationParams>({
        income: 18_500_000,
        cicilanExisting: 3_200_000,
        tenor: 36,
        interestRate: 9.5,
    })

    // ── Decision Result (set at step 4) ──
    const decisionResult = ref<DecisionResult | null>(null)

    function setDecisionResult(result: DecisionResult) {
        decisionResult.value = result
    }

    // ── Reset ──
    function resetAll() {
        currentStep.value = 0
        decisionResult.value = null
    }

    return {
        // state
        currentStep,
        totalSteps,
        steps,
        nasabah,
        simulation,
        decisionResult,
        // computed
        progressPercent,
        isFirstStep,
        isLastStep,
        // actions
        goToStep,
        nextStep,
        prevStep,
        setDecisionResult,
        resetAll,
    }
})
