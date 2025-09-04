import type { InstructorModel } from '@/models/Instructor/Model'
import InstructorsApi from '@/models/Instructor/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class InstructorDetailsState extends DetailsState<InstructorsApi, InstructorModel> {
	api = new InstructorsApi()
}

export function useInstructorDetailsState() {
	return new InstructorDetailsState()
}

export class InstructorListState extends ListState<
	InstructorsApi,
	InstructorModel,
	LaravelPaginationResponse<InstructorModel>
> {
	api = new InstructorsApi()
}

export function useInstructorListState() {
	return new InstructorListState()
}
