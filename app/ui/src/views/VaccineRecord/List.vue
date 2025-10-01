<template>
	<Header
		:list-state="listState"
		search
		title="VaccineRecords" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="vaccine_name"
				header="Vaccine Name" />
			<Column header="Date Administered">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.date_administered), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="dose_number"
				header="Dose Number" />
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
import type { VaccineRecord } from '@/models/VaccineRecord/Model'
import { useVaccineRecordListState } from '@/models/VaccineRecord/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useVaccineRecordListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: VaccineRecord }) {
	router.push({ name: 'vaccine-records-edit', params: { id: item.data.id } })
}
</script>
