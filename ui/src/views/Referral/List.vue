<template>
	<Header
		:list-state="listState"
		search
		title="Referrals" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="referral_source"
				header="Referral Source" />
			<Column
				field="reason"
				header="Reason" />
			<Column header="Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.date), 'yyyy-MM-dd') }}
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
import type { Referral } from '@/models/Referral/Model'
import { useReferralListState } from '@/models/Referral/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useReferralListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Referral }) {
	router.push({ name: 'referrals-edit', params: { id: item.data.id } })
}
</script>
