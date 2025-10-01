import type {
	GrowthChartModel,
	GrowthChartStorePayload,
	GrowthChartUpdatePayload,
} from '@/models/GrowthChart/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class GrowthChartsApi extends Api<
	GrowthChartModel,
	LaravelPaginationResponse<GrowthChartModel>,
	GrowthChartStorePayload,
	GrowthChartUpdatePayload
> {
	route = 'growth-charts'
}
