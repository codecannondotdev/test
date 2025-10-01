<template>
	<Drawer
		v-model:visible="isActive"
		position="right"
		class="staff-role-shifts-add-dialog"
		header="Add Shift">
		<div class="staff-role-shifts-add-dialog__header">
			<div class="staff-role-shifts-add-dialog__assigned-filter-container">
				<div class="staff-role-shifts-add-dialog__assigned-filter-label-container">
					<label>Show all Shifts</label>
					<label
						><small
							>Assigning Shifts to this Staff Role will add to their current assignments</small
						></label
					>
				</div>
				<ToggleSwitch v-model="withAssigned" />
			</div>
			<div class="staff-role-shifts-add-dialog__search-container">
				<IconField>
					<InputIcon class="fal fa-search" />
					<InputText
						v-model="searchString"
						class="staff-role-shifts-add-dialog__search-input"
						placeholder="Search"
						@update:model-value="listState.getList({ search: searchString })"
						@keyup.enter="listState.getList({ search: searchString })"></InputText>
				</IconField>
			</div>
		</div>
		<div class="staff-role-shifts-add-dialog__table-container">
			<ApiTable
				v-model:selection="selected"
				selection-mode="multiple"
				flat
				:list-state="listState">
				<Column
					selection-mode="multiple"
					header-style="width: 3rem"></Column>
				<Column
					field="name"
					header="Name" />
			</ApiTable>
		</div>
		<div class="staff-role-shifts-add-dialog__add-buttton-container">
			<Button
				class="staff-role-shifts-add-dialog__add-button"
				:disabled="selected.length === 0"
				:loading="isLoading"
				:label="`Add ${selected.length} Shifts`"
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
import type { StaffRole } from '@/models/StaffRole/Model'
import { defineModel, ref, watch } from 'vue'
import type { Shift } from '@/models/Shift/Model'
import { useShiftListState } from '@/models/Shift/States'
import StaffRolesApi from '@/models/StaffRole/Api'

const emit = defineEmits(['update'])

const isActive = defineModel<boolean>()

const props = defineProps<{
	staffRoleId: StaffRole['id']
}>()

const selected = ref<Shift[]>([])
const isLoading = ref(false)
const searchString = ref('')
const withAssigned = ref(true)

const listState = useShiftListState()
listState.defaultParams = {
	notFromRelation: {
		model: 'App\\Models\\StaffRole',
		id: props.staffRoleId,
		relation: 'shifts',
	},
}

watch(
	withAssigned,
	() => {
		if (withAssigned.value) {
			listState.query().save()
		} else {
			listState.query().whereDoesntHave('staffRoles').save()
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
		await new StaffRolesApi().updateRelation(props.staffRoleId, 'shifts', {
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
.staff-role-shifts-add-dialog {
	width: 800px !important;

	.p-drawer-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0;
	}

	.staff-role-shifts-add-dialog__header {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;

		.staff-role-shifts-add-dialog__search-container {
			flex: 1;
			width: 100%;

			.staff-role-shifts-add-dialog__search-input {
				width: 100%;
			}
		}

		.staff-role-shifts-add-dialog__assigned-filter-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 10px;

			.staff-role-shifts-add-dialog__assigned-filter-label-container {
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

	.staff-role-shifts-add-dialog__table-container {
		border-top: 1px solid var(--p-datatable-body-cell-border-color);
		flex: 1;
		overflow: auto;
		display: flex;

		.ui-api-table__table {
			flex: 1;
		}
	}

	.staff-role-shifts-add-dialog__add-buttton-container {
		padding: 20px;
		display: flex;
		justify-content: flex-end;
		border-top: 1px solid var(--p-datatable-body-cell-border-color);

		.staff-role-shifts-add-dialog__add-button {
			min-height: 39px;
		}
	}
}
</style>
