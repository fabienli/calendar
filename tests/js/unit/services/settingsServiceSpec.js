describe('Settings Service', function () {
	'use strict';

	var SettingsService, http;

	beforeEach(module('Calendar'));

	beforeEach(inject(function (_SettingsService_, $httpBackend, $rootScope) {
		SettingsService = _SettingsService_;
		$rootScope.baseUrl = 'fancy-url/';
		http = $httpBackend;
	}));

	afterEach(function() {
		http.verifyNoOutstandingExpectation();
		http.verifyNoOutstandingRequest();
	});

	it ('should set the view', function() {
		http.expect('POST', 'fancy-url/config', {
			'key': 'view',
			'value': 'foobar'
		}).respond(200, {value: 'month'});

		SettingsService.setView('foobar').then(function(result) {
			expect(result).toBe(true);
		});

		expect(http.flush).not.toThrow();
	});

	it ('should get the view', function() {
		http.expect('GET', 'fancy-url/config?key=view').respond(200, {value: 'month'});

		SettingsService.getView().then(function(result) {
			expect(result).toEqual('month');
		});

		expect(http.flush).not.toThrow();
	});

});
