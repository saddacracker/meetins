import { useSetListQuery } from '@meetins/data-access';

export const SetList = (props) => {
  const { loading, error, data } = useSetListQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul>
      {data.allSets.map(({ id, name, day, time, end_time }) => (
        <li key={id}>
          {id} <strong>{name}</strong> | {day} | {time} - {end_time}
        </li>
      ))}
    </ul>
  );
};

export default SetList;