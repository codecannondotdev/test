<template>
	<Card class="shipment-items-relation-widget">
		<template #title>
			<h4 class="shipment-items-relation-widget__title">Shipment Items</h4>
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
					field="condition"
					header="Condition" />
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
	<ShipmentItemsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:shipment-id="props.shipmentId"
		@update="refresh()" />
	<ShipmentItemForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ shipment_id: Number(props.shipmentId) }"
		:hide-inputs="['shipment_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import ShipmentItemsRelationAddDialog from './ShipmentItemsRelationAddDialog.vue'
import ShipmentItemForm from '@/views/ShipmentItem/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useShipmentItemListState } from '@/models/ShipmentItem/States'
import type { ShipmentItem } from '@/models/ShipmentItem/Model'
import type { Shipment } from '@/models/Shipment/Model'
import ShipmentsApi from '@/models/Shipment/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	shipmentId: Shipment['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useShipmentItemListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Shipment',
		id: props.shipmentId,
		relation: 'shipmentItems',
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

async function dissociate(item: ShipmentItem) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new ShipmentsApi().updateRelation(props.shipmentId, 'shipmentItems', {
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

function openDetails(item: { data: ShipmentItem }) {
	router.push({ name: 'shipment-items-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.shipment-items-relation-widget {
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

				.shipment-items-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
