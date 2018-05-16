import { withProps } from 'recompose';
import adventures from '../../data/adventures.json';
import Dashboard from './Dashboard.presentation';

export default withProps({ adventures })(Dashboard);
