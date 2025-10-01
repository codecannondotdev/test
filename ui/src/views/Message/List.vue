<template>
	<Header
		:list-state="listState"
		search
		title="Messages" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="subject"
				header="Subject" />
			<Column
				field="body"
				header="Body" />
			<Column header="Sent At">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.sent_at), 'yyyy-MM-dd HH:mm') }}
				</template>
			</Column>
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
import type { Message } from '@/models/Message/Model'
import { useMessageListState } from '@/models/Message/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useMessageListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Message }) {
	router.push({ name: 'messages-edit', params: { id: item.data.id } })
}
</script>
