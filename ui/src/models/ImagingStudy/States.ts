import type { ImagingStudyModel } from '@/models/ImagingStudy/Model'
import ImagingStudysApi from '@/models/ImagingStudy/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ImagingStudyDetailsState extends DetailsState<ImagingStudysApi, ImagingStudyModel> {
	api = new ImagingStudysApi()
}

export function useImagingStudyDetailsState() {
	return new ImagingStudyDetailsState()
}

export class ImagingStudyListState extends ListState<
	ImagingStudysApi,
	ImagingStudyModel,
	LaravelPaginationResponse<ImagingStudyModel>
> {
	api = new ImagingStudysApi()
}

export function useImagingStudyListState() {
	return new ImagingStudyListState()
}
