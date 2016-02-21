# Toggle Element States

To install the module run: `npm install --save lego-toggle`

To use the toggle library, import like so:
```
import * as toggle from 'lego-toggle';
```

The first argument of each constructor is a HTMLElement, the second is an object of settings.

A `Panel` requires the `group` option to be populated with an instance of `Group`.
A `Trigger` requires the `panel` options to be populated with an instance of `Panel`.



## Group

- Can have many panels.
- Has one activePanel.
- Has one state associated.


### Options


#### state [optional]

String, default: 'active'
The class that will be applied to the active panel and that panels triggers


#### afterStateChange [optional]

String, default: null
A callback method that will be invoked after a state change.


### Methods


#### setActivePanel(activePanel)

- activePanel: Panel instance [required]
Sets the provided panel state to active and sets all other panels associated with this group to inactive.
Also calls on the afterStateChange callback if provided.


#### removeActivatePanel()

Turns all panels associated with this group to false.


#### setOptions(options)

- options: object [required]
Override exsisting options with provided object of settings.



## Panel

- Belongs to one group.
- Can have many triggers.


### Options


#### group [required]

Group instance, default: null
The group that this panel belongs to.


#### canTurnSelfOff [optional]

Boolean, default: true
If false, a panel can only be turned off by another panel being turned on.


### Methods


#### removeTrigger(trigger)

- trigger: Trigger instance [required]
Disassociates trigger with current panel.


#### setOptions(options)

- options: object [required]
Override exsisting options with provided object of settings.


#### setState(active)

- active: Boolean [optional]
Sets this panel state to active and sets all other panels associated with this panel's group to inactive.
Also calls on the group's afterStateChange callback if provided.



## Trigger

- Belongs to one panel.
- State is bound to panel's state.


### Options


#### panel [required]

Panel instance, default: null
The panel that this trigger belongs to.


#### activeEvent [optional]

String, default: 'click'
The event attached to the trigger that sets the panel to active.

####inactiveEvent [optional]

String, default: 'click'
The event attached to the trigger that sets the panel to inactive.


### Methods


#### detach()

Disassociates trigger with it's panel.


#### destroy()

Removes trigger element from the DOM.
