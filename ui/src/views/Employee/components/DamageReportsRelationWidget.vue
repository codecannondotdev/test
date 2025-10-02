<template>
	<Card class="damage-reports-relation-widget">
		<template #title>
			<h4 class="damage-reports-relation-widget__title">Damage Reports</h4>
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
					field="description"
					header="Description" />
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
	<DamageReportsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:employee-id="props.employeeId"
		@update="refresh()" />
	<DamageReportForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ employee_id: Number(props.employeeId) }"
		:hide-inputs="['employee_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import DamageReportsRelationAddDialog from './DamageReportsRelationAddDialog.vue'
import DamageReportForm from '@/views/DamageReport/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useDamageReportListState } from '@/models/DamageReport/States'
import type { DamageReport } from '@/models/DamageReport/Model'
import type { Employee } from '@/models/Employee/Model'
import EmployeesApi from '@/models/Employee/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	employeeId: Employee['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useDamageReportListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Employee',
		id: props.employeeId,
		relation: 'damageReports',
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

async function dissociate(item: DamageReport) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new EmployeesApi().updateRelation(props.employeeId, 'damageReports', {
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

function openDetails(item: { data: DamageReport }) {
	router.push({ name: 'damage-reports-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.damage-reports-relation-widget {
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

				.damage-reports-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
