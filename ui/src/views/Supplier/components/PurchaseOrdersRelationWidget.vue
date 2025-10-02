<template>
	<Card class="purchase-orders-relation-widget">
		<template #title>
			<h4 class="purchase-orders-relation-widget__title">Purchase Orders</h4>
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
					field="status"
					header="Status" />
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
	<PurchaseOrdersRelationAddDialog
		v-model="isRelationAddDialogActive"
		:supplier-id="props.supplierId"
		@update="refresh()" />
	<PurchaseOrderForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ supplier_id: Number(props.supplierId) }"
		:hide-inputs="['supplier_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import PurchaseOrdersRelationAddDialog from './PurchaseOrdersRelationAddDialog.vue'
import PurchaseOrderForm from '@/views/PurchaseOrder/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { usePurchaseOrderListState } from '@/models/PurchaseOrder/States'
import type { PurchaseOrder } from '@/models/PurchaseOrder/Model'
import type { Supplier } from '@/models/Supplier/Model'
import SuppliersApi from '@/models/Supplier/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	supplierId: Supplier['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = usePurchaseOrderListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Supplier',
		id: props.supplierId,
		relation: 'purchaseOrders',
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

async function dissociate(item: PurchaseOrder) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new SuppliersApi().updateRelation(props.supplierId, 'purchaseOrders', {
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

function openDetails(item: { data: PurchaseOrder }) {
	router.push({ name: 'purchase-orders-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.purchase-orders-relation-widget {
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

				.purchase-orders-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
