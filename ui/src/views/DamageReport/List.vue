<template>
	<Header
		:list-state="listState"
		search
		title="DamageReports" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column header="Report Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.report_date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="description"
				header="Description" />
			<Column
				field="severity"
				header="Severity" />
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
import type { DamageReport } from '@/models/DamageReport/Model'
import { useDamageReportListState } from '@/models/DamageReport/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useDamageReportListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: DamageReport }) {
	router.push({ name: 'damage-reports-edit', params: { id: item.data.id } })
}
</script>
