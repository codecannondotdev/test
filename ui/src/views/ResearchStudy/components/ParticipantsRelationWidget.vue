<template>
	<Card class="participants-relation-widget">
		<template #title>
			<h4 class="participants-relation-widget__title">Participants</h4>
			<Button
				icon="fal fa-link"
				label="Connect"
				outlined
				severity="secondary"
				@click="isRelationAddDialogActive = true" />
			<Button
				icon="fal fa-plus"
				label="Create"
				outlined
				severity="secondary"
				@click="isFormActive = true" />
		</template>
		<template #content>
			<ApiTable
				flat
				:list-state="listState"
				@row-click="openDetails">
				<Column
					field="first_name"
					header="First Name" />
				<Column
					header=""
					:style="{ maxWidth: '72px', width: '72px' }">
					<template #body="slotProps">
						<Button
							severity="secondary"
							outlined
							rounded
							icon="fal fa-times"
							:loading="detachLoading === slotProps.data.id"
							@click.stop.prevent="detach(slotProps.data)" />
					</template>
				</Column>
			</ApiTable>
		</template>
	</Card>
	<ParticipantsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:research-study-id="props.researchStudyId"
		@update="refresh()" />
	<PatientForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:attach-to="{ researchStudies: { method: 'syncWithoutDetaching', id: props.researchStudyId } }"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import ParticipantsRelationAddDialog from './ParticipantsRelationAddDialog.vue'
import PatientForm from '@/views/Patient/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { usePatientListState } from '@/models/Patient/States'
import type { Patient } from '@/models/Patient/Model'
import type { ResearchStudy } from '@/models/ResearchStudy/Model'
import ResearchStudysApi from '@/models/ResearchStudy/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	researchStudyId: ResearchStudy['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const detachLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = usePatientListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\ResearchStudy',
		id: props.researchStudyId,
		relation: 'participants',
	},
}

onBeforeMount(() => {
	refresh()
})

async function refresh() {
	listLoading.value = true
	emit('start-loading')
	try {
		await listState.getList()
	} finally {
		listLoading.value = false
		emit('stop-loading')
	}
}

async function detach(item: Patient) {
	detachLoading.value = item.id
	emit('start-loading')
	try {
		await new ResearchStudysApi().updateRelation(props.researchStudyId, 'participants', {
			method: 'detach',
			params: [item.id],
		})
		detachLoading.value = null
		await refresh()
	} finally {
		detachLoading.value = null
		emit('stop-loading')
	}
}

function openDetails(item: { data: Patient }) {
	router.push({ name: 'patients-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.participants-relation-widget {
	width: 100%;
	max-width: 600px;
	overflow: hidden;

	:deep(.p-card-body) {
		padding: 20px 0 0;

		.p-card-caption {
			padding: 0px 20px 12px;

			.p-card-title {
				display: flex;
				align-items: center;
				gap: 10px;

				.participants-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
