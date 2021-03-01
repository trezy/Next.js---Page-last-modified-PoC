// Module imports
import { useRouter } from 'next/router'

export function useLastModifiedDate (props) {
	const { lastModifiedDates } = props
	const Router = useRouter()

	return lastModifiedDates?.[Router.asPath]
}
