import type { GrowthChartModel } from '@/models/GrowthChart/Model'
import GrowthChartsApi from '@/models/GrowthChart/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class GrowthChartDetailsState extends DetailsState<GrowthChartsApi, GrowthChartModel> {
	api = new GrowthChartsApi()
}

export function useGrowthChartDetailsState() {
	return new GrowthChartDetailsState()
}

export class GrowthChartListState extends ListState<
	GrowthChartsApi,
	GrowthChartModel,
	LaravelPaginationResponse<GrowthChartModel>
> {
	api = new GrowthChartsApi()
}

export function useGrowthChartListState() {
	return new GrowthChartListState()
}
