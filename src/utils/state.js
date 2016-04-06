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
        let className = `${elem.className} ${c}`;
        elem.className.baseVal ? elem.className.baseVal = className : elem.className = className;
    }
}

function removeClassInName( elem, c ) {
    let className = ` ${ elem.className } `.replace( new RegExp( ` ${ c } `, 'g' ), ' ' ).trim();
    elem.className.baseVal ? elem.className.baseVal = className : elem.className = className;
}

const classie = {
    has: function ( elem, c ) {
        if ( !elem || !c ) return false;
        return 'classList' in elem ? hasClassInList(elem, c) : hasClassInName(elem, c);
    },
    add: function ( elem, c ) {
        if ( !elem || !c ) return;
        return 'classList' in elem ? addClassInList(elem, c) : addClassInName(elem, c);
    },
    remove: function ( elem, c ) {
        if ( !elem || !c ) return;
        return 'classList' in elem ? removeClassInList(elem, c) : removeClassInName(elem, c);
        },
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
