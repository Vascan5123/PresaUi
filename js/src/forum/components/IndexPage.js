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


        let items = IndexPage.prototype.sidebarItems().items.nav.content.children;

        for (let i = 0; i < items.length; i++) {
            if (items[i].itemName === "separator") {
                items.splice(0, i + 1);
            }
        }

        for (let y = 0; y < items.length; y++) {
            if ((items[y].children[0] != "Noutăți") && (items[y].children[0] != "Canale") && (items[y].children[0] != "Emisiuni") && (!items[y].attrs.model.data.attributes.isChild)) {
                viewItems.add(
                    items[y].children[0],
                    LinkButton.component(
                        {
                            icon: items[y].attrs.model.data.attributes.icon,
                            href: '/press/t/' + items[y].attrs.model.data.attributes.slug,
                            className: 'Button Button--primary tags_center',
                            itemClassName: 'App-primaryControl',
                        },
                        items[y].children[0]
                    )
                );
            }
        }
    });








}