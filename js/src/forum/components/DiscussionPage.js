import app from 'flarum/common/app';
import { extend, override } from 'flarum/extend';

import DiscussionPage from 'flarum/components/DiscussionPage';
import Page from 'flarum/common/components/Page';
import ItemList from 'flarum/common/utils/ItemList';
import DiscussionHero from 'flarum/components/DiscussionHero';
import DiscussionListPane from 'flarum/components/DiscussionListPane';
import PostStream from 'flarum/components/PostStream';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import SplitDropdown from 'flarum/common/components/SplitDropdown';
import listItems from 'flarum/common/helpers/listItems';
import DiscussionControls from 'flarum/utils/DiscussionControls';
import PostStreamState from 'flarum/states/PostStreamState';

export default function () {


    /* extend(DiscussionPage.prototype, 'view', function (view) {
        if (view.children[1].children[1]) {
            view.children[1].children[1].attrs.className = "container-fluid"
        }
        console.log(view);
    }); */


    override(DiscussionPage.prototype, 'view', function () {
        const discussion = this.discussion;

        return (
            <div className="DiscussionPage">
                <DiscussionListPane state={app.discussions} />
                <div className="DiscussionPage-discussion">
                    {discussion ? (
                        [
                            /* DiscussionHero.component({ discussion }), */
                            <div className="container-fluid">
                                {/* <nav className="DiscussionPage-nav">
                  <ul>{listItems(this.sidebarItems().toArray())}</ul>
                </nav> */}
                                <div className="DiscussionPage-stream">
                                    <ul className="DiscussionPage-nav-ul">{listItems(this.sidebarItems().toArray())}</ul>

                                    {
                                        /* console.log(this.stream), */
                                        PostStream.component({
                                            discussion,
                                            stream: this.stream,
                                            onPositionChange: this.positionChanged.bind(this),
                                        })}
                                </div>
                            </div>,
                        ]
                    ) : (
                        <LoadingIndicator />
                    )}
                </div>
            </div>
        );
    });



    override(DiscussionPage.prototype, 'view', function () {


    });
}