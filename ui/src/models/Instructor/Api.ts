import type {
	InstructorModel,
	InstructorStorePayload,
	InstructorUpdatePayload,
} from '@/models/Instructor/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class InstructorsApi extends Api<
	InstructorModel,
	LaravelPaginationResponse<InstructorModel>,
	InstructorStorePayload,
	InstructorUpdatePayload
> {
	route = 'instructors'
}
