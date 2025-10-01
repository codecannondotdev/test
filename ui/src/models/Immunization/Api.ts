import type {
	ImmunizationModel,
	ImmunizationStorePayload,
	ImmunizationUpdatePayload,
} from '@/models/Immunization/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ImmunizationsApi extends Api<
	ImmunizationModel,
	LaravelPaginationResponse<ImmunizationModel>,
	ImmunizationStorePayload,
	ImmunizationUpdatePayload
> {
	route = 'immunizations'
}
