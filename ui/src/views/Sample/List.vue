<template>
	<Header
		:list-state="listState"
		search
		title="Samples" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="sample_type"
				header="Sample Type" />
			<Column header="Collection Time">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.collection_time), 'yyyy-MM-dd HH:mm') }}
				</template>
			</Column>
			<Column
				field="condition"
				header="Condition" />
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
import type { Sample } from '@/models/Sample/Model'
import { useSampleListState } from '@/models/Sample/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useSampleListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Sample }) {
	router.push({ name: 'samples-edit', params: { id: item.data.id } })
}
</script>
