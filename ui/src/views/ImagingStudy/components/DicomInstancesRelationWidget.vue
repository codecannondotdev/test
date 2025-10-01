<template>
	<Card class="dicom-instances-relation-widget">
		<template #title>
			<h4 class="dicom-instances-relation-widget__title">Dicom Instances</h4>
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
					field="uid"
					header="Uid" />
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
	<DicomInstancesRelationAddDialog
		v-model="isRelationAddDialogActive"
		:imaging-study-id="props.imagingStudyId"
		@update="refresh()" />
	<DICOMInstanceForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ imaging_study_id: Number(props.imagingStudyId) }"
		:hide-inputs="['imaging_study_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import DicomInstancesRelationAddDialog from './DicomInstancesRelationAddDialog.vue'
import DICOMInstanceForm from '@/views/DICOMInstance/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useDICOMInstanceListState } from '@/models/DICOMInstance/States'
import type { DICOMInstance } from '@/models/DICOMInstance/Model'
import type { ImagingStudy } from '@/models/ImagingStudy/Model'
import ImagingStudysApi from '@/models/ImagingStudy/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	imagingStudyId: ImagingStudy['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useDICOMInstanceListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\ImagingStudy',
		id: props.imagingStudyId,
		relation: 'dicomInstances',
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

async function dissociate(item: DICOMInstance) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new ImagingStudysApi().updateRelation(props.imagingStudyId, 'dicomInstances', {
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

function openDetails(item: { data: DICOMInstance }) {
	router.push({ name: 'dicom-instances-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.dicom-instances-relation-widget {
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

				.dicom-instances-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
