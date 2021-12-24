import React, { useState } from 'react';

// import './set-form.css';
import { useAddSetMutation, SetListDocument} from '@meetins/data-access';

/* eslint-disable-next-line */
export interface SetFormProps {}

export const SetForm = (props: SetFormProps) => {
  const [name, setName] = useState('');
  const [day, setDay] = useState(0);
  const [time, setTime] = useState('');
  const [end_time, setEndTime] = useState('');
  
  const [addSetMutation, mutationResult] = useAddSetMutation({
    variables: { name, day, time, end_time },
    update(cache, { data: { addSet } }) {
      const { allSets } = cache.readQuery({ query: SetListDocument });
      cache.writeQuery({
        query: SetListDocument,
        data: { allSets: allSets.concat([addSet]) }
      });
    }
  });

  const handleSubmit = event => {
    event.preventDefault();
    addSetMutation();

    // reset form
    setName("");
    setDay(0)
    setTime("");
    setEndTime("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:{' '}
        <input
          name="name"
          value={name}
          onChange={event => setName(event.target.value)}
        ></input>
      </label>
      <br />
      <label>
        Day:{' '}
        <input
          name="day"
          type="number"
          max="6"
          min="0"
          value={day}
          onChange={event => setDay(Number(event.target.value))}
        ></input>
      </label>
      <br />
      <label>
        Start Time:{' '}
        <input
          name="time"
          value={time}
          onChange={event => setTime(event.target.value)}
        ></input>
      </label>
      <br />
      <label>
        End Time:{' '}
        <input
          name="end_time"
          value={end_time}
          onChange={event => setEndTime(event.target.value)}
        ></input>
      </label>
      <br />
      <button>Create new set</button>
    </form>
  );
};

export default SetForm;