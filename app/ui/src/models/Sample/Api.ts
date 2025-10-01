import type { SampleModel, SampleStorePayload, SampleUpdatePayload } from '@/models/Sample/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class SamplesApi extends Api<
	SampleModel,
	LaravelPaginationResponse<SampleModel>,
	SampleStorePayload,
	SampleUpdatePayload
> {
	route = 'samples'
}
