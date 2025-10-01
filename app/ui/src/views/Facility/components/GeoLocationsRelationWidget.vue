<template>
	<Card class="geo-locations-relation-widget">
		<template #title>
			<h4 class="geo-locations-relation-widget__title">Geo Locations</h4>
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
					field="latitude"
					header="Latitude" />
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
	<GeoLocationsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:facility-id="props.facilityId"
		@update="refresh()" />
	<GeoLocationForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ facility_id: Number(props.facilityId) }"
		:hide-inputs="['facility_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import GeoLocationsRelationAddDialog from './GeoLocationsRelationAddDialog.vue'
import GeoLocationForm from '@/views/GeoLocation/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useGeoLocationListState } from '@/models/GeoLocation/States'
import type { GeoLocation } from '@/models/GeoLocation/Model'
import type { Facility } from '@/models/Facility/Model'
import FacilitysApi from '@/models/Facility/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	facilityId: Facility['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useGeoLocationListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Facility',
		id: props.facilityId,
		relation: 'geoLocations',
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

async function dissociate(item: GeoLocation) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new FacilitysApi().updateRelation(props.facilityId, 'geoLocations', {
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

function openDetails(item: { data: GeoLocation }) {
	router.push({ name: 'geo-locations-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.geo-locations-relation-widget {
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

				.geo-locations-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
