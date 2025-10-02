<template>
	<Drawer
		v-model:visible="isActive"
		position="right"
		class="employee-damage-reports-add-dialog"
		header="Add Damage Report">
		<div class="employee-damage-reports-add-dialog__header">
			<div class="employee-damage-reports-add-dialog__assigned-filter-container">
				<div class="employee-damage-reports-add-dialog__assigned-filter-label-container">
					<label>Show all Damage Reports</label>
					<label
						><small
							>Assigning Damage Reports to this Employee will change their current assignment</small
						></label
					>
				</div>
				<ToggleSwitch v-model="withAssigned" />
			</div>
			<div class="employee-damage-reports-add-dialog__search-container">
				<IconField>
					<InputIcon class="fal fa-search" />
					<InputText
						v-model="searchString"
						class="employee-damage-reports-add-dialog__search-input"
						placeholder="Search"
						@update:model-value="listState.getList({ search: searchString })"
						@keyup.enter="listState.getList({ search: searchString })"></InputText>
				</IconField>
			</div>
		</div>
		<div class="employee-damage-reports-add-dialog__table-container">
			<ApiTable
				v-model:selection="selected"
				selection-mode="multiple"
				flat
				:list-state="listState">
				<Column
					selection-mode="multiple"
					header-style="width: 3rem"></Column>
				<Column
					field="description"
					header="Description" />
			</ApiTable>
		</div>
		<div class="employee-damage-reports-add-dialog__add-buttton-container">
			<Button
				class="employee-damage-reports-add-dialog__add-button"
				:disabled="selected.length === 0"
				:loading="isLoading"
				:label="`Add ${selected.length} Damage Reports`"
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
import type { Employee } from '@/models/Employee/Model'
import { defineModel, ref, watch } from 'vue'
import type { DamageReport } from '@/models/DamageReport/Model'
import { useDamageReportListState } from '@/models/DamageReport/States'
import EmployeesApi from '@/models/Employee/Api'

const emit = defineEmits(['update'])

const isActive = defineModel<boolean>()

const props = defineProps<{
	employeeId: Employee['id']
}>()

const selected = ref<DamageReport[]>([])
const isLoading = ref(false)
const searchString = ref('')
const withAssigned = ref(false)

const listState = useDamageReportListState()
listState.defaultParams = {
	notFromRelation: {
		model: 'App\\Models\\Employee',
		id: props.employeeId,
		relation: 'damageReports',
	},
}

watch(
	withAssigned,
	() => {
		if (withAssigned.value) {
			listState.query().save()
		} else {
			listState.query().whereDoesntHave('employee').save()
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
		await new EmployeesApi().updateRelation(props.employeeId, 'damageReports', {
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
.employee-damage-reports-add-dialog {
	width: 800px !important;

	.p-drawer-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0;
	}

	.employee-damage-reports-add-dialog__header {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;

		.employee-damage-reports-add-dialog__search-container {
			flex: 1;
			width: 100%;

			.employee-damage-reports-add-dialog__search-input {
				width: 100%;
			}
		}

		.employee-damage-reports-add-dialog__assigned-filter-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 10px;

			.employee-damage-reports-add-dialog__assigned-filter-label-container {
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

	.employee-damage-reports-add-dialog__table-container {
		border-top: 1px solid var(--p-datatable-body-cell-border-color);
		flex: 1;
		overflow: auto;
		display: flex;

		.ui-api-table__table {
			flex: 1;
		}
	}

	.employee-damage-reports-add-dialog__add-buttton-container {
		padding: 20px;
		display: flex;
		justify-content: flex-end;
		border-top: 1px solid var(--p-datatable-body-cell-border-color);

		.employee-damage-reports-add-dialog__add-button {
			min-height: 39px;
		}
	}
}
</style>
