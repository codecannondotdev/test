<template>
	<Header
		:list-state="listState"
		search
		title="MedicalRecords" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="title"
				header="Title" />
			<Column header="Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="summary"
				header="Summary" />
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
import type { MedicalRecord } from '@/models/MedicalRecord/Model'
import { useMedicalRecordListState } from '@/models/MedicalRecord/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useMedicalRecordListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: MedicalRecord }) {
	router.push({ name: 'medical-records-edit', params: { id: item.data.id } })
}
</script>
