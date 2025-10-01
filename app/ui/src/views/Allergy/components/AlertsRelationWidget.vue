<template>
	<Card class="alerts-relation-widget">
		<template #title>
			<h4 class="alerts-relation-widget__title">Alerts</h4>
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
				<Column
					field="title"
					header="Title" />
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
	<AlertsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:allergy-id="props.allergyId"
		@update="refresh()" />
	<NotificationForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ allergy_id: Number(props.allergyId) }"
		:hide-inputs="['allergy_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import AlertsRelationAddDialog from './AlertsRelationAddDialog.vue'
import NotificationForm from '@/views/Notification/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useNotificationListState } from '@/models/Notification/States'
import type { Notification } from '@/models/Notification/Model'
import type { Allergy } from '@/models/Allergy/Model'
import AllergysApi from '@/models/Allergy/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	allergyId: Allergy['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useNotificationListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Allergy',
		id: props.allergyId,
		relation: 'alerts',
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

async function dissociate(item: Notification) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new AllergysApi().updateRelation(props.allergyId, 'alerts', {
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

function openDetails(item: { data: Notification }) {
	router.push({ name: 'notifications-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.alerts-relation-widget {
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

				.alerts-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
