export async function getLastModifiedDates() {
	const [
		{ getLastModifiedDate },
		{ default: klaw },
		path,
	] = await Promise.all([
		import('git-jiggy'),
		import('klaw'),
		import('path'),
	])

	const rootDirectory = path.resolve(process.cwd(), 'src', 'pages')

	// Walk the pages directory with klaw, compiling routes and
	// getLastModifiedDate promises
	let [
		routes,
		lastModifiedDates,
	] = await new Promise((resolve, reject) => {
		const items = []
		const lastModifiedDatePromises = []

		klaw(rootDirectory)
			.on('data', item => {
				// Verify the item isn't a directory (we only care about modified
				// times for files)
				if (!item.stats.isDirectory()) {
					// Naively convert the filepath into a route
					const route = item.path
						.replace(path.extname(item.path), '')
						.replace(rootDirectory, '')
						.replace(/index$/, '')

					items.push(route)

					// Do some weird async junk to get an array of getLastModifiedDate
					// promises
					lastModifiedDatePromises.push((async () => {
						try {
							const lastModifiedDate = await getLastModifiedDate(item.path)
							return lastModifiedDate
						} catch (error) {
							// getLastModifiedDate errors if the file isn't in version
							// control, so we'll just return null for those
							return null
						}
					})())
				}
			})
			.on('error', (error, item) => {
				console.log({
					error: error.message,
					path: item.path,
				})
			})

			// Resolve the promise with our arrays
			.on('end', () => resolve([
				items,
				lastModifiedDatePromises,
			]))
	})

	return {
		props: {
			lastModifiedDates: (await Promise.allSettled(lastModifiedDates))
				.reduce((accumulator, lastModifiedDatePromise, index) => {
					const lastModifiedDate = lastModifiedDatePromise.value
					const route = routes[index]
					accumulator[route] = lastModifiedDate
					return accumulator
				}, {})
		},
	}
}
