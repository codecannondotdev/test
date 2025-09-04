<template>
	<Drawer
		v-model:visible="isActive"
		position="right"
		class="instructor-classes-add-dialog"
		header="Add Class Model">
		<div class="instructor-classes-add-dialog__header">
			<div class="instructor-classes-add-dialog__assigned-filter-container">
				<div class="instructor-classes-add-dialog__assigned-filter-label-container">
					<label>Show all Classes</label>
					<label
						><small
							>Assigning Classes to this Instructor will change their current assignment</small
						></label
					>
				</div>
				<ToggleSwitch v-model="withAssigned" />
			</div>
			<div class="instructor-classes-add-dialog__search-container">
				<IconField>
					<InputIcon class="fal fa-search" />
					<InputText
						v-model="searchString"
						class="instructor-classes-add-dialog__search-input"
						placeholder="Search"
						@update:model-value="listState.getList({ search: searchString })"
						@keyup.enter="listState.getList({ search: searchString })"></InputText>
				</IconField>
			</div>
		</div>
		<div class="instructor-classes-add-dialog__table-container">
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
		<div class="instructor-classes-add-dialog__add-buttton-container">
			<Button
				class="instructor-classes-add-dialog__add-button"
				:disabled="selected.length === 0"
				:loading="isLoading"
				:label="`Add ${selected.length} Classes`"
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
import type { Instructor } from '@/models/Instructor/Model'
import { defineModel, ref, watch } from 'vue'
import type { ClassModel } from '@/models/ClassModel/Model'
import { useClassModelListState } from '@/models/ClassModel/States'
import InstructorsApi from '@/models/Instructor/Api'

const emit = defineEmits(['update'])

const isActive = defineModel<boolean>()

const props = defineProps<{
	instructorId: Instructor['id']
}>()

const selected = ref<ClassModel[]>([])
const isLoading = ref(false)
const searchString = ref('')
const withAssigned = ref(false)

const listState = useClassModelListState()
listState.defaultParams = {
	notFromRelation: {
		model: 'App\\Models\\Instructor',
		id: props.instructorId,
		relation: 'classes',
	},
}

watch(
	withAssigned,
	() => {
		if (withAssigned.value) {
			listState.query().save()
		} else {
			listState.query().whereDoesntHave('instructor').save()
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
		await new InstructorsApi().updateRelation(props.instructorId, 'classes', {
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
.instructor-classes-add-dialog {
	width: 800px !important;

	.p-drawer-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0;
	}

	.instructor-classes-add-dialog__header {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;

		.instructor-classes-add-dialog__search-container {
			flex: 1;
			width: 100%;

			.instructor-classes-add-dialog__search-input {
				width: 100%;
			}
		}

		.instructor-classes-add-dialog__assigned-filter-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 10px;

			.instructor-classes-add-dialog__assigned-filter-label-container {
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

	.instructor-classes-add-dialog__table-container {
		border-top: 1px solid var(--p-datatable-body-cell-border-color);
		flex: 1;
		overflow: auto;
		display: flex;

		.ui-api-table__table {
			flex: 1;
		}
	}

	.instructor-classes-add-dialog__add-buttton-container {
		padding: 20px;
		display: flex;
		justify-content: flex-end;
		border-top: 1px solid var(--p-datatable-body-cell-border-color);

		.instructor-classes-add-dialog__add-button {
			min-height: 39px;
		}
	}
}
</style>
