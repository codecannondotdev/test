<template>
	<Header
		:list-state="listState"
		search
		title="Consents" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="consent_type"
				header="Consent Type" />
			<Column
				field="granted"
				header="Granted" />
			<Column header="Granted At">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.granted_at), 'yyyy-MM-dd HH:mm') }}
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
import type { Consent } from '@/models/Consent/Model'
import { useConsentListState } from '@/models/Consent/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useConsentListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Consent }) {
	router.push({ name: 'consents-edit', params: { id: item.data.id } })
}
</script>
