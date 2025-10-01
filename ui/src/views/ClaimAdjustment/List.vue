<template>
	<Header
		:list-state="listState"
		search
		title="ClaimAdjustments" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="adjustment_code"
				header="Adjustment Code" />
			<Column
				field="amount_adjusted"
				header="Amount Adjusted" />
			<Column
				field="reason"
				header="Reason" />
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
import type { ClaimAdjustment } from '@/models/ClaimAdjustment/Model'
import { useClaimAdjustmentListState } from '@/models/ClaimAdjustment/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useClaimAdjustmentListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: ClaimAdjustment }) {
	router.push({ name: 'claim-adjustments-edit', params: { id: item.data.id } })
}
</script>
