import { finishLoadingAction, removeErrorAction, setErrorAction, startLoadingAction } from "../../actions/uiActions";

describe( 'Pruebas em uiActions', () => {

  test( 'todas las acciones deberían funcionar', () => {

    let action = setErrorAction( 'Error!!!' );

    // console.log( action );

    expect( action ).toEqual( { type: '[UI reducer] set error', payload: 'Error!!!' } );

    action = removeErrorAction();

    // console.log( action );

    expect( action ).toEqual( { type: '[UI reducer] remove error' } );

    action = startLoadingAction();

    // console.log( action );

    expect( action ).toEqual( { type: '[UI reducer] Start loading' } );

    action = finishLoadingAction();

    // console.log( action );

    expect( action ).toEqual( { type: '[UI reducer] Finish loading' } );

  } );

} );
