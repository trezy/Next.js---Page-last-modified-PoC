// Module imports
import { useRouter } from 'next/router'

export default function Version(props) {
	const Router = useRouter()

	console.log(Router)

	return (
		<>
			<dl>
				<dt>Built at</dt>
				<dd>{props.builtAt}</dd>

				<dt>Built at</dt>
				<dd>{props.lastModifiededAt}</dd>
			</dl>

			<pre>
				{JSON.stringify(props, null, 2)}
			</pre>
		</>
	)
}

export async function getStaticProps(blep) {
	const [
		fs,
		{ getStagedFiles },
		path,
		{ promisify },
	] = await Promise.all([
		import('fs'),
		import('git-jiggy'),
		import('path'),
		import('util'),
	])

	const foo = await getStagedFiles()

	// await git.log({
	// 	depth: 1,
	// 	dir: process.cwd(),
	// 	fs,
	// })

	return {
		props: {
			foo,
			// builtAt: Date.now(),
			// lastModifiededAt: Date.now(),
			// paths: [
			// 	process.cwd(),
			// 	__dirname,
			// ]
		},
	}
}
