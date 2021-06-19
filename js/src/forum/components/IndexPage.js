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
                "E-Moldova"
            ),
        );

        /* console.log(app.store.all('tags')) */

        for (let i = 0; i < app.store.all('tags').length; i++) {
            switch (app.store.all('tags')[i].data.attributes.name) {
                case "Noutăți":
                    sidebarItems.add(
                        app.store.all('tags')[i].data.attributes.name,
                        LinkButton.component(
                            {
                                icon: app.store.all('tags')[i].data.attributes.icon,
                                href: 't/' + app.store.all('tags')[i].data.attributes.slug,
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
                                href: 't/' + app.store.all('tags')[i].data.attributes.slug,
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
                                href: 't/' + app.store.all('tags')[i].data.attributes.slug,
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
        /* && (!items[y].attrs.model.data.attributes.isChild) */
        for (let y = 0; y < items.length; y++) {
            if ((items[y].children[0] != "Noutăți") && (items[y].children[0] != "Canale") && (items[y].children[0] != "Emisiuni") && (!items[y].attrs.model.data.attributes.isChild) && (items[y].children[0] != "An") && (items[y].children[0] != "Luna") && (items[y].children[0] != "Zi")) {
                viewItems.add(
                    items[y].children[0],
                    LinkButton.component(
                        {
                            icon: items[y].attrs.model.data.attributes.icon,
                            href: 't/' + items[y].attrs.model.data.attributes.slug,
                            className: 'Button Button--primary tags_center',
                            itemClassName: 'App-primaryControl',
                        },
                        items[y].children[0]
                    )
                );
            }
        }
    });

    extend(IndexPage.prototype, 'actionItems', function (items) {
        if (!items.has('An')) {
            items.add(
                'An',
                LinkButton.component(
                    {
                        href: '/t/' + 'an',
                        className: 'Button Button--primary tags_center',
                        itemClassName: 'App-primaryControl',
                    },
                    'An'
                )
            );
        }

        if (!items.has('Luna')) {
            items.add(
                'Luna',
                LinkButton.component(
                    {
                        href: '/t/' + 'luna',
                        className: 'Button Button--primary tags_center',
                        itemClassName: 'App-primaryControl',
                    },
                    'Luna'
                )
            );
        }

        if (!items.has('Zi')) {
            items.add(
                'Zi',
                LinkButton.component(
                    {
                        href: '/t/' + 'zi',
                        className: 'Button Button--primary tags_center',
                        itemClassName: 'App-primaryControl',
                    },
                    'Zi'
                )
            );
        }

    });



}