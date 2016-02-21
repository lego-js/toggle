---
layout: default
title: "Lego Toggle Documentation"
---

# Lego Toggle Documentation

To install the module run: `npm install --save lego-toggle`

To use the toggle library, import like so:

    import * as toggle from 'lego-toggle';

The first argument of each constructor is a HTMLElement, the second is an object of settings.

A `Panel` requires the `group` option to be populated with an instance of `Group`.
A `Trigger` requires the `panel` options to be populated with an instance of `Panel`.



## Group

- Can have many panels.
- Has one activePanel.
- Has one state associated.


### Options
{: #group-options }


#### state [optional]
{: #group-options-state }

*String*, default: **'active'**
The class that will be applied to the active panel and that panels triggers

    let group = new toggle.Group({
        state: 'open'
    });


#### afterStateChange [optional]
{: #group-options-afterstatechange }

*String*, default: **null**
A callback method that will be invoked after a state change.

    let group = new toggle.Group({
        afterStateChange: function(group, active, activePanel) {
            if (active) {
                // add logic here...
            }
        }
    });


### Methods
{: #group-methods }


#### removeActivatePanel()
{: #group-methods-removeactivepanel }

Turns all panels associated with this group to false.


#### setActivePanel(activePanel)
{: #group-methods-setactivepanel }

- activePanel: **Panel instance** *[required]* <br>
    Sets the provided panel state to active and sets all other panels associated with this group to inactive.
    Also calls on the afterStateChange callback if provided.

<span></span>
    
    let group = new toggle.Group();
    let panel = new toggle.Panel(someElement, { group });
    
    group.setActivePanel(panel);


#### setOptions(options)
{: #group-methods-setoptions }

- options: **object** *[required]* <br>
    Override exsisting options with provided object of settings.

<span></span>
    
    group.setOptions({
        state: 'new-state',
        someRandomData: { foo: 'bar' }
    });



## Panel

- Belongs to one group.
- Can have many triggers.


### Options
{: #panel-options }


#### group [required]
{: #panel-options-group }

*Group instance*, default: **null**
The group that this panel belongs to.


#### canTurnSelfOff [optional]
{: #panel-options-canturnselfoff }

*Boolean*, default: **true**
If false, a panel can only be turned off by another panel being turned on. Disabling this option is helpful for things like tabs and carousels.

	let group = new toggle.Group();
	
	let panel = new toggle.Panel(someElement, {
		group,
		canTurnSelfOff: false
	});
	
	panel.setState(true);
	panel.setState(false);
	
	group.activePanel === panel; // true

### Methods
{: #panel-methods }


#### setOptions(options)
{: #panel-methods-setoptions }

- options: **object** *[required]* <br>
    Override exsisting options with provided object of settings. Also useful for storing arbitrary data.
    
<span></span>

	let group = new toggle.Group();
	let panel = new toggle.Panel(someElement, { group });
	
	panel.setOptions({
		myIndex: 12
	});
	
	panel.opts.myIndex === 12; // true	


#### setState(active)
{: #panel-methods-setstate }

- active: **Boolean** *[optional]* <br>
    Sets this panel state to active and sets all other panels associated with this panel's group to inactive.
    Also calls on the group's afterStateChange callback if provided.

<span></span>

	let group = new toggle.Group();
	let panel1 = new toggle.Panel(someElement, { group });
	let panel2 = new toggle.Panel(someOtherElement, { group });
	
	panel2.setState(true);
	
	group.activePanel === panel1; // false
	group.activePanel === panel2; // true
	
	panel1.setState(true);
	
	group.activePanel === panel1; // true
	group.activePanel === panel2; // false
	
	panel1.setState(false);
	
	group.activePanel === panel1; // false
	group.activePanel === panel2; // false
	group.activePanel == null; // true


## Trigger

- Belongs to one panel.
- State is bound to panel's state.


### Options
{: #trigger-options }


#### panel [required]
{: #trigger-options-panel }

*Panel instance*, default: **null**
The panel that this trigger belongs to.


#### activeEvent [optional]
{: #trigger-options-activeevent }

*String*, default: **'click'**
The event attached to the trigger that sets the panel to active.


#### inactiveEvent [optional]
{: #trigger-options-inactiveevent }

*String*, default: **'click'**
The event attached to the trigger that sets the panel to inactive.

	let trigger = new toggle.Trigger(someElement, {
		panel: panelInstance,
		activeEvent: 'click',
		inactiveEvent: 'mouseleave'
	});


### Methods
{: #trigger-methods }


#### detach()
{: #trigger-methods-detach }

Disassociates trigger with it's panel.


#### destroy()
{: #trigger-methods-destroy }

Removes trigger element from the DOM.