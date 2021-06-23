import app from 'flarum/common/app';
import { extend, override } from 'flarum/extend';
import Button from 'flarum/components/Button';
import Dropdown from 'flarum/components/Dropdown';
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

        console.log(app.store.all('tags'))

        for (let i = 0; i < app.store.all('tags').length; i++) {
            let id = -1;
            switch (app.store.all('tags')[i].data.attributes.name) {
                case "Noutăți":
                    id = app.store.all('tags')[i].data.id;
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


                    if (app.store.all('tags')[i].data.relationships) {
                        if (app.store.all('tags')[i].data.relationships.children) {

                            for (let x = 0; x < app.store.all('tags')[i].data.relationships.children.data.length; x++) {

                                let id_tag_children = app.store.all('tags')[i].data.relationships.children.data[x].id;
                                /* console.log(id_tag_children); */

                                for (let z = 0; z < app.store.all('tags').length; z++) {
                                    if (app.store.all('tags')[z].data.id == id_tag_children) {
                                        sidebarItems.add(
                                            app.store.all('tags')[z].data.attributes.name,
                                            LinkButton.component(
                                                {
                                                    icon: app.store.all('tags')[z].data.attributes.icon,
                                                    href: 't/' + app.store.all('tags')[z].data.attributes.slug,
                                                    className: 'Button Button--primary tags_left_child',
                                                    itemClassName: 'App-primaryControl',
                                                },
                                                app.store.all('tags')[z].data.attributes.name
                                            ),
                                        );
                                    }
                                }
                            }
                        }
                    }




                    break;
                case "Canale":
                    id = app.store.all('tags')[i].data.id;
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


                    if (app.store.all('tags')[i].data.relationships) {
                        if (app.store.all('tags')[i].data.relationships.children) {

                            for (let x = 0; x < app.store.all('tags')[i].data.relationships.children.data.length; x++) {

                                let id_tag_children = app.store.all('tags')[i].data.relationships.children.data[x].id;
                                /* console.log(id_tag_children); */

                                for (let z = 0; z < app.store.all('tags').length; z++) {
                                    if (app.store.all('tags')[z].data.id == id_tag_children) {
                                        sidebarItems.add(
                                            app.store.all('tags')[z].data.attributes.name,
                                            LinkButton.component(
                                                {
                                                    icon: app.store.all('tags')[z].data.attributes.icon,
                                                    href: '/t/' + app.store.all('tags')[z].data.attributes.slug,
                                                    className: 'Button Button--primary tags_left_child',
                                                    itemClassName: 'App-primaryControl',
                                                },
                                                app.store.all('tags')[z].data.attributes.name
                                            ),
                                        );
                                    }
                                }
                            }
                        }
                    }






                    break;
                case "Emisiuni":
                    id = app.store.all('tags')[i].data.id;
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

                    if (app.store.all('tags')[i].data.relationships) {
                        if (app.store.all('tags')[i].data.relationships.children) {

                            for (let x = 0; x < app.store.all('tags')[i].data.relationships.children.data.length; x++) {

                                let id_tag_children = app.store.all('tags')[i].data.relationships.children.data[x].id;
                                /* console.log(id_tag_children); */

                                for (let z = 0; z < app.store.all('tags').length; z++) {
                                    if (app.store.all('tags')[z].data.id == id_tag_children) {
                                        sidebarItems.add(
                                            app.store.all('tags')[z].data.attributes.name,
                                            LinkButton.component(
                                                {
                                                    icon: app.store.all('tags')[z].data.attributes.icon,
                                                    href: '/t/' + app.store.all('tags')[z].data.attributes.slug,
                                                    className: 'Button Button--primary tags_left_child',
                                                    itemClassName: 'App-primaryControl',
                                                },
                                                app.store.all('tags')[z].data.attributes.name
                                            ),
                                        );
                                    }
                                }
                            }
                        }
                    }


                    break;
                default:
                    break;
            }




            if (id != -1) {
                /* console.log(i)
                console.log(app.store.all('tags')[i]) */
                /* if(app.store.all('tags')[id].data){

                } */








                /* switch (app.store.all('tags')[i++].data.attributes.name) {
                    case i++:
                        sidebarItems.add(
                            app.store.all('tags')[i++].data.attributes.name,
                            LinkButton.component(
                                {
                                    icon: app.store.all('tags')[i++].data.attributes.icon,
                                    href: 't/' + app.store.all('tags')[i++].data.attributes.slug,
                                    className: 'Button Button--primary tags_left',
                                    itemClassName: 'App-primaryControl',
                                },
                                app.store.all('tags')[i++].data.attributes.name
                            ),
                        );
                        break;
                    default:
                        break;
                } */
            }

        }
        /* console.log(sidebarItems.items) */

    });
    extend(IndexPage.prototype, 'viewItems', function (viewItems) {

        /* if (viewItems.has('sort')) {
            viewItems.remove('sort');
        } */

        const sortOptions = {};

        const sortMap = app.discussions.sortMap();

        viewItems.add(
            'sort2',
            Dropdown.component(
              {
                buttonClassName: 'Button',
                label: "An",
                accessibleToggleLabel: "An",
              },
              Object.keys(sortOptions).map((value) => {
                const label = sortOptions[value];
                const active = (app.search.params().sort || Object.keys(sortMap)[0]) === value;
      
                return Button.component(
                  {
                    icon: active ? 'fas fa-check' : true,
                    onclick: app.search.changeSort.bind(app.search, value),
                    active: active,
                  },
                  "An"
                );
              })
            )
          );


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
                            href: '/t/' + items[y].attrs.model.data.attributes.slug,
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