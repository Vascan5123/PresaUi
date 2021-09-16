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
import PostLoading from 'flarum/components/LoadingPost';
import ReplyPlaceholder from 'flarum/components/ReplyPlaceholder';
import PostStreamScrubber from 'flarum/components/PostStreamScrubber';

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
                                    {/* {<ul className="DiscussionPage-nav-ul">{listItems(this.sidebarItems().toArray())}</ul>} */}
                                    {
                                        PostStream.component({
                                            discussion,
                                            stream: this.stream,
                                            onPositionChange: this.positionChanged.bind(this),
                                            sidebarItems: this.sidebarItems(),
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

    override(DiscussionPage.prototype, 'sidebarItems', function () {
      const items = new ItemList();

      let controls = DiscussionControls.controls(this.discussion, this).toArray()
      controls[0].children[0] = "Editate";
      controls[0].attrs.icon = "fas fa-pencil-alt";

      console.log();

      if(app.session.user != undefined){
        items.add(
          'controls',
          SplitDropdown.component(
            {
              icon: 'fas fa-ellipsis-v',
              className: 'App-primaryControl',
              buttonClassName: 'Button',
              accessibleToggleLabel: app.translator.trans('core.forum.discussion_controls.toggle_dropdown_accessible_label'),
            },
            controls
          )
        );
      }

      /* items.add(
        'scrubber',
        PostStreamScrubber.component({
          stream: this.stream,
          className: 'App-titleControl',
        }),
        -100
      ); */

      return items;
    });

    override(PostStream.prototype, 'view', function () {

        let lastTime;

        const viewingEnd = this.stream.viewingEnd();
        const posts = this.stream.posts();
        const postIds = this.discussion.postIds();
        
        const postFadeIn = (vnode) => {
          $(vnode.dom).addClass('fadeIn');
          // 500 is the duration of the fadeIn CSS animation + 100ms,
          // so the animation has time to complete
          setTimeout(() => $(vnode.dom).removeClass('fadeIn'), 500);
        };
    
        const items = posts.map((post, i) => {
          let content;
          const attrs = { 'data-index': this.stream.visibleStart + i };
    
          if (post) {
            const time = post.createdAt();
            const PostComponent = app.postComponents[post.contentType()];
            content = PostComponent ? PostComponent.component({ post }) : '';
    
            attrs.key = 'post' + post.id();
            attrs.oncreate = postFadeIn;
            attrs['data-time'] = time.toISOString();
            attrs['data-number'] = post.number();
            attrs['data-id'] = post.id();
            attrs['data-type'] = post.contentType();
    
            // If the post before this one was more than 4 days ago, we will
            // display a 'time gap' indicating how long it has been in between
            // the posts.
            const dt = time - lastTime;
    
            if (dt > 1000 * 60 * 60 * 24 * 4) {
              content = [
                <div className="PostStream-timeGap">
                  <span>{app.translator.trans('core.forum.post_stream.time_lapsed_text', { period: dayjs().add(dt, 'ms').fromNow(true) })}</span>
                </div>,
                content,
              ];
            }
    
            lastTime = time;
          } else {
            attrs.key = 'post' + postIds[this.stream.visibleStart + i];
    
            content = PostLoading.component();
          }
          if(attrs['data-number'] == 1){

              var contentHtml = content.attrs.post.data.attributes.contentHtml;


              var video = contentHtml.split('[video]')
                .filter(function(v){ return v.indexOf('[/video]') > -1})
                .map( function(value) { 
                  return value.split('[/video]')[0]
              });

              var videoDiv = document.getElementsByClassName('video')[0];
              if((videoDiv != undefined)&&(videoDiv.innerHTML == "")){
                videoDiv.innerHTML = video[0];
              }

              var text = contentHtml.split('[text]')
                .filter(function(v){ return v.indexOf('[/text]') > -1})
                .map( function(value) { 
                  return value.split('[/text]')[0]
              });

              var textDiv = document.getElementsByClassName('description')[0];
              if((textDiv != undefined)&&(textDiv.innerHTML == "")){
                textDiv.innerHTML = text[0];
              }

              let sidebarItems = this.attrs.sidebarItems;
              /* sidebarItems.items.controls.content.attrs.buttonClassName = "Button";
              content.attrs.post.data.attributes.votes++; */
              return (
                <div className="PostStream-item" {...attrs}>
                  <div class="video"></div>
                  <div class="text">
                    <ul className="actions DiscussionPage-nav-ul">{listItems(sidebarItems.toArray())}</ul>
                    <div class="description"></div>
                    <div class="actions_2"></div>
                    </div>
                </div>
              );
          }else{
          return (
            <div className="PostStream-item" {...attrs}>
              {content}
            </div>
          );
          }
        });
    
        if (!viewingEnd && posts[this.stream.visibleEnd - this.stream.visibleStart - 1]) {
          items.push(
            <div className="PostStream-loadMore" key="loadMore">
              <Button className="Button" onclick={this.stream.loadNext.bind(this.stream)}>
                {app.translator.trans('core.forum.post_stream.load_more_button')}
              </Button>
            </div>
          );
        }
    
        // If we're viewing the end of the discussion, the user can reply, and
        // is not already doing so, then show a 'write a reply' placeholder.
        if (viewingEnd && (!app.session.user || this.discussion.canReply())) {


          items.push(
            <div className="PostStream-item" key="reply" data-index={this.stream.count()} oncreate={postFadeIn}>
              
              
              {ReplyPlaceholder.component({ discussion: this.discussion })}
            </div>
          );
        }
    
        return <div className="PostStream">{items}</div>;

    });
}