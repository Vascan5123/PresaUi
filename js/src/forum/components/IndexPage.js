import app from 'flarum/common/app';
import { extend, override } from 'flarum/extend';
import Button from 'flarum/components/Button';
import LinkButton from 'flarum/components/LinkButton';
import IndexPage from 'flarum/components/IndexPage';
import DiscussionList from 'flarum/components/DiscussionList';
import listItems from 'flarum/helpers/listItems';

export default function () {

    extend(IndexPage.prototype, 'sidebarItems', function (sidebarItems) {

        function goEmoldova() {
            location.href = "https://emoldova.org/";
        }
        sidebarItems.add(
            'Emoldova',
            LinkButton.component(
                {
                    onclick: goEmoldova.bind(this),
                    icon: 'fas fa-home',
                    className: 'Button Button--primary item-Emoldova',
                    itemClassName: 'App-primaryControl',
                },
                "Emoldova"
            ),
        );

        console.log(app.store.all('tags'))

        for (let i = 0; i < app.store.all('tags').length; i++) {
            switch (app.store.all('tags')[i].data.attributes.name) {
                case "Noutăți":
                    sidebarItems.add(
                        app.store.all('tags')[i].data.attributes.name,
                        LinkButton.component(
                            {
                                icon: app.store.all('tags')[i].data.attributes.icon,
                                href: '/press/t/' + app.store.all('tags')[i].data.attributes.slug,
                                className: 'Button Button--primary tags_left',
                                itemClassName: 'App-primaryControl',
                            },
                            app.store.all('tags')[i].data.attributes.name
                        ),
                    );
                    break;
                case "Canale":
                    sidebarItems.add(
                        app.store.all('tags')[i].data.attributes.name,
                        LinkButton.component(
                            {
                                icon: app.store.all('tags')[i].data.attributes.icon,
                                href: '/press/t/' + app.store.all('tags')[i].data.attributes.slug,
                                className: 'Button Button--primary tags_left',
                                itemClassName: 'App-primaryControl',
                            },
                            app.store.all('tags')[i].data.attributes.name
                        ),
                    );
                    break;
                case "Emisiuni":
                    sidebarItems.add(
                        app.store.all('tags')[i].data.attributes.name,
                        LinkButton.component(
                            {
                                icon: app.store.all('tags')[i].data.attributes.icon,
                                href: '/press/t/' + app.store.all('tags')[i].data.attributes.slug,
                                className: 'Button Button--primary tags_left',
                                itemClassName: 'App-primaryControl',
                            },
                            app.store.all('tags')[i].data.attributes.name
                        ),
                    );
                    break;
                default:
                    break;
            }
        }
        /* console.log(sidebarItems.items) */
    });
    extend(IndexPage.prototype, 'viewItems', function (viewItems) {


        let items = IndexPage.prototype.sidebarItems().items.nav.content.children

        for (let i = 0; i < items.length; i++) {
            if (items[i].itemName === "separator") {
                items.splice(0, i + 1);
            }
        }
        /* console.log(items); */

        for (let y = 0; y < items.length; y++) {
            if ((items[y].children[0] != "Noutăți") && (items[y].children[0] != "Canale") && (items[y].children[0] != "Emisiuni")) {
                viewItems.add(
                    items[y].children[0],
                    LinkButton.component(
                        {
                            icon: items[y].attrs.model.data.attributes.icon,
                            href: '/press/t/' + items[y].attrs.model.data.attributes.slug,
                            className: 'Button Button--primary',
                            itemClassName: 'App-primaryControl',
                        },
                        items[y].children[0]
                    )
                );
            }
        }







        /* items.add(
            'jumbotron',
            Button.component({
                className: 'Button fof-upload-button Button--icon',
                icon: 'fas fa-folder-open',
                title: app.translator.trans('fof-upload.forum.buttons.media'),
            })) */






        // Удаление кнопки сортировки
        /* if (items.has('sort')) {
            items.remove('sort');
        } */
        // Добавляем блок jumbotron сверху
        /* items.add(
            'jumbotron',
            <div class="jumbotron_class"></div>) */
        // Добавляем текст сверху
        /* items.add(
            'Text_title_center_block',
            <p class="Text_title_center_block_class"><span> {app.translator.trans('digi-ui.forum.what_is_new')}</span></p>) */
    });











    /* override(IndexPage.prototype, 'view', function () {
        return (
            <div className="IndexPage">
                {this.hero()}
                <div className="container">
                    <div className="sideNavContainer">
                        <nav className="IndexPage-nav sideNav">
                            <ul>{listItems(this.sidebarItems().toArray())}</ul>
                        </nav>
                        <div className="IndexPage-results sideNavOffset">
                            <div className="IndexPage-toolbar">
                                <ul className="IndexPage-toolbar-view">{listItems(this.viewItems().toArray())}</ul>
                                <ul className="IndexPage-toolbar-action">{listItems(this.actionItems().toArray())}</ul>
                            </div>
                            <DiscussionList state={app.discussions} />
                        </div>
                    </div>
                </div>
            </div>)
    }) */



}