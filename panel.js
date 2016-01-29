export const DEFAULTS = {
    canTurnSelfOff: true
};

export default class {

    constructor(dom, options) {
        let panel = this;

        panel.opts = _.assign({}, DEFAULTS, options);
        panel.elem = dom;
        panel.triggers = [];
        panel.state = false;
        panel.group = options.group.addPanel(panel);
        panel.setState(app.state(panel.elem, panel.group.opts.state) || !!(window.location.hash && dom.id === window.location.hash.substr(1)));
    }

    addTrigger(trigger) {
        let panel = this;

        if (!panel.triggers.some(t => t === trigger)) {
            trigger.index = panel.triggers.length;
            panel.triggers.push(trigger);
        }

        return panel;
    }

    removeTrigger(trigger) {
        let panel = this;

        panel.triggers.splice(trigger.index, 1);

        return panel;
    }

    setOptions(options) {
        _.assign(this.opts, options);
        return this;
    }

    setState(active, calledByGroup) {
        let panel = this;

        active = active === 'toggle' ? !panel.state : active;
        if (active !== panel.state) {
            app.state(panel.elem, panel.group.opts.state, panel.state = active);
            if (active) {
                panel.group.setActivePanel(panel);
            }
            else if (!calledByGroup) {
                panel.group.removeActivatePanel();
            }
        }

        panel.triggers.forEach(t => t.setState());

        return panel;
    }
}
