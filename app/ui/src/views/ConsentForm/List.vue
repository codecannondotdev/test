<template>
	<Header
		:list-state="listState"
		search
		title="ConsentForms" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="form_type"
				header="Form Type" />
			<Column header="Signed Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.signed_date), 'yyyy-MM-dd HH:mm') }}
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
import type { ConsentForm } from '@/models/ConsentForm/Model'
import { useConsentFormListState } from '@/models/ConsentForm/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useConsentFormListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: ConsentForm }) {
	router.push({ name: 'consent-forms-edit', params: { id: item.data.id } })
}
</script>
