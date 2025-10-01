<template>
	<Header
		:list-state="listState"
		search
		title="Prescriptions" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="dose"
				header="Dose" />
			<Column
				field="frequency"
				header="Frequency" />
			<Column
				field="duration"
				header="Duration" />
			<Column
				field="instructions"
				header="Instructions" />
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
import type { Prescription } from '@/models/Prescription/Model'
import { usePrescriptionListState } from '@/models/Prescription/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = usePrescriptionListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Prescription }) {
	router.push({ name: 'prescriptions-edit', params: { id: item.data.id } })
}
</script>
