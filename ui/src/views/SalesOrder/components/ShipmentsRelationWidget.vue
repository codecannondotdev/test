<template>
	<Card class="shipments-relation-widget">
		<template #title>
			<h4 class="shipments-relation-widget__title">Shipments</h4>
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
					field="shipment_number"
					header="Shipment Number" />
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
	<ShipmentsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:sales-order-id="props.salesOrderId"
		@update="refresh()" />
	<ShipmentForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ sales_order_id: Number(props.salesOrderId) }"
		:hide-inputs="['sales_order_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import ShipmentsRelationAddDialog from './ShipmentsRelationAddDialog.vue'
import ShipmentForm from '@/views/Shipment/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useShipmentListState } from '@/models/Shipment/States'
import type { Shipment } from '@/models/Shipment/Model'
import type { SalesOrder } from '@/models/SalesOrder/Model'
import SalesOrdersApi from '@/models/SalesOrder/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	salesOrderId: SalesOrder['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useShipmentListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\SalesOrder',
		id: props.salesOrderId,
		relation: 'shipments',
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

async function dissociate(item: Shipment) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new SalesOrdersApi().updateRelation(props.salesOrderId, 'shipments', {
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

function openDetails(item: { data: Shipment }) {
	router.push({ name: 'shipments-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.shipments-relation-widget {
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

				.shipments-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
