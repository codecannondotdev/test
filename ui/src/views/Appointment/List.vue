<template>
	<Header
		:list-state="listState"
		search
		title="Appointments" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column header="Appointment Date Time">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.appointment_date_time), 'yyyy-MM-dd HH:mm') }}
				</template>
			</Column>
			<Column
				field="duration_minutes"
				header="Duration Minutes" />
			<Column
				field="reason"
				header="Reason" />
			<Column
				field="status"
				header="Status" />
			<Column
				field="room"
				header="Room" />
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
import type { Appointment } from '@/models/Appointment/Model'
import { useAppointmentListState } from '@/models/Appointment/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useAppointmentListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Appointment }) {
	router.push({ name: 'appointments-edit', params: { id: item.data.id } })
}
</script>
