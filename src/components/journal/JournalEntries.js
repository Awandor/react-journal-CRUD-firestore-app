import React from 'react';
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    // const entries = [ 1,2,3,4,5,6,7,8,9,10 ];

    // Recuperamos las notas del Store

    const entries = useSelector( state => state.notes.notes );

    // console.log( entries );

    return (
        <div className="journal__entries">
            {
                entries.map( value => {

                    return <JournalEntry key={value.id} {...value} />;
                
                } )
            }
        </div>
    );

};
