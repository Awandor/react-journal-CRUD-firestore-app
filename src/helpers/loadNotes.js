import { db } from '../firebase/firebase-config';

export const loadNotes = async( uid ) => {

  const notesSnapshot = await db.collection( `${uid}/journal/notes` ).get();

  const notes = [];

  notesSnapshot.forEach( snapshotHijo => {

    // console.log( snapshotHijo.data() );

    notes.push( {
      id: snapshotHijo.id,
      ...snapshotHijo.data()
    } );

  } );

  // console.log( notes );

  return notes;

};
