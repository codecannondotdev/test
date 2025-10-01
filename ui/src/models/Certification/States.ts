import type { CertificationModel } from '@/models/Certification/Model'
import CertificationsApi from '@/models/Certification/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class CertificationDetailsState extends DetailsState<CertificationsApi, CertificationModel> {
	api = new CertificationsApi()
}

export function useCertificationDetailsState() {
	return new CertificationDetailsState()
}

export class CertificationListState extends ListState<
	CertificationsApi,
	CertificationModel,
	LaravelPaginationResponse<CertificationModel>
> {
	api = new CertificationsApi()
}

export function useCertificationListState() {
	return new CertificationListState()
}
