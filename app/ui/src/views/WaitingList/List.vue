<template>
	<Header
		:list-state="listState"
		search
		title="WaitingLists" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="position"
				header="Position" />
			<Column header="Added At">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.added_at), 'yyyy-MM-dd HH:mm') }}
				</template>
			</Column>
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
import type { WaitingList } from '@/models/WaitingList/Model'
import { useWaitingListListState } from '@/models/WaitingList/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useWaitingListListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: WaitingList }) {
	router.push({ name: 'waiting-lists-edit', params: { id: item.data.id } })
}
</script>
