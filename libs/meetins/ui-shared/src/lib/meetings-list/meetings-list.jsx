import {
  gql,
  useQuery
} from "@apollo/client";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// EXAMPLE: https://www.antstack.io/blog/graphql-pagination-with-apollo-v3-part-1/
const LIST_ALL_MEETINGS = gql`
query ListMeetings($city: String, $state: String, $postal_code: String, $day: Int) { 
	listMeetings(city: $city, state: $state, postal_code: $postal_code, day: $day, ) { 
      id
      name
      day
      updated
      rating
      reviews
      notes
      types
      time
      end_time
      address
      city
    }
  }
`

export const MeetingsList = () => {
  const { loading, error, data } = useQuery(LIST_ALL_MEETINGS, { variables: { city: "Everett" }});
  const classes = useStyles();

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (!data.listMeetings) return `No records found :(`

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Day</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Star Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.listMeetings.map((meeting) => (
            <TableRow key={meeting.id}>
              <TableCell component="th" scope="row">
                {meeting.name}
              </TableCell>
              <TableCell align="right">{meeting.day}</TableCell>
              <TableCell align="right">{meeting.time}</TableCell>
              <TableCell align="right">{meeting.city}</TableCell>
              <TableCell align="right">{meeting.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MeetingsList;