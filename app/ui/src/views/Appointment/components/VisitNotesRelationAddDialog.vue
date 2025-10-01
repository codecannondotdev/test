<template>
	<Drawer
		v-model:visible="isActive"
		position="right"
		class="appointment-visit-notes-add-dialog"
		header="Add Note">
		<div class="appointment-visit-notes-add-dialog__header">
			<div class="appointment-visit-notes-add-dialog__assigned-filter-container">
				<div class="appointment-visit-notes-add-dialog__assigned-filter-label-container">
					<label>Show all Notes</label>
					<label
						><small
							>Assigning Notes to this Appointment will change their current assignment</small
						></label
					>
				</div>
				<ToggleSwitch v-model="withAssigned" />
			</div>
			<div class="appointment-visit-notes-add-dialog__search-container">
				<IconField>
					<InputIcon class="fal fa-search" />
					<InputText
						v-model="searchString"
						class="appointment-visit-notes-add-dialog__search-input"
						placeholder="Search"
						@update:model-value="listState.getList({ search: searchString })"
						@keyup.enter="listState.getList({ search: searchString })"></InputText>
				</IconField>
			</div>
		</div>
		<div class="appointment-visit-notes-add-dialog__table-container">
			<ApiTable
				v-model:selection="selected"
				selection-mode="multiple"
				flat
				:list-state="listState">
				<Column
					selection-mode="multiple"
					header-style="width: 3rem"></Column>
				<Column
					field="title"
					header="Title" />
			</ApiTable>
		</div>
		<div class="appointment-visit-notes-add-dialog__add-buttton-container">
			<Button
				class="appointment-visit-notes-add-dialog__add-button"
				:disabled="selected.length === 0"
				:loading="isLoading"
				:label="`Add ${selected.length} Notes`"
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
import type { Appointment } from '@/models/Appointment/Model'
import { defineModel, ref, watch } from 'vue'
import type { Note } from '@/models/Note/Model'
import { useNoteListState } from '@/models/Note/States'
import AppointmentsApi from '@/models/Appointment/Api'

const emit = defineEmits(['update'])

const isActive = defineModel<boolean>()

const props = defineProps<{
	appointmentId: Appointment['id']
}>()

const selected = ref<Note[]>([])
const isLoading = ref(false)
const searchString = ref('')
const withAssigned = ref(false)

const listState = useNoteListState()
listState.defaultParams = {
	notFromRelation: {
		model: 'App\\Models\\Appointment',
		id: props.appointmentId,
		relation: 'visitNotes',
	},
}

watch(
	withAssigned,
	() => {
		if (withAssigned.value) {
			listState.query().save()
		} else {
			listState.query().whereDoesntHave('appointment').save()
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
		await new AppointmentsApi().updateRelation(props.appointmentId, 'visitNotes', {
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
.appointment-visit-notes-add-dialog {
	width: 800px !important;

	.p-drawer-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0;
	}

	.appointment-visit-notes-add-dialog__header {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;

		.appointment-visit-notes-add-dialog__search-container {
			flex: 1;
			width: 100%;

			.appointment-visit-notes-add-dialog__search-input {
				width: 100%;
			}
		}

		.appointment-visit-notes-add-dialog__assigned-filter-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 10px;

			.appointment-visit-notes-add-dialog__assigned-filter-label-container {
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

	.appointment-visit-notes-add-dialog__table-container {
		border-top: 1px solid var(--p-datatable-body-cell-border-color);
		flex: 1;
		overflow: auto;
		display: flex;

		.ui-api-table__table {
			flex: 1;
		}
	}

	.appointment-visit-notes-add-dialog__add-buttton-container {
		padding: 20px;
		display: flex;
		justify-content: flex-end;
		border-top: 1px solid var(--p-datatable-body-cell-border-color);

		.appointment-visit-notes-add-dialog__add-button {
			min-height: 39px;
		}
	}
}
</style>
