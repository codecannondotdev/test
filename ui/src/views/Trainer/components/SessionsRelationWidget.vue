<template>
	<Card class="sessions-relation-widget">
		<template #title>
			<h4 class="sessions-relation-widget__title">Sessions</h4>
			<Button
				icon="fal fa-link"
				label="Connect"
				outlined
				severity="secondary"
				@click="isRelationAddDialogActive = true" />
			<Button
				icon="fal fa-plus"
				label="Create"
				outlined
				severity="secondary"
				@click="isFormActive = true" />
		</template>
		<template #content>
			<ApiTable
				flat
				:list-state="listState"
				@row-click="openDetails">
				<Column header="Date">
					<template #body="slotProps">
						{{ format(new Date(slotProps.data.date), 'yyyy-MM-dd') }}
					</template>
				</Column>
				<Column
					header=""
					:style="{ maxWidth: '72px', width: '72px' }">
					<template #body="slotProps">
						<Button
							severity="secondary"
							outlined
							rounded
							icon="fal fa-times"
							:loading="dissociateLoading === slotProps.data.id"
							@click.stop.prevent="dissociate(slotProps.data)" />
					</template>
				</Column>
			</ApiTable>
		</template>
	</Card>
	<SessionsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:trainer-id="props.trainerId"
		@update="refresh()" />
	<SessionForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ trainer_id: Number(props.trainerId) }"
		:hide-inputs="['trainer_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import SessionsRelationAddDialog from './SessionsRelationAddDialog.vue'
import SessionForm from '@/views/Session/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useSessionListState } from '@/models/Session/States'
import type { Session } from '@/models/Session/Model'
import type { Trainer } from '@/models/Trainer/Model'
import TrainersApi from '@/models/Trainer/Api'
import { format } from 'date-fns'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	trainerId: Trainer['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useSessionListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Trainer',
		id: props.trainerId,
		relation: 'sessions',
	},
}

onBeforeMount(() => {
	refresh()
})

async function refresh() {
	listLoading.value = true
	emit('start-loading')
	try {
		await listState.getList()
	} finally {
		listLoading.value = false
		emit('stop-loading')
	}
}

async function dissociate(item: Session) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new TrainersApi().updateRelation(props.trainerId, 'sessions', {
			method: 'dissociate',
			params: [item.id],
		})
		dissociateLoading.value = null
		await refresh()
	} finally {
		dissociateLoading.value = null
		emit('stop-loading')
	}
}

function openDetails(item: { data: Session }) {
	router.push({ name: 'sessions-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.sessions-relation-widget {
	width: 100%;
	max-width: 600px;
	overflow: hidden;

	:deep(.p-card-body) {
		padding: 20px 0 0;

		.p-card-caption {
			padding: 0px 20px 12px;

			.p-card-title {
				display: flex;
				align-items: center;
				gap: 10px;

				.sessions-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
