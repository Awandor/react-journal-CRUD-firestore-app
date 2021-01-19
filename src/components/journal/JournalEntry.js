import React from 'react';

import moment from 'moment';
import { useDispatch } from 'react-redux';
import { /* activateEntryAction, */ activeNoteStoreAction } from '../../actions/notesActions';

export const JournalEntry = ( { id, date, title, body, url } ) => {

  const dateName = moment( date ).format( 'dddd' );

  const dateNumber = moment( date ).format( 'Do' );

  const dispatch = useDispatch();

  const handleEntryClick = () => {

    // Al tocar vamos a activar la nota pasando el id

    // dispatch( activateEntryAction( id ) );

    // No es necesario, podemos usar activeNoteStoreAction directamente

    dispatch( activeNoteStoreAction( id, { id, date, title, body, url } ) );

  };

  return (
    <div className="journal__entry" onClick={handleEntryClick}>

      {
        url && <div className="journal__entry-picture"
          style={
            { backgroundSize: 'cover', backgroundImage: `url(${url})` }}></div>
      }

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>

        <p className="journal__entry-content">{body}</p>
      </div>

      <div className="journal__entry-date-box">
        <span>{dateName}</span><h4>{dateNumber}</h4>
      </div>
    </div>
  );

};
