import type { ScoreModel } from '@/models/Score/Model'
import ScoresApi from '@/models/Score/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ScoreDetailsState extends DetailsState<ScoresApi, ScoreModel> {
	api = new ScoresApi()
}

export function useScoreDetailsState() {
	return new ScoreDetailsState()
}

export class ScoreListState extends ListState<
	ScoresApi,
	ScoreModel,
	LaravelPaginationResponse<ScoreModel>
> {
	api = new ScoresApi()
}

export function useScoreListState() {
	return new ScoreListState()
}
