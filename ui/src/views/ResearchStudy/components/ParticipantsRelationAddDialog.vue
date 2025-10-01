<template>
	<Drawer
		v-model:visible="isActive"
		position="right"
		class="research-study-participants-add-dialog"
		header="Add Patient">
		<div class="research-study-participants-add-dialog__header">
			<div class="research-study-participants-add-dialog__assigned-filter-container">
				<div class="research-study-participants-add-dialog__assigned-filter-label-container">
					<label>Show all Patients</label>
					<label
						><small
							>Assigning Patients to this Research Study will add to their current
							assignments</small
						></label
					>
				</div>
				<ToggleSwitch v-model="withAssigned" />
			</div>
			<div class="research-study-participants-add-dialog__search-container">
				<IconField>
					<InputIcon class="fal fa-search" />
					<InputText
						v-model="searchString"
						class="research-study-participants-add-dialog__search-input"
						placeholder="Search"
						@update:model-value="listState.getList({ search: searchString })"
						@keyup.enter="listState.getList({ search: searchString })"></InputText>
				</IconField>
			</div>
		</div>
		<div class="research-study-participants-add-dialog__table-container">
			<ApiTable
				v-model:selection="selected"
				selection-mode="multiple"
				flat
				:list-state="listState">
				<Column
					selection-mode="multiple"
					header-style="width: 3rem"></Column>
				<Column
					field="first_name"
					header="First Name" />
			</ApiTable>
		</div>
		<div class="research-study-participants-add-dialog__add-buttton-container">
			<Button
				class="research-study-participants-add-dialog__add-button"
				:disabled="selected.length === 0"
				:loading="isLoading"
				:label="`Add ${selected.length} Patients`"
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
import type { ResearchStudy } from '@/models/ResearchStudy/Model'
import { defineModel, ref, watch } from 'vue'
import type { Patient } from '@/models/Patient/Model'
import { usePatientListState } from '@/models/Patient/States'
import ResearchStudysApi from '@/models/ResearchStudy/Api'

const emit = defineEmits(['update'])

const isActive = defineModel<boolean>()

const props = defineProps<{
	researchStudyId: ResearchStudy['id']
}>()

const selected = ref<Patient[]>([])
const isLoading = ref(false)
const searchString = ref('')
const withAssigned = ref(true)

const listState = usePatientListState()
listState.defaultParams = {
	notFromRelation: {
		model: 'App\\Models\\ResearchStudy',
		id: props.researchStudyId,
		relation: 'participants',
	},
}

watch(
	withAssigned,
	() => {
		if (withAssigned.value) {
			listState.query().save()
		} else {
			listState.query().whereDoesntHave('researchStudies').save()
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
			withAssigned.value = true
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
		await new ResearchStudysApi().updateRelation(props.researchStudyId, 'participants', {
			method: 'syncWithoutDetaching',
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
.research-study-participants-add-dialog {
	width: 800px !important;

	.p-drawer-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0;
	}

	.research-study-participants-add-dialog__header {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;

		.research-study-participants-add-dialog__search-container {
			flex: 1;
			width: 100%;

			.research-study-participants-add-dialog__search-input {
				width: 100%;
			}
		}

		.research-study-participants-add-dialog__assigned-filter-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 10px;

			.research-study-participants-add-dialog__assigned-filter-label-container {
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

	.research-study-participants-add-dialog__table-container {
		border-top: 1px solid var(--p-datatable-body-cell-border-color);
		flex: 1;
		overflow: auto;
		display: flex;

		.ui-api-table__table {
			flex: 1;
		}
	}

	.research-study-participants-add-dialog__add-buttton-container {
		padding: 20px;
		display: flex;
		justify-content: flex-end;
		border-top: 1px solid var(--p-datatable-body-cell-border-color);

		.research-study-participants-add-dialog__add-button {
			min-height: 39px;
		}
	}
}
</style>
