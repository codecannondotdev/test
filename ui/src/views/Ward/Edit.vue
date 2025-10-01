<template>
	<Header :title="isEdit ? 'Edit Ward' : 'Create Ward'" />
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
			@deleted="router.push({ name: 'wards-list' })" />
		<BedsRelationWidget
			v-if="isEdit"
			:ward-id="route.params.id as string"
			@start-loading="loaders.add('Beds')"
			@stop-loading="loaders.delete('Beds')" />
		<NursesRelationWidget
			v-if="isEdit"
			:ward-id="route.params.id as string"
			@start-loading="loaders.add('Nurses')"
			@stop-loading="loaders.delete('Nurses')" />
		<AdmissionsRelationWidget
			v-if="isEdit"
			:ward-id="route.params.id as string"
			@start-loading="loaders.add('Admissions')"
			@stop-loading="loaders.delete('Admissions')" />
		<RoomsRelationWidget
			v-if="isEdit"
			:ward-id="route.params.id as string"
			@start-loading="loaders.add('Rooms')"
			@stop-loading="loaders.delete('Rooms')" />
		<DevicesRelationWidget
			v-if="isEdit"
			:ward-id="route.params.id as string"
			@start-loading="loaders.add('Devices')"
			@stop-loading="loaders.delete('Devices')" />
	</Container>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Form from './components/Form.vue'
import ProgressBar from 'primevue/progressbar'
import Container from '@/components/Container.vue'
import BedsRelationWidget from './components/BedsRelationWidget.vue'
import NursesRelationWidget from './components/NursesRelationWidget.vue'
import AdmissionsRelationWidget from './components/AdmissionsRelationWidget.vue'
import RoomsRelationWidget from './components/RoomsRelationWidget.vue'
import DevicesRelationWidget from './components/DevicesRelationWidget.vue'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.name === 'wards-edit')
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
