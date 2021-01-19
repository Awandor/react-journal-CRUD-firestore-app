export const fileUpload = async( file ) => {

  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dxi9dhdsn/image/upload';

  const formData = new FormData();

  formData.append( 'upload_preset', 'react-journal-app' );
  formData.append( 'file', file );

  try {

    const resp = await fetch( cloudinaryUrl, { method: 'POST', body: formData } );

    if ( resp.ok ) {

      const cloudinaryResp = await resp.json();

      return cloudinaryResp.secure_url;

    }

    return null;

  } catch ( error ) {

    console.log( 'ERROR EN fileUpload', error );

    throw error;

  }

};
