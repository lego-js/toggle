import assign from 'object-assign';
import data from 'lego-data';
import state from 'lego-state';

const ENTER_KEY = 13;
const TABBABLE = [ 'a', 'button', 'input', 'object', 'select', 'textarea' ];

export var DEFAULTS = {
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

        node.addEventListener(trigger.opts.activeEvent, trigger, false);

        if (trigger.opts.activeEvent !== trigger.opts.inactiveEvent) {
            node.addEventListener(trigger.opts.inactiveEvent, trigger, false);
        }

        if (!~TABBABLE.indexOf(node.tagName.toLowerCase())) {
            node.setAttribute('tabindex', '0');

            if  (trigger.opts.activeEvent !== 'keydown' && trigger.opts.inactiveEvent !== 'keydown' &&
                (trigger.opts.activeEvent === 'click' || trigger.opts.inactiveEvent === 'click')) {

                node.addEventListener('keydown', trigger, false);
            }
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
        if  (!trigger.panel.state && (e.type === trigger.opts.activeEvent ||
            (trigger.opts.activeEvent === 'click' && e.type === 'keydown' && e.keyCode === ENTER_KEY))) {

            if (e.type === 'click' && (e.metaKey || e.ctrlKey)) return;

            e.preventDefault();
            trigger.panel.setState(true);
        }
        else if (trigger.panel.state && (e.type === trigger.opts.inactiveEvent ||
            (trigger.opts.inactiveEvent === 'click' && e.type === 'keydown' && e.keyCode === ENTER_KEY))) {

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
