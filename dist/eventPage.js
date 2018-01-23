(function () {
	let activeTab = null;
	const reGitHub = /http?[s]:\/\/github\.com/;

	let checkTabURL = function (url, tabId) {
		if (url && reGitHub.test(url)) {
			chrome.browserAction.setIcon({
				path: 'github_green.png',
				tabId
			});
			chrome.tabs.executeScript(tabId, {
				file: 'inject.js'
			});
		} else {
			chrome.browserAction.setIcon({
				path: 'github.png',
				tabId
			});
		}
	}

	chrome.tabs.onActivated.addListener(function (activeInfo) {
		activeTab = activeInfo.tabId;
		chrome.tabs.query({'active': true}, function (tabs) {
			if (tabs[0].status && tabs[0].status === "complete") {
				checkTabURL(tabs[0].url, tabs[0].id);
			}
		});

	});

	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		if (activeTab === tabId) {
			if (changeInfo && changeInfo.status && changeInfo.status === "complete") {
				checkTabURL(tab.url, tab.id);
			}
		}
	});
})();
