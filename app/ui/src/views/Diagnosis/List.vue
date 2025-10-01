<template>
	<Header
		:list-state="listState"
		search
		title="Diagnoses" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="code"
				header="Code" />
			<Column
				field="description"
				header="Description" />
			<Column
				field="primary"
				header="Primary" />
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
import type { Diagnosis } from '@/models/Diagnosis/Model'
import { useDiagnosisListState } from '@/models/Diagnosis/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useDiagnosisListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Diagnosis }) {
	router.push({ name: 'diagnoses-edit', params: { id: item.data.id } })
}
</script>
