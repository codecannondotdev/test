<template>
	<Card class="integrations-relation-widget">
		<template #title>
			<h4 class="integrations-relation-widget__title">Integrations</h4>
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
					field="name"
					header="Name" />
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
	<IntegrationsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:a-pi-key-id="props.aPIKeyId"
		@update="refresh()" />
	<IntegrationForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ api_key_id: Number(props.aPIKeyId) }"
		:hide-inputs="['api_key_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import IntegrationsRelationAddDialog from './IntegrationsRelationAddDialog.vue'
import IntegrationForm from '@/views/Integration/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useIntegrationListState } from '@/models/Integration/States'
import type { Integration } from '@/models/Integration/Model'
import type { APIKey } from '@/models/APIKey/Model'
import APIKeysApi from '@/models/APIKey/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	aPIKeyId: APIKey['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useIntegrationListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\APIKey',
		id: props.aPIKeyId,
		relation: 'integrations',
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

async function dissociate(item: Integration) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new APIKeysApi().updateRelation(props.aPIKeyId, 'integrations', {
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

function openDetails(item: { data: Integration }) {
	router.push({ name: 'integrations-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.integrations-relation-widget {
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

				.integrations-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
