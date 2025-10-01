<template>
	<Header
		:list-state="listState"
		search
		title="LeaveRequests" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column header="Start Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.start_date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column header="End Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.end_date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="type"
				header="Type" />
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
import type { LeaveRequest } from '@/models/LeaveRequest/Model'
import { useLeaveRequestListState } from '@/models/LeaveRequest/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useLeaveRequestListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: LeaveRequest }) {
	router.push({ name: 'leave-requests-edit', params: { id: item.data.id } })
}
</script>
