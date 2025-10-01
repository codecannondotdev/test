<template>
	<Header
		:list-state="listState"
		search
		title="Visits" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="visit_type"
				header="Visit Type" />
			<Column header="Start Date Time">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.start_date_time), 'yyyy-MM-dd HH:mm') }}
				</template>
			</Column>
			<Column header="End Date Time">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.end_date_time), 'yyyy-MM-dd HH:mm') }}
				</template>
			</Column>
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
import type { Visit } from '@/models/Visit/Model'
import { useVisitListState } from '@/models/Visit/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useVisitListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Visit }) {
	router.push({ name: 'visits-edit', params: { id: item.data.id } })
}
</script>
