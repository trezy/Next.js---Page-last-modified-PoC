// Module imports
import { useRouter } from 'next/router'

export function useLastModifiedDate (props) {
	const { lastModifiedDates } = props
	const Router = useRouter()

	console.log({
		lastModifiedDates,
		asPath: Router.asPath,
	})

	return lastModifiedDates?.[Router.asPath]
}
