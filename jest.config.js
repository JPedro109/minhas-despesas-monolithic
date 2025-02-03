module.exports = {
	roots: ["<rootDir>/tests"],
	testEnvironment: "node",
	collectCoverageFrom: [
		"<rootDir>/src/**",
		"!<rootDir>/src/main/**",
		"!<rootDir>/src/server.ts"
	],
	moduleNameMapper: {
		"@/(.*)": "<rootDir>/src/$1",
	},
	transform: {
		".+\\.ts$": "ts-jest"
	},
	modulePathIgnorePatterns: [
		".*__mocks__.*"
	],
};