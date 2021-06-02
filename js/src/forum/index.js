import app from 'flarum/common/app';
import { extend, override } from 'flarum/extend';
import CardList from './components/CardList';


app.initializers.add('vascan/presa-ui', () => {
  CardList();
});
