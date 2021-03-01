// Module imports
import { useRouter } from 'next/router'
import { getLastModifiedDates } from 'helpers/getLastModifiedDates'
import { useLastModifiedDate } from 'hooks/useLastModifiedDate'
import Link from 'next/link'

export default function Version(props) {
	const lastModifiedDate = useLastModifiedDate(props)

	return (
		<>
			<header><h1>Foo Bar</h1></header>
			<div>This page was last modified: {lastModifiedDate}</div>
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>

				<li>
					<Link href="/blep">Blep</Link>
				</li>

				<li>
					<Link href="/foo/bar">Foo Bar</Link>
				</li>
			</ul>
		</>
	)
}

export const getStaticProps = getLastModifiedDates