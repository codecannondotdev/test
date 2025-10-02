<template>
	<Card class="kartas-relation-widget">
		<template #title>
			<h4 class="kartas-relation-widget__title">Kartas</h4>
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
					field="ime"
					header="Ime" />
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
	<KartasRelationAddDialog
		v-model="isRelationAddDialogActive"
		:predal-id="props.predalId"
		@update="refresh()" />
	<KartaForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ predal_id: Number(props.predalId) }"
		:hide-inputs="['predal_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import KartasRelationAddDialog from './KartasRelationAddDialog.vue'
import KartaForm from '@/views/Karta/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useKartaListState } from '@/models/Karta/States'
import type { Karta } from '@/models/Karta/Model'
import type { Predal } from '@/models/Predal/Model'
import PredalsApi from '@/models/Predal/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	predalId: Predal['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useKartaListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Predal',
		id: props.predalId,
		relation: 'kartas',
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

async function dissociate(item: Karta) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new PredalsApi().updateRelation(props.predalId, 'kartas', {
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

function openDetails(item: { data: Karta }) {
	router.push({ name: 'kartas-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.kartas-relation-widget {
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

				.kartas-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
