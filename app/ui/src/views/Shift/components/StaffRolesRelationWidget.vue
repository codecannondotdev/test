<template>
	<Card class="staff-roles-relation-widget">
		<template #title>
			<h4 class="staff-roles-relation-widget__title">Staff Roles</h4>
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
					field="title"
					header="Title" />
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
	<StaffRolesRelationAddDialog
		v-model="isRelationAddDialogActive"
		:shift-id="props.shiftId"
		@update="refresh()" />
	<StaffRoleForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:attach-to="{ shifts: { method: 'syncWithoutDetaching', id: props.shiftId } }"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import StaffRolesRelationAddDialog from './StaffRolesRelationAddDialog.vue'
import StaffRoleForm from '@/views/StaffRole/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useStaffRoleListState } from '@/models/StaffRole/States'
import type { StaffRole } from '@/models/StaffRole/Model'
import type { Shift } from '@/models/Shift/Model'
import ShiftsApi from '@/models/Shift/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	shiftId: Shift['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const detachLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useStaffRoleListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Shift',
		id: props.shiftId,
		relation: 'staffRoles',
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

async function detach(item: StaffRole) {
	detachLoading.value = item.id
	emit('start-loading')
	try {
		await new ShiftsApi().updateRelation(props.shiftId, 'staffRoles', {
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

function openDetails(item: { data: StaffRole }) {
	router.push({ name: 'staff-roles-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.staff-roles-relation-widget {
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

				.staff-roles-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
