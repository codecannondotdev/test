<template>
	<Header
		:list-state="listState"
		search
		title="InsuranceClaims" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="claim_number"
				header="Claim Number" />
			<Column header="Submission Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.submission_date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="status"
				header="Status" />
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
import type { InsuranceClaim } from '@/models/InsuranceClaim/Model'
import { useInsuranceClaimListState } from '@/models/InsuranceClaim/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useInsuranceClaimListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: InsuranceClaim }) {
	router.push({ name: 'insurance-claims-edit', params: { id: item.data.id } })
}
</script>
