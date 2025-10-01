import type { ResearchStudyModel } from '@/models/ResearchStudy/Model'
import ResearchStudysApi from '@/models/ResearchStudy/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ResearchStudyDetailsState extends DetailsState<ResearchStudysApi, ResearchStudyModel> {
	api = new ResearchStudysApi()
}

export function useResearchStudyDetailsState() {
	return new ResearchStudyDetailsState()
}

export class ResearchStudyListState extends ListState<
	ResearchStudysApi,
	ResearchStudyModel,
	LaravelPaginationResponse<ResearchStudyModel>
> {
	api = new ResearchStudysApi()
}

export function useResearchStudyListState() {
	return new ResearchStudyListState()
}
