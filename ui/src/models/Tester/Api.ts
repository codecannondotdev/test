import type { TesterModel, TesterStorePayload, TesterUpdatePayload } from '@/models/Tester/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class TestersApi extends Api<
	TesterModel,
	LaravelPaginationResponse<TesterModel>,
	TesterStorePayload,
	TesterUpdatePayload
> {
	route = 'testers'
}
