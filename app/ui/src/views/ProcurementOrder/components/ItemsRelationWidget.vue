<template>
	<Card class="items-relation-widget">
		<template #title>
			<h4 class="items-relation-widget__title">Items</h4>
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
					field="name"
					header="Name" />
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
	<ItemsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:procurement-order-id="props.procurementOrderId"
		@update="refresh()" />
	<InventoryItemForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ procurement_order_id: Number(props.procurementOrderId) }"
		:hide-inputs="['procurement_order_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import ItemsRelationAddDialog from './ItemsRelationAddDialog.vue'
import InventoryItemForm from '@/views/InventoryItem/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useInventoryItemListState } from '@/models/InventoryItem/States'
import type { InventoryItem } from '@/models/InventoryItem/Model'
import type { ProcurementOrder } from '@/models/ProcurementOrder/Model'
import ProcurementOrdersApi from '@/models/ProcurementOrder/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	procurementOrderId: ProcurementOrder['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useInventoryItemListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\ProcurementOrder',
		id: props.procurementOrderId,
		relation: 'items',
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

async function dissociate(item: InventoryItem) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new ProcurementOrdersApi().updateRelation(props.procurementOrderId, 'items', {
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

function openDetails(item: { data: InventoryItem }) {
	router.push({ name: 'inventory-items-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.items-relation-widget {
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

				.items-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
