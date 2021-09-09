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
                                    {<ul className="DiscussionPage-nav-ul">{listItems(this.sidebarItems().toArray())}</ul>}

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



    override(PostStream.prototype, 'view', function () {

      let video = document.getElementsByClassName('video');
      let text = document.getElementsByClassName('text');
      
      if((text[0] != undefined)&&(video[0] != undefined)){
          if(window.innerWidth >= '900'){
              let h = video[0].getElementsByTagName('iframe')[0].clientHeight;
              if(h != 0){
                text[0].style.height = h + "px";
              }
          }
          window.addEventListener('resize', function(event){
              if(window.innerWidth >= '900'){
                  let h = video[0].getElementsByTagName('iframe')[0].clientHeight;
                  if(h != 0){
                   text[0].style.height = h + "px";
                  }
              }else{
                  text[0].style.height = "auto";
              }
            });
      }
        






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
            /* content2 = content.attrs.post.data.attributes.contentHtml; */
            /* console.log(content.attrs.post.data.attributes.contentHtml); */
          }
          return (
            <div className="PostStream-item" {...attrs}>
              {content}
            </div>
          );
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