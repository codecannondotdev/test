import type {
	CertificationModel,
	CertificationStorePayload,
	CertificationUpdatePayload,
} from '@/models/Certification/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class CertificationsApi extends Api<
	CertificationModel,
	LaravelPaginationResponse<CertificationModel>,
	CertificationStorePayload,
	CertificationUpdatePayload
> {
	route = 'certifications'
}
