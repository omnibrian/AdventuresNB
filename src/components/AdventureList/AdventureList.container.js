import { withProps } from 'recompose';
import adventures from '../../data/adventures.json';
import AdventureList from './AdventureList.presentation';

export default withProps({ adventures })(AdventureList);
