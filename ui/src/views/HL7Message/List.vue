<template>
	<Header
		:list-state="listState"
		search
		title="HL7Messages" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="message_type"
				header="Message Type" />
			<Column header="Received At">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.received_at), 'yyyy-MM-dd HH:mm') }}
				</template>
			</Column>
			<Column
				field="payload"
				header="Payload" />
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
import type { HL7Message } from '@/models/HL7Message/Model'
import { useHL7MessageListState } from '@/models/HL7Message/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useHL7MessageListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: HL7Message }) {
	router.push({ name: 'hl7-messages-edit', params: { id: item.data.id } })
}
</script>
