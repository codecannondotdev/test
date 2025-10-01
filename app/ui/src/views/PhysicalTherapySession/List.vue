<template>
	<Header
		:list-state="listState"
		search
		title="PhysicalTherapySessions" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column header="Session Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.session_date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="duration_minutes"
				header="Duration Minutes" />
			<Column
				field="therapist_notes"
				header="Therapist Notes" />
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
import type { PhysicalTherapySession } from '@/models/PhysicalTherapySession/Model'
import { usePhysicalTherapySessionListState } from '@/models/PhysicalTherapySession/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = usePhysicalTherapySessionListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: PhysicalTherapySession }) {
	router.push({ name: 'physical-therapy-sessions-edit', params: { id: item.data.id } })
}
</script>
