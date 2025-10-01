<template>
	<Header
		:list-state="listState"
		search
		title="Documents" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="filename"
				header="Filename" />
			<Column
				field="content_type"
				header="Content Type" />
			<Column header="Uploaded At">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.uploaded_at), 'yyyy-MM-dd HH:mm') }}
				</template>
			</Column>
			<Column
				field="description"
				header="Description" />
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
import type { Document } from '@/models/Document/Model'
import { useDocumentListState } from '@/models/Document/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useDocumentListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Document }) {
	router.push({ name: 'documents-edit', params: { id: item.data.id } })
}
</script>
