<template>
	<Drawer
		v-model:visible="isActive"
		position="right"
		class="fitness-class-attendees-add-dialog"
		header="Add Asdfasdfasd">
		<div class="fitness-class-attendees-add-dialog__header">
			<div class="fitness-class-attendees-add-dialog__assigned-filter-container">
				<div class="fitness-class-attendees-add-dialog__assigned-filter-label-container">
					<label>Show all Asdfasdfasds</label>
					<label
						><small
							>Assigning Asdfasdfasds to this Fitness Class will add to their current
							assignments</small
						></label
					>
				</div>
				<ToggleSwitch v-model="withAssigned" />
			</div>
			<div class="fitness-class-attendees-add-dialog__search-container">
				<IconField>
					<InputIcon class="fal fa-search" />
					<InputText
						v-model="searchString"
						class="fitness-class-attendees-add-dialog__search-input"
						placeholder="Search"
						@update:model-value="listState.getList({ search: searchString })"
						@keyup.enter="listState.getList({ search: searchString })"></InputText>
				</IconField>
			</div>
		</div>
		<div class="fitness-class-attendees-add-dialog__table-container">
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
		<div class="fitness-class-attendees-add-dialog__add-buttton-container">
			<Button
				class="fitness-class-attendees-add-dialog__add-button"
				:disabled="selected.length === 0"
				:loading="isLoading"
				:label="`Add ${selected.length} Asdfasdfasds`"
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
import type { FitnessClass } from '@/models/FitnessClass/Model'
import { defineModel, ref, watch } from 'vue'
import type { Asdfasdfasd } from '@/models/Asdfasdfasd/Model'
import { useAsdfasdfasdListState } from '@/models/Asdfasdfasd/States'
import FitnessClasssApi from '@/models/FitnessClass/Api'

const emit = defineEmits(['update'])

const isActive = defineModel<boolean>()

const props = defineProps<{
	fitnessClassId: FitnessClass['id']
}>()

const selected = ref<Asdfasdfasd[]>([])
const isLoading = ref(false)
const searchString = ref('')
const withAssigned = ref(true)

const listState = useAsdfasdfasdListState()
listState.defaultParams = {
	notFromRelation: {
		model: 'App\\Models\\FitnessClass',
		id: props.fitnessClassId,
		relation: 'attendees',
	},
}

watch(
	withAssigned,
	() => {
		if (withAssigned.value) {
			listState.query().save()
		} else {
			listState.query().whereDoesntHave('attendedClasses').save()
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
		await new FitnessClasssApi().updateRelation(props.fitnessClassId, 'attendees', {
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
.fitness-class-attendees-add-dialog {
	width: 800px !important;

	.p-drawer-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0;
	}

	.fitness-class-attendees-add-dialog__header {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;

		.fitness-class-attendees-add-dialog__search-container {
			flex: 1;
			width: 100%;

			.fitness-class-attendees-add-dialog__search-input {
				width: 100%;
			}
		}

		.fitness-class-attendees-add-dialog__assigned-filter-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 10px;

			.fitness-class-attendees-add-dialog__assigned-filter-label-container {
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

	.fitness-class-attendees-add-dialog__table-container {
		border-top: 1px solid var(--p-datatable-body-cell-border-color);
		flex: 1;
		overflow: auto;
		display: flex;

		.ui-api-table__table {
			flex: 1;
		}
	}

	.fitness-class-attendees-add-dialog__add-buttton-container {
		padding: 20px;
		display: flex;
		justify-content: flex-end;
		border-top: 1px solid var(--p-datatable-body-cell-border-color);

		.fitness-class-attendees-add-dialog__add-button {
			min-height: 39px;
		}
	}
}
</style>
