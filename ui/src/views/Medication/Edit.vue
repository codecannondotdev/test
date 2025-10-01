<template>
	<Header :title="isEdit ? 'Edit Medication' : 'Create Medication'" />
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
			@deleted="router.push({ name: 'medications-list' })" />
		<PrescriptionsRelationWidget
			v-if="isEdit"
			:medication-id="route.params.id as string"
			@start-loading="loaders.add('Prescriptions')"
			@stop-loading="loaders.delete('Prescriptions')" />
		<TreatmentsRelationWidget
			v-if="isEdit"
			:medication-id="route.params.id as string"
			@start-loading="loaders.add('Treatments')"
			@stop-loading="loaders.delete('Treatments')" />
		<InventoryItemsRelationWidget
			v-if="isEdit"
			:medication-id="route.params.id as string"
			@start-loading="loaders.add('Inventory Items')"
			@stop-loading="loaders.delete('Inventory Items')" />
		<PharmacyOrdersRelationWidget
			v-if="isEdit"
			:medication-id="route.params.id as string"
			@start-loading="loaders.add('Pharmacy Orders')"
			@stop-loading="loaders.delete('Pharmacy Orders')" />
		<BarcodeLabelsRelationWidget
			v-if="isEdit"
			:medication-id="route.params.id as string"
			@start-loading="loaders.add('Barcode Labels')"
			@stop-loading="loaders.delete('Barcode Labels')" />
	</Container>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Form from './components/Form.vue'
import ProgressBar from 'primevue/progressbar'
import Container from '@/components/Container.vue'
import PrescriptionsRelationWidget from './components/PrescriptionsRelationWidget.vue'
import TreatmentsRelationWidget from './components/TreatmentsRelationWidget.vue'
import InventoryItemsRelationWidget from './components/InventoryItemsRelationWidget.vue'
import PharmacyOrdersRelationWidget from './components/PharmacyOrdersRelationWidget.vue'
import BarcodeLabelsRelationWidget from './components/BarcodeLabelsRelationWidget.vue'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.name === 'medications-edit')
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
