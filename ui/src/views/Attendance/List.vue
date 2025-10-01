<template>
	<Header
		:list-state="listState"
		search
		title="Attendances" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column header="Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="status"
				header="Status" />
			<Column
				field="notes"
				header="Notes" />
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
import type { Attendance } from '@/models/Attendance/Model'
import { useAttendanceListState } from '@/models/Attendance/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useAttendanceListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Attendance }) {
	router.push({ name: 'attendances-edit', params: { id: item.data.id } })
}
</script>
