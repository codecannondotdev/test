<template>
	<Header
		:list-state="listState"
		search
		title="Shipments" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="shipment_number"
				header="Shipment Number" />
			<Column header="Shipment Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.shipment_date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="quantity_shipped"
				header="Quantity Shipped" />
			<Column
				field="destination"
				header="Destination" />
			<Column
				field="status"
				header="Status" />
			<Column
				field="carrier"
				header="Carrier" />
			<Column
				:style="{ maxWidth: '72px', width: '72px' }"
				header="">
				<template #body="slotProps">
					<ApiTableRemoveButton :item="slotProps.data" />
				</template>
			</Column>
		</ApiTable>
	</Container>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Container from '@/components/Container.vue'
import type { Shipment } from '@/models/Shipment/Model'
import { useShipmentListState } from '@/models/Shipment/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useShipmentListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Shipment }) {
	router.push({ name: 'shipments-edit', params: { id: item.data.id } })
}
</script>
