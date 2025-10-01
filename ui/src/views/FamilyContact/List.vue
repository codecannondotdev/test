<template>
	<Header
		:list-state="listState"
		search
		title="FamilyContacts" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="name"
				header="Name" />
			<Column
				field="relationship"
				header="Relationship" />
			<Column
				field="phone"
				header="Phone" />
			<Column
				field="email"
				header="Email" />
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
import type { FamilyContact } from '@/models/FamilyContact/Model'
import { useFamilyContactListState } from '@/models/FamilyContact/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useFamilyContactListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: FamilyContact }) {
	router.push({ name: 'family-contacts-edit', params: { id: item.data.id } })
}
</script>
