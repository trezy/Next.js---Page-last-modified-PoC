// Module imports
import { useRouter } from 'next/router'

export function useLastModifiedDate (props) {
	const Router = useRouter()
	return process.env.lastModifiedDates?.[Router.asPath]
}
