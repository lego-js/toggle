function hasClassInList( node, c ) {
    return node.classList.contains( c );
}

function addClassInList( node, c ) {
    node.classList.add( c );
}

function removeClassInList( node, c ) {
    node.classList.remove( c );
}

function hasClassInName( node, c ) {
    return ` ${ node.className } `.indexOf( ` ${ c } ` ) > -1;
}

function addClassInName( node, c ) {
    if ( !hasClassInName( node, c ) ) {
        let className = `${node.className} ${c}`;
        node.className.baseVal ? node.className.baseVal = className : node.className = className;
    }
}

function removeClassInName( node, c ) {
    let className = ` ${ node.className } `.replace( new RegExp( ` ${ c } `, 'g' ), ' ' ).trim();
    node.className.baseVal ? node.className.baseVal = className : node.className = className;
}

const classie = {
    has: function ( node, c ) {
        if ( !node || !c ) return false;
        return 'classList' in node ? hasClassInList(node, c) : hasClassInName(node, c);
    },
    add: function ( node, c ) {
        if ( !node || !c ) return;
        return 'classList' in node ? addClassInList(node, c) : addClassInName(node, c);
    },
    remove: function ( node, c ) {
        if ( !node || !c ) return;
        return 'classList' in node ? removeClassInList(node, c) : removeClassInName(node, c);
        },
    toggle: function ( node, c ) {
        if ( !this.has( node, c ) ) {
            this.add( node, c );
        }
        else {
            this.remove( node, c );
        }
    }
};

export default function state(node, className, active) {

    if (typeof active === 'undefined') {
        return classie.has(node, `is-${className}`);
    }

    var service = active === 'toggle' ? 'toggle' : active ? 'add' : 'remove';

    classie[service](node, `is-${className}`);
    return !!active;
}
