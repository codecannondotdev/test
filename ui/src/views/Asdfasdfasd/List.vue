<template>
	<Header
		:list-state="listState"
		search
		title="Asdfasdfasds" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="first_name"
				header="First Name" />
			<Column
				field="last_name"
				header="Last Name" />
			<Column
				field="email"
				header="Email" />
			<Column
				field="phone_number"
				header="Phone Number" />
			<Column header="Date Of Birth">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.date_of_birth), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="boolean"
				header="Boolean" />
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
import type { Asdfasdfasd } from '@/models/Asdfasdfasd/Model'
import { useAsdfasdfasdListState } from '@/models/Asdfasdfasd/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useAsdfasdfasdListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Asdfasdfasd }) {
	router.push({ name: 'asdfasdfasds-edit', params: { id: item.data.id } })
}
</script>
