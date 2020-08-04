// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
	"default e2e tests": browser => {
		browser
			.url(process.env.VUE_DEV_SERVER_URL)
			.waitForElementVisible("#app", 5000)
			.assert.elementPresent("div.outer")
			.assert.containsText("div.outer > div.wrapper > div.label", "Items")
			.assert.containsText(
				"div.outer > div.wrapper + div.wrapper > div.label",
				"Something Beautiful"
			)
			.assert.elementCount("div.occupation", 5)
			.assert.elementCount(
				"div.occupation.occupation--startoff.occupation--endoff",
				1
			) // the one super long occupation
			.assert.elementCount("div.cell", 104)
			.end();
	}
};
