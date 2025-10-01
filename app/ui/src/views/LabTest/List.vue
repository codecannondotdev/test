<template>
	<Header
		:list-state="listState"
		search
		title="LabTests" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="test_name"
				header="Test Name" />
			<Column
				field="specimen_type"
				header="Specimen Type" />
			<Column header="Order Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.order_date), 'yyyy-MM-dd') }}
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
import type { LabTest } from '@/models/LabTest/Model'
import { useLabTestListState } from '@/models/LabTest/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useLabTestListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: LabTest }) {
	router.push({ name: 'lab-tests-edit', params: { id: item.data.id } })
}
</script>
