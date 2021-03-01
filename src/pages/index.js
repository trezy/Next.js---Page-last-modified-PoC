// Module imports
import { useRouter } from 'next/router'
import { useLastModifiedDate } from 'hooks/useLastModifiedDate'
import Link from 'next/link'

export default function Version() {
	const lastModifiedDate = useLastModifiedDate()

	return (
		<>
			<header><h1>Home</h1></header>
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
