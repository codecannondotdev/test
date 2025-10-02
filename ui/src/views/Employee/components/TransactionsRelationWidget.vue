<template>
	<Card class="transactions-relation-widget">
		<template #title>
			<h4 class="transactions-relation-widget__title">Transactions</h4>
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
					field="type"
					header="Type" />
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
	<TransactionsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:employee-id="props.employeeId"
		@update="refresh()" />
	<TransactionForm
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
import TransactionsRelationAddDialog from './TransactionsRelationAddDialog.vue'
import TransactionForm from '@/views/Transaction/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useTransactionListState } from '@/models/Transaction/States'
import type { Transaction } from '@/models/Transaction/Model'
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
const listState = useTransactionListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Employee',
		id: props.employeeId,
		relation: 'transactions',
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

async function dissociate(item: Transaction) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new EmployeesApi().updateRelation(props.employeeId, 'transactions', {
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

function openDetails(item: { data: Transaction }) {
	router.push({ name: 'transactions-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.transactions-relation-widget {
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

				.transactions-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
