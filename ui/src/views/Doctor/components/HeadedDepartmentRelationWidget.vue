<template>
	<Card class="headed-department-relation-widget">
		<template #title>
			<h4 class="headed-department-relation-widget__title">Headed Department</h4>
			<Button
				v-if="detailsState.details.value?.headed_department"
				icon="fal fa-link"
				label="Reconnect"
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
			<div class="headed-department-relation-widget__content-container">
				<Button
					v-if="!detailsState.details.value?.headed_department"
					icon="fal fa-link"
					severity="secondary"
					outlined
					class="headed-department-relation-widget__add-button"
					label="Click to add Department"
					@click="isRelationAddDialogActive = true" />
				<Card
					v-else
					icon="fal fa-link"
					class="headed-department-relation-widget__entity-card"
					@click="openDetails">
					<template #content>
						<p>{{ detailsState.details.value!.headed_department!.name }}</p>
						<Button
							class="headed-department-relation-widget__dissociate-button"
							severity="secondary"
							text
							rounded
							icon="fal fa-times"
							@click.stop="dissociate" />
					</template>
				</Card>
			</div>
		</template>
	</Card>
	<HeadedDepartmentRelationAddDialog
		v-model="isRelationAddDialogActive"
		:doctor-id="props.doctorId"
		@update="refresh()" />
	<DepartmentForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ head_doctor_id: Number(props.doctorId) }"
		:hide-inputs="['head_doctor_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import HeadedDepartmentRelationAddDialog from './HeadedDepartmentRelationAddDialog.vue'
import DepartmentForm from '@/views/Department/components/Form.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useDoctorDetailsState } from '@/models/Doctor/States'
import type { Doctor } from '@/models/Doctor/Model'
import DoctorsApi from '@/models/Doctor/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	doctorId: Doctor['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(false)
const listLoading = ref(false)
const detailsState = useDoctorDetailsState()

onBeforeMount(() => {
	refresh()
})

async function refresh() {
	listLoading.value = true
	emit('start-loading')
	try {
		await detailsState.getDetails(props.doctorId, { with: ['headedDepartment'] })
	} finally {
		listLoading.value = false
		emit('stop-loading')
	}
}

async function dissociate() {
	if (!detailsState.details.value) return
	dissociateLoading.value = true
	emit('start-loading')
	try {
		await new DoctorsApi().updateRelation(props.doctorId, 'headedDepartment', {
			method: 'dissociate',
			params: [detailsState.details.value.id],
		})
		dissociateLoading.value = false
		await refresh()
	} finally {
		dissociateLoading.value = false
		emit('stop-loading')
	}
}

function openDetails() {
	if (!detailsState.details.value) return
	router.push({ name: 'departments-edit', params: { id: detailsState.details.value.id } })
}
</script>

<style lang="scss" scoped>
.headed-department-relation-widget {
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

				.headed-department-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}

	.headed-department-relation-widget__content-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0 10px 10px;

		.headed-department-relation-widget__add-button {
			width: 100%;
		}

		.headed-department-relation-widget__entity-card {
			width: 100%;

			@media (prefers-color-scheme: dark) {
				background: var(--p-surface-800);
			}

			&:hover {
				cursor: pointer;
			}

			:deep(.p-card-body) {
				padding: 0;

				.p-card-content {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					padding: 10px 10px 10px 20px;

					.headed-department-relation-widget__dissociate-button:hover {
						@media (prefers-color-scheme: dark) {
							background: var(--p-surface-700);
						}
					}
				}
			}
		}
	}
}
</style>
