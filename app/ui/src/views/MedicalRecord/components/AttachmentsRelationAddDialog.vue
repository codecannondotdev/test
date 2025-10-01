<template>
	<Drawer
		v-model:visible="isActive"
		position="right"
		class="medical-record-attachments-add-dialog"
		header="Add Document">
		<div class="medical-record-attachments-add-dialog__header">
			<div class="medical-record-attachments-add-dialog__assigned-filter-container">
				<div class="medical-record-attachments-add-dialog__assigned-filter-label-container">
					<label>Show all Documents</label>
					<label
						><small
							>Assigning Documents to this Medical Record will change their current
							assignment</small
						></label
					>
				</div>
				<ToggleSwitch v-model="withAssigned" />
			</div>
			<div class="medical-record-attachments-add-dialog__search-container">
				<IconField>
					<InputIcon class="fal fa-search" />
					<InputText
						v-model="searchString"
						class="medical-record-attachments-add-dialog__search-input"
						placeholder="Search"
						@update:model-value="listState.getList({ search: searchString })"
						@keyup.enter="listState.getList({ search: searchString })"></InputText>
				</IconField>
			</div>
		</div>
		<div class="medical-record-attachments-add-dialog__table-container">
			<ApiTable
				v-model:selection="selected"
				selection-mode="multiple"
				flat
				:list-state="listState">
				<Column
					selection-mode="multiple"
					header-style="width: 3rem"></Column>
				<Column
					field="filename"
					header="Filename" />
			</ApiTable>
		</div>
		<div class="medical-record-attachments-add-dialog__add-buttton-container">
			<Button
				class="medical-record-attachments-add-dialog__add-button"
				:disabled="selected.length === 0"
				:loading="isLoading"
				:label="`Add ${selected.length} Documents`"
				icon="fal fa-plus"
				@click="submit" />
		</div>
	</Drawer>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer'
import Button from 'primevue/button'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon'
import IconField from 'primevue/iconfield'
import ToggleSwitch from 'primevue/toggleswitch'
import type { MedicalRecord } from '@/models/MedicalRecord/Model'
import { defineModel, ref, watch } from 'vue'
import type { Document } from '@/models/Document/Model'
import { useDocumentListState } from '@/models/Document/States'
import MedicalRecordsApi from '@/models/MedicalRecord/Api'

const emit = defineEmits(['update'])

const isActive = defineModel<boolean>()

const props = defineProps<{
	medicalRecordId: MedicalRecord['id']
}>()

const selected = ref<Document[]>([])
const isLoading = ref(false)
const searchString = ref('')
const withAssigned = ref(false)

const listState = useDocumentListState()
listState.defaultParams = {
	notFromRelation: {
		model: 'App\\Models\\MedicalRecord',
		id: props.medicalRecordId,
		relation: 'attachments',
	},
}

watch(
	withAssigned,
	() => {
		if (withAssigned.value) {
			listState.query().save()
		} else {
			listState.query().whereDoesntHave('medicalRecord').save()
		}
		if (isActive.value) {
			listState.getList()
		}
	},
	{ immediate: true },
)

watch(
	isActive,
	() => {
		if (!isActive.value) {
			withAssigned.value = false
			searchString.value = ''
			selected.value = []
			listState.clearList()
		} else {
			listState.getList()
		}
	},
	{ immediate: true },
)

async function submit() {
	isLoading.value = true
	try {
		await new MedicalRecordsApi().updateRelation(props.medicalRecordId, 'attachments', {
			method: 'associate',
			params: selected.value.map((item) => item.id),
		})
		isActive.value = false
		emit('update')
		selected.value = []
	} finally {
		isLoading.value = false
	}
}
</script>

<style lang="scss">
.medical-record-attachments-add-dialog {
	width: 800px !important;

	.p-drawer-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0;
	}

	.medical-record-attachments-add-dialog__header {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;

		.medical-record-attachments-add-dialog__search-container {
			flex: 1;
			width: 100%;

			.medical-record-attachments-add-dialog__search-input {
				width: 100%;
			}
		}

		.medical-record-attachments-add-dialog__assigned-filter-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 10px;

			.medical-record-attachments-add-dialog__assigned-filter-label-container {
				display: flex;
				flex-direction: column;

				& > label {
					line-height: 1.2;
					text-align: right;

					small {
						opacity: 0.5;
					}
				}
			}
		}
	}

	.medical-record-attachments-add-dialog__table-container {
		border-top: 1px solid var(--p-datatable-body-cell-border-color);
		flex: 1;
		overflow: auto;
		display: flex;

		.ui-api-table__table {
			flex: 1;
		}
	}

	.medical-record-attachments-add-dialog__add-buttton-container {
		padding: 20px;
		display: flex;
		justify-content: flex-end;
		border-top: 1px solid var(--p-datatable-body-cell-border-color);

		.medical-record-attachments-add-dialog__add-button {
			min-height: 39px;
		}
	}
}
</style>
