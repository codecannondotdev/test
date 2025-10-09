<template>
	<Header
		:list-state="listState"
		search
		title="Receipts" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="file_name"
				header="File Name" />
			<Column
				field="file_type"
				header="File Type" />
			<Column header="Uploaded At">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.uploaded_at), 'yyyy-MM-dd HH:mm') }}
				</template>
			</Column>
			<Column
				field="notes"
				header="Notes" />
			<Column
				field="file_size"
				header="File Size" />
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
import type { Receipt } from '@/models/Receipt/Model'
import { useReceiptListState } from '@/models/Receipt/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useReceiptListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Receipt }) {
	router.push({ name: 'receipts-edit', params: { id: item.data.id } })
}
</script>
