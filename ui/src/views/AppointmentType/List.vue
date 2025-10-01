<template>
	<Header
		:list-state="listState"
		search
		title="AppointmentTypes" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="name"
				header="Name" />
			<Column
				field="default_duration"
				header="Default Duration" />
			<Column
				field="default_location"
				header="Default Location" />
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
import type { AppointmentType } from '@/models/AppointmentType/Model'
import { useAppointmentTypeListState } from '@/models/AppointmentType/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useAppointmentTypeListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: AppointmentType }) {
	router.push({ name: 'appointment-types-edit', params: { id: item.data.id } })
}
</script>
