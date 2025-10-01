<template>
	<Header :title="isEdit ? 'Edit Doctor' : 'Create Doctor'" />
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
			@deleted="router.push({ name: 'doctors-list' })" />
		<AppointmentsRelationWidget
			v-if="isEdit"
			:doctor-id="route.params.id as string"
			@start-loading="loaders.add('Appointments')"
			@stop-loading="loaders.delete('Appointments')" />
		<TreatmentsRelationWidget
			v-if="isEdit"
			:doctor-id="route.params.id as string"
			@start-loading="loaders.add('Treatments')"
			@stop-loading="loaders.delete('Treatments')" />
		<PrescriptionsRelationWidget
			v-if="isEdit"
			:doctor-id="route.params.id as string"
			@start-loading="loaders.add('Prescriptions')"
			@stop-loading="loaders.delete('Prescriptions')" />
		<DepartmentsRelationWidget
			v-if="isEdit"
			:doctor-id="route.params.id as string"
			@start-loading="loaders.add('Departments')"
			@stop-loading="loaders.delete('Departments')" />
		<LabTestsRelationWidget
			v-if="isEdit"
			:doctor-id="route.params.id as string"
			@start-loading="loaders.add('Lab Tests')"
			@stop-loading="loaders.delete('Lab Tests')" />
		<SurgeriesRelationWidget
			v-if="isEdit"
			:doctor-id="route.params.id as string"
			@start-loading="loaders.add('Surgeries')"
			@stop-loading="loaders.delete('Surgeries')" />
		<AnesthesiaRelationWidget
			v-if="isEdit"
			:doctor-id="route.params.id as string"
			@start-loading="loaders.add('Anesthesia')"
			@stop-loading="loaders.delete('Anesthesia')" />
		<ReferralsMadeRelationWidget
			v-if="isEdit"
			:doctor-id="route.params.id as string"
			@start-loading="loaders.add('Referrals Made')"
			@stop-loading="loaders.delete('Referrals Made')" />
		<ReferralsReceivedRelationWidget
			v-if="isEdit"
			:doctor-id="route.params.id as string"
			@start-loading="loaders.add('Referrals Received')"
			@stop-loading="loaders.delete('Referrals Received')" />
		<SpecialtiesRelationWidget
			v-if="isEdit"
			:doctor-id="route.params.id as string"
			@start-loading="loaders.add('Specialties')"
			@stop-loading="loaders.delete('Specialties')" />
		<LabOrdersRelationWidget
			v-if="isEdit"
			:doctor-id="route.params.id as string"
			@start-loading="loaders.add('Lab Orders')"
			@stop-loading="loaders.delete('Lab Orders')" />
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
import TreatmentsRelationWidget from './components/TreatmentsRelationWidget.vue'
import PrescriptionsRelationWidget from './components/PrescriptionsRelationWidget.vue'
import DepartmentsRelationWidget from './components/DepartmentsRelationWidget.vue'
import LabTestsRelationWidget from './components/LabTestsRelationWidget.vue'
import SurgeriesRelationWidget from './components/SurgeriesRelationWidget.vue'
import AnesthesiaRelationWidget from './components/AnesthesiaRelationWidget.vue'
import ReferralsMadeRelationWidget from './components/ReferralsMadeRelationWidget.vue'
import ReferralsReceivedRelationWidget from './components/ReferralsReceivedRelationWidget.vue'
import SpecialtiesRelationWidget from './components/SpecialtiesRelationWidget.vue'
import LabOrdersRelationWidget from './components/LabOrdersRelationWidget.vue'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.name === 'doctors-edit')
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
