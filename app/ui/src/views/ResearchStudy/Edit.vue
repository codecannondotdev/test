<template>
	<Header :title="isEdit ? 'Edit ResearchStudy' : 'Create ResearchStudy'" />
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
			@deleted="router.push({ name: 'research-studies-list' })" />
		<ClinicalTrialsRelationWidget
			v-if="isEdit"
			:research-study-id="route.params.id as string"
			@start-loading="loaders.add('Clinical Trials')"
			@stop-loading="loaders.delete('Clinical Trials')" />
		<ParticipantsRelationWidget
			v-if="isEdit"
			:research-study-id="route.params.id as string"
			@start-loading="loaders.add('Participants')"
			@stop-loading="loaders.delete('Participants')" />
	</Container>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Form from './components/Form.vue'
import ProgressBar from 'primevue/progressbar'
import Container from '@/components/Container.vue'
import ClinicalTrialsRelationWidget from './components/ClinicalTrialsRelationWidget.vue'
import ParticipantsRelationWidget from './components/ParticipantsRelationWidget.vue'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.name === 'research-studies-edit')
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
