<template>
	<Header
		:list-state="listState"
		search
		title="MortalityReports" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column header="Date Of Death">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.date_of_death), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="cause"
				header="Cause" />
			<Column
				field="reviewed_by"
				header="Reviewed By" />
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
import type { MortalityReport } from '@/models/MortalityReport/Model'
import { useMortalityReportListState } from '@/models/MortalityReport/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useMortalityReportListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: MortalityReport }) {
	router.push({ name: 'mortality-reports-edit', params: { id: item.data.id } })
}
</script>
