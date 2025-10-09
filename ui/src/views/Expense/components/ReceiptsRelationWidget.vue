<template>
	<Card class="receipts-relation-widget">
		<template #title>
			<h4 class="receipts-relation-widget__title">Receipts</h4>
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
					field="file_name"
					header="File Name" />
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
	<ReceiptsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:expense-id="props.expenseId"
		@update="refresh()" />
	<ReceiptForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ expense_id: Number(props.expenseId) }"
		:hide-inputs="['expense_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import ReceiptsRelationAddDialog from './ReceiptsRelationAddDialog.vue'
import ReceiptForm from '@/views/Receipt/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useReceiptListState } from '@/models/Receipt/States'
import type { Receipt } from '@/models/Receipt/Model'
import type { Expense } from '@/models/Expense/Model'
import ExpensesApi from '@/models/Expense/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	expenseId: Expense['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useReceiptListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Expense',
		id: props.expenseId,
		relation: 'receipts',
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

async function dissociate(item: Receipt) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new ExpensesApi().updateRelation(props.expenseId, 'receipts', {
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

function openDetails(item: { data: Receipt }) {
	router.push({ name: 'receipts-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.receipts-relation-widget {
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

				.receipts-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
