<template>
	<Header
		:list-state="listState"
		search
		title="TestResults" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="result_value"
				header="Result Value" />
			<Column
				field="units"
				header="Units" />
			<Column
				field="reference_range"
				header="Reference Range" />
			<Column header="Reported At">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.reported_at), 'yyyy-MM-dd HH:mm') }}
				</template>
			</Column>
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
import type { TestResult } from '@/models/TestResult/Model'
import { useTestResultListState } from '@/models/TestResult/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useTestResultListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: TestResult }) {
	router.push({ name: 'test-results-edit', params: { id: item.data.id } })
}
</script>
