<template>
	<Card class="assignments-relation-widget">
		<template #title>
			<h4 class="assignments-relation-widget__title">Assignments</h4>
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
				<Column header="Assignment Date">
					<template #body="slotProps">
						{{ format(new Date(slotProps.data.assignment_date), 'yyyy-MM-dd') }}
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
	<AssignmentsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:shift-id="props.shiftId"
		@update="refresh()" />
	<ShiftAssignmentForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ shift_id: Number(props.shiftId) }"
		:hide-inputs="['shift_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import AssignmentsRelationAddDialog from './AssignmentsRelationAddDialog.vue'
import ShiftAssignmentForm from '@/views/ShiftAssignment/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useShiftAssignmentListState } from '@/models/ShiftAssignment/States'
import type { ShiftAssignment } from '@/models/ShiftAssignment/Model'
import type { Shift } from '@/models/Shift/Model'
import ShiftsApi from '@/models/Shift/Api'
import { format } from 'date-fns'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	shiftId: Shift['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useShiftAssignmentListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Shift',
		id: props.shiftId,
		relation: 'assignments',
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

async function dissociate(item: ShiftAssignment) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new ShiftsApi().updateRelation(props.shiftId, 'assignments', {
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

function openDetails(item: { data: ShiftAssignment }) {
	router.push({ name: 'shift-assignments-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.assignments-relation-widget {
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

				.assignments-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
