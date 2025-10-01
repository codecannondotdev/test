<template>
	<Header :title="isEdit ? 'Edit LabOrder' : 'Create LabOrder'" />
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
			@deleted="router.push({ name: 'lab-orders-list' })" />
		<LabTestsRelationWidget
			v-if="isEdit"
			:lab-order-id="route.params.id as string"
			@start-loading="loaders.add('Lab Tests')"
			@stop-loading="loaders.delete('Lab Tests')" />
		<SpecimensRelationWidget
			v-if="isEdit"
			:lab-order-id="route.params.id as string"
			@start-loading="loaders.add('Specimens')"
			@stop-loading="loaders.delete('Specimens')" />
	</Container>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Form from './components/Form.vue'
import ProgressBar from 'primevue/progressbar'
import Container from '@/components/Container.vue'
import LabTestsRelationWidget from './components/LabTestsRelationWidget.vue'
import SpecimensRelationWidget from './components/SpecimensRelationWidget.vue'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.name === 'lab-orders-edit')
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
