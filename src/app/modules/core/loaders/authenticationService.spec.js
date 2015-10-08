describe('Service: authenticationService', function() {
    var authenticationService, httpBackend;

    var token = 'token',
        domain = 'blinker.com',
        serverResponse = 'response',
        AUTH_API_URL = 'AUTH_API_URL';

    beforeEach(module('qorDash.core'));
    beforeEach(module('qorDash.auth'));
    beforeEach(module("qorDash.loaders"));

    beforeEach(module('qorDash.loaders', function($provide) {
        $provide.constant("AUTH_API_URL", AUTH_API_URL);
    }));

    beforeEach(function() {
        inject(function (_authenticationService_, $httpBackend, _dataLoader_, _user_, $state) {
            authenticationService = _authenticationService_;
            httpBackend = $httpBackend;

            spyOn(_dataLoader_, 'init').and.returnValue({
                then: function (next) {
                    next && next()
                }
            });
            spyOn(_user_, 'hasAccessTo').and.returnValue(true);

            spyOn($state, 'go').and.returnValue(true);
        });
    });


    it("should get a list of domains", function(done) {
        httpBackend.expectGET('data/permissions.json').respond('');
        httpBackend.expect('GET', AUTH_API_URL + '/admin/domain/', undefined,
            {
                "Accept":"application/json",
                'Authorization': 'Bearer ' + token
            }
        ).respond(serverResponse);

        authenticationService.getDomains(token)
            .then(function(response) {
                expect(response.data).toEqual(serverResponse);
                done();
            });

        httpBackend.flush();
    });

    it("should get domain info by id", function(done) {
        httpBackend.expectGET('data/permissions.json').respond('');
        httpBackend.expect('GET', AUTH_API_URL + '/admin/domain/' + domain, undefined, {"Authorization":"Bearer " + token,"Accept":"application/json"}).respond(serverResponse);

        authenticationService.getDomainInfo(domain, token)
            .then(function(response) {
                expect(response.data).toEqual(serverResponse);
                done();
            });

        httpBackend.flush();
    });
});