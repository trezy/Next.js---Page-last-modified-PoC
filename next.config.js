// Module imports
const { exec } = require('child_process')
const klaw = require('klaw-sync')
const path = require('path')

module.exports = () => {
	const lastModifiedDates = {}
	const rootDirectory = path.resolve(process.cwd(), 'src', 'pages')

	// Use klaw-sync since `next.config.js` isn't allowed to export an async
	// function.
	const files = klaw(rootDirectory, { nodir: true })

	files.map(file => {
		// Relative path is important for the git ref.
		const relativePath = file.path
			.replace(process.cwd(), '')
			.replace(/^\//, '')

		// Naively convert file path to a route.
		const route = file.path
			.replace(rootDirectory, '')
			.replace(path.extname(file.path), '')
			.replace(/index$/, '')

		// Run the git log command synchronously to get the date of the last
		// commit that included this file.
		const result = exec(`git log --format=format:"%ad" -n 1 --no-merges ${relativePath}`, (error, stdout, stderr) => {
			lastModifiedDates[route] = stdout
		})

		return lastModifiedDates
	})

	// Set lastModifiedDates as an environment variable so we can access it from anywhere.
	return {
		env: { lastModifiedDates },
	}
}
