import { fileUpload } from "../../helpers/fileUpload";

import cloudinary from 'cloudinary';

cloudinary.config( {
  cloud_name: 'dxi9dhdsn',
  api_key: '882514879816246',
  api_secret: 'pChywIQU8RCzGhroMQzyGQGbhrM'
} );

describe( 'Pruebas en fileUpload', () => {

  test( 'debería subir un archivo a Cloudinary.com y retornar la URL', async() => {

    const resp = await fetch( 'https://img.freepik.com/foto-gratis/detalle-textura-muro-piedra_23-2148189540.jpg?size=626&ext=jpg' );

    const blob = await resp.blob();

    const file = new File( [ blob ], 'foto.jpg' );

    const url = await fileUpload( file );

    // console.log( url );

    expect( typeof url ).toBe( 'string' );

    // Borrar imagen por ID

    const segments = url.split( '/' );

    // console.log( segments );

    const lastPosition = segments.length - 1;

    // console.log( lastPosition );

    const imageId = segments[ lastPosition ].replace( '.jpg', '' );

    // console.log( imageId );

    await cloudinary.v2.api.delete_resources( imageId );

  } );

  test( 'debería de retornar null', async() => {

    const file = new File( [], 'foto.jpg' );

    const url = await fileUpload( file );

    expect( url ).toBe( null );

  } );



} );
