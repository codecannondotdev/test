<template>
	<Header :title="isEdit ? 'Edit Patient' : 'Create Patient'" />
	<ProgressBar
		v-if="loaders.size > 0"
		mode="indeterminate"
		class="edit__progress-bar" />
	<Container class="edit">
		<Form
			:id="route.params.id as string"
			:is-edit="isEdit"
			@start-loading="loaders.add('form')"
			@stop-loading="loaders.delete('form')"
			@deleted="router.push({ name: 'patients-list' })" />
		<AppointmentsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Appointments')"
			@stop-loading="loaders.delete('Appointments')" />
		<MedicalRecordsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Medical Records')"
			@stop-loading="loaders.delete('Medical Records')" />
		<PrescriptionsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Prescriptions')"
			@stop-loading="loaders.delete('Prescriptions')" />
		<InsurancesRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Insurances')"
			@stop-loading="loaders.delete('Insurances')" />
		<AllergiesRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Allergies')"
			@stop-loading="loaders.delete('Allergies')" />
		<AdmissionsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Admissions')"
			@stop-loading="loaders.delete('Admissions')" />
		<BillingAccountsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Billing Accounts')"
			@stop-loading="loaders.delete('Billing Accounts')" />
		<TreatmentsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Treatments')"
			@stop-loading="loaders.delete('Treatments')" />
		<LabTestsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Lab Tests')"
			@stop-loading="loaders.delete('Lab Tests')" />
		<RadiologyReportsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Radiology Reports')"
			@stop-loading="loaders.delete('Radiology Reports')" />
		<SurgeriesRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Surgeries')"
			@stop-loading="loaders.delete('Surgeries')" />
		<ConsentFormsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Consent Forms')"
			@stop-loading="loaders.delete('Consent Forms')" />
		<ReferralsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Referrals')"
			@stop-loading="loaders.delete('Referrals')" />
		<VisitsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Visits')"
			@stop-loading="loaders.delete('Visits')" />
		<VitalSignsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Vital Signs')"
			@stop-loading="loaders.delete('Vital Signs')" />
		<DiagnosesRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Diagnoses')"
			@stop-loading="loaders.delete('Diagnoses')" />
		<FamilyContactsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Family Contacts')"
			@stop-loading="loaders.delete('Family Contacts')" />
		<EmergencyContactsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Emergency Contacts')"
			@stop-loading="loaders.delete('Emergency Contacts')" />
		<CarePlansRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Care Plans')"
			@stop-loading="loaders.delete('Care Plans')" />
		<CareTeamRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Care Team')"
			@stop-loading="loaders.delete('Care Team')" />
		<WaitingListsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Waiting Lists')"
			@stop-loading="loaders.delete('Waiting Lists')" />
		<MessagesRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Messages')"
			@stop-loading="loaders.delete('Messages')" />
		<NotificationsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Notifications')"
			@stop-loading="loaders.delete('Notifications')" />
		<ImagingStudiesRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Imaging Studies')"
			@stop-loading="loaders.delete('Imaging Studies')" />
		<PathologyReportsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Pathology Reports')"
			@stop-loading="loaders.delete('Pathology Reports')" />
		<LabOrdersRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Lab Orders')"
			@stop-loading="loaders.delete('Lab Orders')" />
		<ConsentsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Consents')"
			@stop-loading="loaders.delete('Consents')" />
		<ClinicalTrialsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Clinical Trials')"
			@stop-loading="loaders.delete('Clinical Trials')" />
		<ResearchStudiesRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Research Studies')"
			@stop-loading="loaders.delete('Research Studies')" />
		<NutritionalPlansRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Nutritional Plans')"
			@stop-loading="loaders.delete('Nutritional Plans')" />
		<DietOrdersRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Diet Orders')"
			@stop-loading="loaders.delete('Diet Orders')" />
		<PhysicalTherapySessionsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Physical Therapy Sessions')"
			@stop-loading="loaders.delete('Physical Therapy Sessions')" />
		<OccupationalTherapySessionsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Occupational Therapy Sessions')"
			@stop-loading="loaders.delete('Occupational Therapy Sessions')" />
		<SocialWorkNotesRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Social Work Notes')"
			@stop-loading="loaders.delete('Social Work Notes')" />
		<CaseManagerRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Case Manager')"
			@stop-loading="loaders.delete('Case Manager')" />
		<HomeCareVisitsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Home Care Visits')"
			@stop-loading="loaders.delete('Home Care Visits')" />
		<HospiceCareRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Hospice Care')"
			@stop-loading="loaders.delete('Hospice Care')" />
		<PalliativeCarePlansRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Palliative Care Plans')"
			@stop-loading="loaders.delete('Palliative Care Plans')" />
		<MortalityReportsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Mortality Reports')"
			@stop-loading="loaders.delete('Mortality Reports')" />
		<LegalHoldsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Legal Holds')"
			@stop-loading="loaders.delete('Legal Holds')" />
		<TransfusionsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Transfusions')"
			@stop-loading="loaders.delete('Transfusions')" />
		<VaccineRecordsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Vaccine Records')"
			@stop-loading="loaders.delete('Vaccine Records')" />
		<ImmunizationsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Immunizations')"
			@stop-loading="loaders.delete('Immunizations')" />
		<GrowthChartsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Growth Charts')"
			@stop-loading="loaders.delete('Growth Charts')" />
		<ScreeningsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Screenings')"
			@stop-loading="loaders.delete('Screenings')" />
		<RiskAssessmentsRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Risk Assessments')"
			@stop-loading="loaders.delete('Risk Assessments')" />
		<ScoresRelationWidget
			v-if="isEdit"
			:patient-id="route.params.id as string"
			@start-loading="loaders.add('Scores')"
			@stop-loading="loaders.delete('Scores')" />
	</Container>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Form from './components/Form.vue'
import ProgressBar from 'primevue/progressbar'
import Container from '@/components/Container.vue'
import AppointmentsRelationWidget from './components/AppointmentsRelationWidget.vue'
import MedicalRecordsRelationWidget from './components/MedicalRecordsRelationWidget.vue'
import PrescriptionsRelationWidget from './components/PrescriptionsRelationWidget.vue'
import InsurancesRelationWidget from './components/InsurancesRelationWidget.vue'
import AllergiesRelationWidget from './components/AllergiesRelationWidget.vue'
import AdmissionsRelationWidget from './components/AdmissionsRelationWidget.vue'
import BillingAccountsRelationWidget from './components/BillingAccountsRelationWidget.vue'
import TreatmentsRelationWidget from './components/TreatmentsRelationWidget.vue'
import LabTestsRelationWidget from './components/LabTestsRelationWidget.vue'
import RadiologyReportsRelationWidget from './components/RadiologyReportsRelationWidget.vue'
import SurgeriesRelationWidget from './components/SurgeriesRelationWidget.vue'
import ConsentFormsRelationWidget from './components/ConsentFormsRelationWidget.vue'
import ReferralsRelationWidget from './components/ReferralsRelationWidget.vue'
import VisitsRelationWidget from './components/VisitsRelationWidget.vue'
import VitalSignsRelationWidget from './components/VitalSignsRelationWidget.vue'
import DiagnosesRelationWidget from './components/DiagnosesRelationWidget.vue'
import FamilyContactsRelationWidget from './components/FamilyContactsRelationWidget.vue'
import EmergencyContactsRelationWidget from './components/EmergencyContactsRelationWidget.vue'
import CarePlansRelationWidget from './components/CarePlansRelationWidget.vue'
import CareTeamRelationWidget from './components/CareTeamRelationWidget.vue'
import WaitingListsRelationWidget from './components/WaitingListsRelationWidget.vue'
import MessagesRelationWidget from './components/MessagesRelationWidget.vue'
import NotificationsRelationWidget from './components/NotificationsRelationWidget.vue'
import ImagingStudiesRelationWidget from './components/ImagingStudiesRelationWidget.vue'
import PathologyReportsRelationWidget from './components/PathologyReportsRelationWidget.vue'
import LabOrdersRelationWidget from './components/LabOrdersRelationWidget.vue'
import ConsentsRelationWidget from './components/ConsentsRelationWidget.vue'
import ClinicalTrialsRelationWidget from './components/ClinicalTrialsRelationWidget.vue'
import ResearchStudiesRelationWidget from './components/ResearchStudiesRelationWidget.vue'
import NutritionalPlansRelationWidget from './components/NutritionalPlansRelationWidget.vue'
import DietOrdersRelationWidget from './components/DietOrdersRelationWidget.vue'
import PhysicalTherapySessionsRelationWidget from './components/PhysicalTherapySessionsRelationWidget.vue'
import OccupationalTherapySessionsRelationWidget from './components/OccupationalTherapySessionsRelationWidget.vue'
import SocialWorkNotesRelationWidget from './components/SocialWorkNotesRelationWidget.vue'
import CaseManagerRelationWidget from './components/CaseManagerRelationWidget.vue'
import HomeCareVisitsRelationWidget from './components/HomeCareVisitsRelationWidget.vue'
import HospiceCareRelationWidget from './components/HospiceCareRelationWidget.vue'
import PalliativeCarePlansRelationWidget from './components/PalliativeCarePlansRelationWidget.vue'
import MortalityReportsRelationWidget from './components/MortalityReportsRelationWidget.vue'
import LegalHoldsRelationWidget from './components/LegalHoldsRelationWidget.vue'
import TransfusionsRelationWidget from './components/TransfusionsRelationWidget.vue'
import VaccineRecordsRelationWidget from './components/VaccineRecordsRelationWidget.vue'
import ImmunizationsRelationWidget from './components/ImmunizationsRelationWidget.vue'
import GrowthChartsRelationWidget from './components/GrowthChartsRelationWidget.vue'
import ScreeningsRelationWidget from './components/ScreeningsRelationWidget.vue'
import RiskAssessmentsRelationWidget from './components/RiskAssessmentsRelationWidget.vue'
import ScoresRelationWidget from './components/ScoresRelationWidget.vue'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.name === 'patients-edit')
const loaders = reactive(new Set<string>())
</script>

<style lang="scss" scoped>
.edit__progress-bar {
	height: 4px;
	margin-bottom: -4px;
	width: 100%;
	border-radius: 0;
}

.edit {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
	gap: 20px;
	justify-items: center;
	align-items: start;
}
</style>
