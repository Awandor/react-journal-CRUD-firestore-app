import React, { useEffect, useRef } from 'react';
import { NotesAppBar } from './NotesAppBar';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { activeNoteStoreAction, startDeleteNoteAction } from '../../actions/notesActions';

export const NoteScreen = () => {

  // Leemos el State y traemos la nota activa

  const { active: note } = useSelector( state => state.notes );

  // Usamos nuestro Hook useForm

  const [ formValues, handleInputChange, reset ] = useForm( note );

  // console.log( 'formValues', formValues );

  const { title, body } = formValues;

  // useRef nos permite almacenar una variable mutable que no va a redibujar todo el componente si cambia

  const activeId = useRef( note.id );

  useEffect( () => {

    if ( activeId.current !== note.id ) {

      // Si son diferentes necesito resetear el formulario

      reset( note );

      // Cuidado porque se puede crear un ciclo infinito

      activeId.current = note.id;

    }

  }, [ note, reset ] );

  // Vamos a actualizar la nota activa según vamos escribiendo

  const dispatch = useDispatch();

  useEffect( () => {

    dispatch( activeNoteStoreAction( formValues.id, { ...formValues } ) );

  }, [ formValues, dispatch ] ); // Podríamos haber puesto title y body pero es mejor una única dependencia

  const handleDeleteNote = () => {

    dispatch( startDeleteNoteAction( note.id ) );

  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">

        { /* Si no se pone el name de los inputs no se puede escribir en ellos porque el useForm hace uso del name */}

        <input type="text" className="notes__title-input" name="title" placeholder="Add some awesome title" autoComplete="off" value={title} onChange={handleInputChange} />

        <textarea className="notes__textarea" name="body" placeholder="What happened today?" value={body} onChange={handleInputChange}></textarea>
        
      </div>

      {
        ( note.url ) && ( < div className="notes__image"><img src={note.url} alt="Some description" /></div> )
      }

      <button className="btn btn-danger" onClick={handleDeleteNote} > Delete </button>
    </div>


      );

    };
