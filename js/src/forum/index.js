import app from 'flarum/common/app';
import { extend, override } from 'flarum/extend';
import CardList from './components/CardList';
import IndexPage from './components/IndexPage';


app.initializers.add('vascan/presa-ui', () => {
  CardList();
  IndexPage();
});
