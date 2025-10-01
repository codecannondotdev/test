<template>
	<Header
		:list-state="listState"
		search
		title="AuditLogs" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="event_type"
				header="Event Type" />
			<Column header="Performed At">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.performed_at), 'yyyy-MM-dd HH:mm') }}
				</template>
			</Column>
			<Column
				field="details"
				header="Details" />
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
import type { AuditLog } from '@/models/AuditLog/Model'
import { useAuditLogListState } from '@/models/AuditLog/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useAuditLogListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: AuditLog }) {
	router.push({ name: 'audit-logs-edit', params: { id: item.data.id } })
}
</script>
