import posthog from 'posthog-js'

const hashParams = new URLSearchParams(window.location.hash.substring(1))
export const distinct_id = hashParams.get('distinct_id')
const session_id = hashParams.get('session_id')

export function usePostHog() {
	posthog.init('phc_jK2vCDMVsX8YZaBH69w1ZbBaPhH2ED2LqyTbXsGSAPc', {
		api_host: 'https://eu.i.posthog.com',
		capture_pageview: false,
		bootstrap: {
			sessionID: session_id ?? undefined,
			distinctID: distinct_id ?? undefined,
		},
		persistence: 'localStorage',
	})

	return {
		posthog,
	}
}
