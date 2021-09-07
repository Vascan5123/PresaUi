import app from 'flarum/common/app';
import { extend, override } from 'flarum/extend';
import CardList from './components/CardList';
import DiscussionList from './components/DiscussionList';
import IndexPage from './components/IndexPage';
import DiscussionPage from './components/DiscussionPage';

app.initializers.add('vascan/presa-ui', () => {
  CardList();
  DiscussionList();
  IndexPage();
  DiscussionPage();
});
