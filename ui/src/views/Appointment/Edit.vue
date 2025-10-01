<template>
	<Header :title="isEdit ? 'Edit Appointment' : 'Create Appointment'" />
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
			@deleted="router.push({ name: 'appointments-list' })" />
		<VisitNotesRelationWidget
			v-if="isEdit"
			:appointment-id="route.params.id as string"
			@start-loading="loaders.add('Visit Notes')"
			@stop-loading="loaders.delete('Visit Notes')" />
		<WaitingListRelationWidget
			v-if="isEdit"
			:appointment-id="route.params.id as string"
			@start-loading="loaders.add('Waiting List')"
			@stop-loading="loaders.delete('Waiting List')" />
		<TelemedicineSessionRelationWidget
			v-if="isEdit"
			:appointment-id="route.params.id as string"
			@start-loading="loaders.add('Telemedicine Session')"
			@stop-loading="loaders.delete('Telemedicine Session')" />
		<FollowUpRelationWidget
			v-if="isEdit"
			:appointment-id="route.params.id as string"
			@start-loading="loaders.add('Follow Up')"
			@stop-loading="loaders.delete('Follow Up')" />
	</Container>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Form from './components/Form.vue'
import ProgressBar from 'primevue/progressbar'
import Container from '@/components/Container.vue'
import VisitNotesRelationWidget from './components/VisitNotesRelationWidget.vue'
import WaitingListRelationWidget from './components/WaitingListRelationWidget.vue'
import TelemedicineSessionRelationWidget from './components/TelemedicineSessionRelationWidget.vue'
import FollowUpRelationWidget from './components/FollowUpRelationWidget.vue'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.name === 'appointments-edit')
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
