import data from 'lego-data';
import assign from './utils/assign';
import state from './utils/state';

export const DEFAULTS = {
    activeEvent: 'click',
    inactiveEvent: 'click'
};

export default class Trigger {

    constructor(node, options) {
        let trigger = data(node, '_trigger');
        if (trigger instanceof Trigger) return trigger;

        trigger = this;
        trigger.opts = assign({}, DEFAULTS, options);
        trigger.node = node;
        trigger.panel = options.panel.addTrigger(trigger);
        trigger.syncState();

        if (node.tagName.toLowerCase() !== 'a' || node.tagName.toLowerCase() !== 'button') {
            node.setAttribute('tabindex', '0')
        }
        node.addEventListener(trigger.opts.activeEvent, trigger, false);

        if (trigger.opts.activeEvent !== trigger.opts.inactiveEvent) {
            node.addEventListener(trigger.opts.inactiveEvent, trigger, false);
        }
        data(node, '_trigger', trigger);
    }

    syncState() {
        let trigger = this;

        state(trigger.node, trigger.panel.group.opts.state, trigger.panel.state);

        return trigger;
    }

    setState(state) {
        this.panel.setState(state);
    }

    handleEvent(e) {
        let trigger = this;
        if (e.type === trigger.opts.activeEvent && !trigger.panel.state) {
            if (e.type === 'click' && (e.metaKey || e.ctrlKey)) return;
            e.preventDefault();
            trigger.panel.setState(true);
        }
        else if (e.type === trigger.opts.inactiveEvent && trigger.panel.state) {
            e.preventDefault();
            trigger.panel.setState(!trigger.panel.opts.canTurnSelfOff);
        }
    }

    detach() {
        let trigger = this;

        trigger.panel.removeTrigger(trigger);
        trigger.node.removeEventListener(trigger.opts.activeEvent, trigger);
        if (trigger.opts.activeEvent !== trigger.opts.inactiveEvent) {
            trigger.node.removeEventListener(trigger.opts.inactiveEvent, trigger);
        }

        return trigger;
    }

    destroy() {
        let trigger = this;

        trigger.detach();
        trigger.node.parentNode.removeChild(trigger.node);

        return trigger;
    }
}
