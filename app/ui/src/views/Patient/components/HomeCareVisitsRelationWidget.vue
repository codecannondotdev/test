<template>
	<Card class="home-care-visits-relation-widget">
		<template #title>
			<h4 class="home-care-visits-relation-widget__title">Home Care Visits</h4>
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
				<Column header="Visit Date">
					<template #body="slotProps">
						{{ format(new Date(slotProps.data.visit_date), 'yyyy-MM-dd') }}
					</template>
				</Column>
				<Column
					header=""
					:style="{ maxWidth: '72px', width: '72px' }">
					<template #body="slotProps">
						<Button
							severity="secondary"
							outlined
							rounded
							icon="fal fa-times"
							:loading="dissociateLoading === slotProps.data.id"
							@click.stop.prevent="dissociate(slotProps.data)" />
					</template>
				</Column>
			</ApiTable>
		</template>
	</Card>
	<HomeCareVisitsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:patient-id="props.patientId"
		@update="refresh()" />
	<HomeCareVisitForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ patient_id: Number(props.patientId) }"
		:hide-inputs="['patient_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import HomeCareVisitsRelationAddDialog from './HomeCareVisitsRelationAddDialog.vue'
import HomeCareVisitForm from '@/views/HomeCareVisit/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useHomeCareVisitListState } from '@/models/HomeCareVisit/States'
import type { HomeCareVisit } from '@/models/HomeCareVisit/Model'
import type { Patient } from '@/models/Patient/Model'
import PatientsApi from '@/models/Patient/Api'
import { format } from 'date-fns'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	patientId: Patient['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useHomeCareVisitListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Patient',
		id: props.patientId,
		relation: 'homeCareVisits',
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

async function dissociate(item: HomeCareVisit) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new PatientsApi().updateRelation(props.patientId, 'homeCareVisits', {
			method: 'dissociate',
			params: [item.id],
		})
		dissociateLoading.value = null
		await refresh()
	} finally {
		dissociateLoading.value = null
		emit('stop-loading')
	}
}

function openDetails(item: { data: HomeCareVisit }) {
	router.push({ name: 'home-care-visits-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.home-care-visits-relation-widget {
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

				.home-care-visits-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
