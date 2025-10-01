<template>
	<Header :title="isEdit ? 'Edit ImagingStudy' : 'Create ImagingStudy'" />
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
			@deleted="router.push({ name: 'imaging-studies-list' })" />
		<DocumentsRelationWidget
			v-if="isEdit"
			:imaging-study-id="route.params.id as string"
			@start-loading="loaders.add('Documents')"
			@stop-loading="loaders.delete('Documents')" />
		<DicomInstancesRelationWidget
			v-if="isEdit"
			:imaging-study-id="route.params.id as string"
			@start-loading="loaders.add('Dicom Instances')"
			@stop-loading="loaders.delete('Dicom Instances')" />
		<RadiologyReportRelationWidget
			v-if="isEdit"
			:imaging-study-id="route.params.id as string"
			@start-loading="loaders.add('Radiology Report')"
			@stop-loading="loaders.delete('Radiology Report')" />
	</Container>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Form from './components/Form.vue'
import ProgressBar from 'primevue/progressbar'
import Container from '@/components/Container.vue'
import DocumentsRelationWidget from './components/DocumentsRelationWidget.vue'
import DicomInstancesRelationWidget from './components/DicomInstancesRelationWidget.vue'
import RadiologyReportRelationWidget from './components/RadiologyReportRelationWidget.vue'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.name === 'imaging-studies-edit')
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
