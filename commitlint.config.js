// Commit message format: <commit_type>(<scope>): <subject>
// Another valid message format: <commit_type>: <subject>
module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		// Commit type must be one of these values: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert
		// Commit type can be preceded by an emoji
		"type-enum": [
			2,
			"always",
			[
				"feat", // new feature (without emoji)
				"✨ feat", // new feature (with emoji)
				"fix", // bug fix
				"🐞 fix",
				"docs", // documentation
				"📃 docs",
				"style", // formatting, missing semi colons, etc
				"🌈 style",
				"refactor", // refactoring code (changes to code that neither fix a bug nor add a feature)
				"🦄 refactor",
				"test", // adding tests, updating tests
				"🧪 test",
				"chore", // updating build tasks, package manager configs, etc
				"🐳 chore",
				"perf", // performance improvements
				"🎈 perf",
				"ci", // continuous integration
				"🐎 ci",
				"build", // changes that affect the build system
				"🔧 build",
				"revert", // reverts a previous commit
				"↩ revert",
			],
		],
		"type-case": [0, "always", "lower-case"], // Type must be in lower case
		"type-empty": [2, "never"], // Ensure type is not empty
		"subject-case": [2, "always", "lower-case"], // Subject must be in lower case
		"subject-empty": [2, "never"], // Subject cannot be empty
		"subject-full-stop": [2, "never", "."], // Subject cannot ends with '.'
	},
};

// Commit message format: <commit_type>(<scope>): <subject>
// Example: feat(auth): add login validation
// Another valid message format: <commit_type>: <subject>
// Example: feat: add login validation

// Example valid commits:
// feat(auth): add google login
// feat: add login validation
// fix(navbar): resolve dropdown issue
// refactor(auth): remove unused piece of code
// test(auth): add unit tests for login
// perf(cart): improve items' image loading time
// style(navbar): update navbar background color
// chore(deps): add bootstrap package
// build(webpack): update webpack bundle config
// docs(readme): update installation steps

// Example invalid commits:
// Feat: Add feature    # Wrong casing (no uppercase allowed)
// fix: fixed bug.      # Has period
// chore:              # Empty subject
