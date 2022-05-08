import app from 'flarum/common/app';
import { extend, override } from 'flarum/extend';

import DiscussionListItem from 'flarum/components/DiscussionListItem';
//import DiscussionTaggedPost from 'flarum/tags/components/DiscussionTaggedPost';
//import DiscussionListItem from 'flarum/components/DiscussionListItem';
import DiscussionControls from 'flarum/utils/DiscussionControls';
import Dropdown from 'flarum/components/Dropdown';
import icon from 'flarum/helpers/icon';
import Link from 'flarum/components/Link';
import extractText from 'flarum/utils/extractText';
import humanTime from 'flarum/utils/humanTime';
import avatar from 'flarum/helpers/avatar';
import listItems from 'flarum/helpers/listItems';
import highlight from 'flarum/helpers/highlight';
import abbreviateNumber from 'flarum/utils/abbreviateNumber';

import { escapeRegExp } from 'lodash-es';

export default function () {
    extend(DiscussionListItem.prototype, 'infoItems', function (items) {
        /* var tags = this.attrs.discussion.tags();
        for (var i = 0; i < tags.length; ++i) {
            if (tags[i].children() && (!tags[i].isChild() && !tags[i].icon() == '')) {//??? wtf
                console.log(tags[i].icon());
                items.items.tags.content.children[i].attrs.className += " d-none"
            }

        } */

        if (items.items.excerpt) {
            let empty = 0;
            var excerpt = items.items.excerpt.content.children[0].children;
            var driveRegex = /(?<=\/file\/d\/)[\w-]*(?=\/)/g;//get file id
            var driveMatch = excerpt.match(driveRegex);
            if (driveMatch) {
                driveMatch = "https://drive.google.com/thumbnail?id=" + driveMatch[0];
                items.items.excerpt.content.children[0] = <p><img src={driveMatch} /><img className="button_play" src="https://i.ibb.co/5WKxGPg/25178.png" /></p>;//TODO: Insert play icon
            } else {
                empty++;
            }
            var youtubeRegex = /(?<=background\:url\()https.*\.jpg(?=\)\s)/g;//extract already existing thumbnail
            var youtubeMatch = excerpt.match(youtubeRegex);
            if (youtubeMatch) {
                items.items.excerpt.content.children[0] = <p><img src={youtubeMatch[0]} /><img className="button_play" src="https://i.ibb.co/5WKxGPg/25178.png" /></p>;//TODO: Insert play icon
            } else {
                empty++;
            }
            if (empty == 2) {
                //Значит нету видео
                let str = items.items.excerpt.content.children[0];
                str.children = str.children.replace("[video]", "");
                str.children = str.children.replace("[/video]", "");
                str.children = str.children.replace("[text]", "");
                str.children = str.children.replace("[/text]", "");
                items.items.excerpt.content.children[0] = <span class="DiscussionListItem-only-text">{str}</span>;
            }
        }
    });

    override(DiscussionListItem.prototype, 'view', function () {
        const discussion = this.attrs.discussion;
        const user = discussion.user();
        const isUnread = discussion.isUnread();
        const isRead = discussion.isRead();
        const showUnread = !this.showRepliesCount() && isUnread;
        let jumpTo = 0;
        const controls = DiscussionControls.controls(discussion, this).toArray();
        const attrs = this.elementAttrs();

        if (this.attrs.params.q) {
            const post = discussion.mostRelevantPost();
            if (post) {
                jumpTo = post.number();
            }
            /* console.log(this.attrs.params.q) */
            const phrase = escapeRegExp(this.attrs.params.q);
            this.highlightRegExp = new RegExp(phrase + '|' + phrase.trim().replace(/\s+/g, '|'), 'gi');
        } else {
            jumpTo = Math.min(discussion.lastPostNumber(), (discussion.lastReadPostNumber() || 0) + 1);
        }

        let tags = listItems(this.infoItems().toArray())[0];

        /* console.log(tags.children[0].children) */

        let tagLength = tags.children[0].children.length;

        for (let i = 0; i < tagLength; i++) {
            if (tags.children[0].children[i]) {
                if (tags.children[0].children[i].children[0].children[0] && (tags.children[0].children[i].children[0].children[0].tag != "i") && (tags.children[0].children[i].attrs.className.includes("TagLabel--child") == false)) {
                    tags.children[0].children[i].attrs.className += " d-none"
                }
            }
        }


        return (
            <div {...attrs}>
                {controls.length
                    ? Dropdown.component(
                        {
                            icon: 'fas fa-ellipsis-h',
                            className: 'DiscussionListItem-controls',
                            buttonClassName: 'Button Button--icon Button--flat Slidable-underneath Slidable-underneath--right',
                        },
                        controls
                    )
                    : ''}

                <span
                    className={'Slidable-underneath Slidable-underneath--left Slidable-underneath--elastic' + (isUnread ? '' : ' disabled')}
                    onclick={this.markAsRead.bind(this)}
                >
                    {icon('fas fa-check')}
                </span>

                <div className={'DiscussionListItem-content Slidable-content' + (isUnread ? ' unread' : '') + (isRead ? ' read' : '')}>


                    <ul className="DiscussionListItem-badges badges">{listItems(discussion.badges().toArray())}</ul>

                    <Link href={app.route.discussion(discussion, jumpTo)} className="DiscussionListItem-main">
                        <ul className="DiscussionListItem-info">{listItems(this.infoItems().toArray())[listItems(this.infoItems().toArray()).length - 1]}</ul>
                        <h3 className="DiscussionListItem-title">{highlight(discussion.title(), this.highlightRegExp)}</h3>
                        <ul className="DiscussionListItem-info">{tags}</ul>
                    </Link>

                    <span
                        tabindex="0"
                        role="button"
                        className="DiscussionListItem-count"
                        onclick={this.markAsRead.bind(this)}
                        title={showUnread ? app.translator.trans('core.forum.discussion_list.mark_as_read_tooltip') : ''}
                    >
                        {abbreviateNumber(discussion[showUnread ? 'unreadCount' : 'replyCount']())}
                    </span>
                </div>
            </div>
        );
    });

}