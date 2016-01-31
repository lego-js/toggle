import data from 'lego-data';
import state from './utils/state';

export const DEFAULTS = {
    activeEvent: 'click',
    inactiveEvent: 'click'
};

export default class Trigger {

    constructor(dom, options) {
        let trigger = data(dom, '_trigger');
        if (trigger instanceof Trigger) return trigger;

        trigger = this;
        trigger.opts = assign({}, DEFAULTS, options);
        trigger.elem = dom;
        trigger.panel = options.panel.addTrigger(trigger);
        trigger.setState();

        trigger.elem.addEventListener(trigger.opts.activeEvent, trigger, false);

        if (trigger.opts.activeEvent !== trigger.opts.inactiveEvent) {
            trigger.elem.addEventListener(trigger.opts.inactiveEvent, trigger, false);
        }
        data(dom, '_trigger', trigger);
    }

    setState() {
        let trigger = this;

        state(trigger.elem, trigger.panel.group.opts.state, trigger.panel.state);

        return trigger;
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
        trigger.elem.removeEventListener(trigger.opts.activeEvent, trigger);
        if (trigger.opts.activeEvent !== trigger.opts.inactiveEvent) {
            trigger.elem.removeEventListener(trigger.opts.inactiveEvent, trigger);
        }

        return trigger;
    }

    destroy() {
        let trigger = this;

        trigger.detach();
        trigger.elem.parentNode.removeChild(trigger.elem);

        return trigger;
    }
}
