import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { startImageUploading, startSaveNoteAction } from '../../actions/notesActions';

export const NotesAppBar = () => {

  const { active: note } = useSelector( state => state.notes );

  const { date } = note;

  // console.log( 'date', date );

  const formattedDate = moment( date ).format( 'Do MMMM YYYY' );

  const dispatch = useDispatch();

  const handleSave = () => {

    dispatch( startSaveNoteAction( note ) );

  };

  const handlePicture = ()=>{

    // Simulamos el click del fileSelector que está oculto

    document.querySelector( '#fileSelector' ).click();

  };

  const handleFileChange = ( e )=>{
    
    // console.log( e );

    const file = e.target.files[0];

    if( file ){

      dispatch( startImageUploading( file ) );
      
    }
  
};

  return (
    <div className="notes__app-bar">
      <span>{formattedDate}</span>

      <input id="fileSelector" type="file" style={{ display: 'none' }} onChange={handleFileChange} />

      <div>
        <button className="btn" onClick={handlePicture}>Picture</button>

        <button className="btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );

};
