import type { ScoreModel, ScoreStorePayload, ScoreUpdatePayload } from '@/models/Score/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ScoresApi extends Api<
	ScoreModel,
	LaravelPaginationResponse<ScoreModel>,
	ScoreStorePayload,
	ScoreUpdatePayload
> {
	route = 'scores'
}
