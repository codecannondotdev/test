<template>
	<Header
		:list-state="listState"
		search
		title="Payments" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="amount"
				header="Amount" />
			<Column header="Payment Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.payment_date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="payment_method"
				header="Payment Method" />
			<Column
				field="note"
				header="Note" />
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
import type { Payment } from '@/models/Payment/Model'
import { usePaymentListState } from '@/models/Payment/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = usePaymentListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Payment }) {
	router.push({ name: 'payments-edit', params: { id: item.data.id } })
}
</script>
