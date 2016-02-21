function hasClassInList( elem, c ) {
	return elem.classList.contains( c );
}

function addClassInList( elem, c ) {
	elem.classList.add( c );
}

function removeClassInList( elem, c ) {
	elem.classList.remove( c );
}

function hasClassInName( elem, c ) {
	return ` ${ elem.className } `.indexOf( ` ${ c } ` ) > -1;
}

function addClassInName( elem, c ) {
	if ( !hasClassInName( elem, c ) ) {
		elem.className = `${elem.className} ${c}`;
	}
}

function removeClassInName( elem, c ) {
	elem.className = ` ${ elem.className } `.replace( new RegExp( ` ${ c } `, 'g' ), ' ' ).trim();
}

const LIST_SUPPORT = 'classList' in document.documentElement;

const classie = {
	has: LIST_SUPPORT ? hasClassInList : hasClassInName,
	add: LIST_SUPPORT ? addClassInList : addClassInName,
	remove: LIST_SUPPORT ? removeClassInList : removeClassInName,
	toggle: function ( elem, c ) {
		if ( !this.has( elem, c ) ) {
			this.add( elem, c );
		}
		else {
			this.remove( elem, c );
		}
	}
};

export default function state(elem, className, active) {

	if (typeof active === 'undefined') {
		return classie.has(elem, `is-${className}`);
	}

	var service = active === 'toggle' ? 'toggle' : active ? 'add' : 'remove';

	classie[service](elem, `is-${className}`);
	return !!active;
}
