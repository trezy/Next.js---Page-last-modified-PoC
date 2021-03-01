// Module imports
import { useRouter } from 'next/router'

export default function Version(props) {
	const Router = useRouter()

	console.log(Router)

	return (
		<>
			<pre>
				{JSON.stringify(props, null, 2)}
			</pre>
		</>
	)
}

export async function getStaticProps(blep) {
	const [
		fs,
		git,
		path,
		{ promisify },
	] = await Promise.all([
		import('fs'),
		import('isomorphic-git'),
		import('path'),
		import('util'),
	])

	const foo = await git.log({
		depth: 1,
		dir: path.resolve(process.cwd(), 'pages', 'index.js'),
		fs,
	})

	return {
		props: {
			foo,
		},
	}
}
