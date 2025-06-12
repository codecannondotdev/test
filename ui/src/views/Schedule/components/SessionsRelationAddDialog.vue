<template>
	<Drawer
		v-model:visible="isActive"
		position="right"
		class="schedule-sessions-add-dialog"
		header="Add Session">
		<div class="schedule-sessions-add-dialog__header">
			<div class="schedule-sessions-add-dialog__assigned-filter-container">
				<div class="schedule-sessions-add-dialog__assigned-filter-label-container">
					<label>Show all Sessions</label>
					<label
						><small
							>Assigning Sessions to this Schedule will change their current assignment</small
						></label
					>
				</div>
				<ToggleSwitch v-model="withAssigned" />
			</div>
			<div class="schedule-sessions-add-dialog__search-container">
				<IconField>
					<InputIcon class="fal fa-search" />
					<InputText
						v-model="searchString"
						class="schedule-sessions-add-dialog__search-input"
						placeholder="Search"
						@update:model-value="listState.getList({ search: searchString })"
						@keyup.enter="listState.getList({ search: searchString })"></InputText>
				</IconField>
			</div>
		</div>
		<div class="schedule-sessions-add-dialog__table-container">
			<ApiTable
				v-model:selection="selected"
				selection-mode="multiple"
				flat
				:list-state="listState">
				<Column
					selection-mode="multiple"
					header-style="width: 3rem"></Column>
				<Column header="Date">
					<template #body="slotProps">
						{{ format(new Date(slotProps.data.date), 'yyyy-MM-dd') }}
					</template>
				</Column>
			</ApiTable>
		</div>
		<div class="schedule-sessions-add-dialog__add-buttton-container">
			<Button
				class="schedule-sessions-add-dialog__add-button"
				:disabled="selected.length === 0"
				:loading="isLoading"
				:label="`Add ${selected.length} Sessions`"
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
import type { Schedule } from '@/models/Schedule/Model'
import { defineModel, ref, watch } from 'vue'
import type { Session } from '@/models/Session/Model'
import { useSessionListState } from '@/models/Session/States'
import SchedulesApi from '@/models/Schedule/Api'
import { format } from 'date-fns'

const emit = defineEmits(['update'])

const isActive = defineModel<boolean>()

const props = defineProps<{
	scheduleId: Schedule['id']
}>()

const selected = ref<Session[]>([])
const isLoading = ref(false)
const searchString = ref('')
const withAssigned = ref(false)

const listState = useSessionListState()
listState.defaultParams = {
	notFromRelation: {
		model: 'App\\Models\\Schedule',
		id: props.scheduleId,
		relation: 'sessions',
	},
}

watch(
	withAssigned,
	() => {
		if (withAssigned.value) {
			listState.query().save()
		} else {
			listState.query().whereDoesntHave('schedule').save()
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
		await new SchedulesApi().updateRelation(props.scheduleId, 'sessions', {
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
.schedule-sessions-add-dialog {
	width: 800px !important;

	.p-drawer-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0;
	}

	.schedule-sessions-add-dialog__header {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;

		.schedule-sessions-add-dialog__search-container {
			flex: 1;
			width: 100%;

			.schedule-sessions-add-dialog__search-input {
				width: 100%;
			}
		}

		.schedule-sessions-add-dialog__assigned-filter-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 10px;

			.schedule-sessions-add-dialog__assigned-filter-label-container {
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

	.schedule-sessions-add-dialog__table-container {
		border-top: 1px solid var(--p-datatable-body-cell-border-color);
		flex: 1;
		overflow: auto;
		display: flex;

		.ui-api-table__table {
			flex: 1;
		}
	}

	.schedule-sessions-add-dialog__add-buttton-container {
		padding: 20px;
		display: flex;
		justify-content: flex-end;
		border-top: 1px solid var(--p-datatable-body-cell-border-color);

		.schedule-sessions-add-dialog__add-button {
			min-height: 39px;
		}
	}
}
</style>
