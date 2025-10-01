<template>
	<Header
		:list-state="listState"
		search
		title="Surgeries" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="procedure_name"
				header="Procedure Name" />
			<Column header="Scheduled Start">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.scheduled_start), 'yyyy-MM-dd HH:mm') }}
				</template>
			</Column>
			<Column header="Scheduled End">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.scheduled_end), 'yyyy-MM-dd HH:mm') }}
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
import type { Surgery } from '@/models/Surgery/Model'
import { useSurgeryListState } from '@/models/Surgery/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useSurgeryListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Surgery }) {
	router.push({ name: 'surgeries-edit', params: { id: item.data.id } })
}
</script>
