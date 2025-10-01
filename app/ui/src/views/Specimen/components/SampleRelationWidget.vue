<template>
	<Card class="sample-relation-widget">
		<template #title>
			<h4 class="sample-relation-widget__title">Sample</h4>
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
					field="sample_type"
					header="Sample Type" />
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
	<SampleRelationAddDialog
		v-model="isRelationAddDialogActive"
		:specimen-id="props.specimenId"
		@update="refresh()" />
	<SampleForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ specimen_id: Number(props.specimenId) }"
		:hide-inputs="['specimen_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import SampleRelationAddDialog from './SampleRelationAddDialog.vue'
import SampleForm from '@/views/Sample/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useSampleListState } from '@/models/Sample/States'
import type { Sample } from '@/models/Sample/Model'
import type { Specimen } from '@/models/Specimen/Model'
import SpecimensApi from '@/models/Specimen/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	specimenId: Specimen['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useSampleListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Specimen',
		id: props.specimenId,
		relation: 'sample',
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

async function dissociate(item: Sample) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new SpecimensApi().updateRelation(props.specimenId, 'sample', {
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

function openDetails(item: { data: Sample }) {
	router.push({ name: 'samples-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.sample-relation-widget {
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

				.sample-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
