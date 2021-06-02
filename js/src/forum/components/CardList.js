import app from 'flarum/common/app';
import { extend, override } from 'flarum/extend';


import DiscussionListItem from 'flarum/components/DiscussionListItem';
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
            console.log(this.attrs.params.q)
            const phrase = escapeRegExp(this.attrs.params.q);
            this.highlightRegExp = new RegExp(phrase + '|' + phrase.trim().replace(/\s+/g, '|'), 'gi');
        } else {
            jumpTo = Math.min(discussion.lastPostNumber(), (discussion.lastReadPostNumber() || 0) + 1);
        }

        return (
            <div {...attrs}>
                {controls.length
                    ? Dropdown.component(
                        {
                            icon: 'fas fa-ellipsis-v',
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
                    <Link
                        href={user ? app.route.discussion(discussion, jumpTo) : '#'}
                        className="DiscussionListItem-author"
                        title={extractText(
                            app.translator.trans('core.forum.discussion_list.started_text', { user: user, ago: humanTime(discussion.createdAt()) })
                        )}
                    //tooltip
                    /* oncreate={function (vnode) {
                        $(vnode.dom).tooltip({ placement: 'right' });
                    }} */
                    >
                        {/* user.data.attributes.avatarUrl = "" */}
                        {/* avatar(user, { title: '' }) */}
                        <span class="Avatar ">
                            {/* <img class="Avatar" data-src="https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-autumnal-fall-big-tree-park-background-cartoon-design-backgroundfallbig-treefallen-leavespark-image_53954.jpg" /> */}
                        </span>

                    </Link>

                    <ul className="DiscussionListItem-badges badges">{listItems(discussion.badges().toArray())}</ul>

                    <Link href={app.route.discussion(discussion, jumpTo)} className="DiscussionListItem-main">
                        <h3 className="DiscussionListItem-title">{highlight(discussion.title(), this.highlightRegExp)}</h3>
                        <ul className="DiscussionListItem-info">{listItems(this.infoItems().toArray())}</ul>
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