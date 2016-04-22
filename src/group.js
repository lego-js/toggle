import assign from 'object-assign';

export const DEFAULTS = {
    state: 'active',
    afterStateChange: undefined
};

export default class {

    constructor(options) {
        let group = this;
        group.opts = assign({}, DEFAULTS, options);
        group.panels = [];
        group.activePanel = undefined;
    }

    addPanel(panel) {
        let group = this;

        if (!group.panels.some(p => p === panel)) {
            group.panels.push(panel);
        }

        return group;
    }

    setActivePanel(activePanel) {
        let group = this;
        if (activePanel === group.activePanel) return group;

        group.activePanel = activePanel;
        group.panels.forEach(p => p === activePanel || p.setState(false, true));
        group.afterStateChange();

        return group;
    }

    removeActivatePanel() {
        let group = this;

        group.activePanel = false;
        group.panels.forEach(p => p.setState(false, true));
        group.afterStateChange();

        return group;
    }

    afterStateChange() {
        if (typeof this.opts.afterStateChange === 'function') {
            this.opts.afterStateChange(this, !!this.activePanel, this.activePanel);
        }
    }

    setOptions(options) {
        assign(this.opts, options);
        return this;
    }
}
