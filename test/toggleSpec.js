describe('A toggle module', function() {

    describe('basic initialization', function() {

        it('can create a group without throwing errors', function () {
            var success = true;

            try {
                new toggle.Group()
            }
            catch(e) {
                success = false;
            }

            expect(success).toBe(true);
        });

        it('can create a panel without throwing errors', function () {

            var success = true;

            try {
                new toggle.Panel(document.createElement('div'), {
                    group: new toggle.Group()
                });
            }
            catch(e) {
                success = false;
            }

            expect(success).toBe(true);
        });

        it('throws an error if a panel does not provide a group');

        it('can create a trigger without throwing errors', function () {

            var success = true;

            try {
                new toggle.Trigger(document.createElement('div'), {
                    panel: new toggle.Panel(document.createElement('div'), {
                        group: new toggle.Group()
                    })
                });
            }
            catch(e) {
                success = false;
            }

            expect(success).toBe(true);
        });

        it('throws an error if a trigger does not provide a panel');

    });

    describe('group options', function() {

        it('can accept a different state class');

        it('can accept a callback for after a state change');

        it('calls the it\'s callback after remove active panel is called');

    });

    describe('panel options', function() {

        it('can disable the ability to turn self off');

    });

    describe('trigger options', function() {

        it('can have a custom active event');

        it('can have a custom inactive event');

        it('can have the same custom active and inactive event and know which to fire when the event happens');

    });

    describe('group methods', function() {

        it('can update options');

        it('can turn all panels inactive');

        it('can set a panel to active and sets all other panels to inactive');

        it('can detach a panel from the group');

    });

    describe('panel methods', function() {

        it('can update options');

        it('can set itself to active');

        it('can set itself to inactive');

        it('can detach a trigger from the panel');

    });

    describe('trigger methods', function() {

        it('can update options');

        it('can sync itself with the panel state');

        it('can update the panel state');

        it('can detach itself from the panel');

        it('can remove itself from the page');

    });

    describe('events', function() {


    });
});
