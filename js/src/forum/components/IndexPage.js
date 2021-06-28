import app from 'flarum/common/app';
import { extend, override } from 'flarum/extend';
import Button from 'flarum/components/Button';
import Dropdown from 'flarum/components/Dropdown';
import LinkButton from 'flarum/components/LinkButton';
import IndexPage from 'flarum/components/IndexPage';
import DiscussionList from 'flarum/components/DiscussionList';
import listItems from 'flarum/helpers/listItems';

export default function () {

    extend(IndexPage.prototype, 'sidebarItems', async function (sidebarItems) {

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
                    itemClassName: '',
                },
                "E-Moldova"
            ),
        );

        for (let i = 0; i < app.store.all('tags').length; i++) {
            let id = -1;
            const sortMap = app.discussions.sortMap();

            switch (app.store.all('tags')[i].data.attributes.name) {
                case "Noutăți":
                    id = app.store.all('tags')[i].data.id;
                    sidebarItems.add(
                        app.store.all('tags')[i].data.attributes.name,
                        LinkButton.component(
                            {
                                icon: app.store.all('tags')[i].data.attributes.icon,
                                href: '/t/' + app.store.all('tags')[i].data.attributes.slug,
                                className: 'Button Button--primary tags_left',
                                itemClassName: '',
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
                                                    itemClassName: '',
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


                    let sortOptionsCanale = [];

                    if (app.store.all('tags')[i].data.relationships) {
                        if (app.store.all('tags')[i].data.relationships.children) {

                            for (let x = 0; x < app.store.all('tags')[i].data.relationships.children.data.length; x++) {

                                let id_tag_children = app.store.all('tags')[i].data.relationships.children.data[x].id;

                                let title_tag_children;
                                let href_tag_children;

                                for (let z = 0; z < app.store.all('tags').length; z++) {
                                    if (app.store.all('tags')[z].data.id == id_tag_children) {
                                        title_tag_children = app.store.all('tags')[z].data.attributes.name;
                                        href_tag_children = app.store.all('tags')[z].data.attributes.slug;
                                    }
                                }
                                let params = {
                                    name: title_tag_children,
                                    href: href_tag_children
                                }
                                sortOptionsCanale.push(params);

                            }
                        }
                    }



                    if (!sidebarItems.has(app.store.all('tags')[i].data.attributes.name)) {
                        id = app.store.all('tags')[i].data.id;
                        sidebarItems.add(
                            app.store.all('tags')[i].data.attributes.name,
                            Dropdown.component(
                                {
                                    icon: app.store.all('tags')[i].data.attributes.icon,
                                    buttonClassName: 'Button Button--primary tags_left',
                                    label: "Canale",
                                    accessibleToggleLabel: "Canale",
                                },
                                Object.keys(sortOptionsCanale).map((value) => {
                                    const label = sortOptionsCanale[value];
                                    const active = (app.search.params().sort || Object.keys(sortMap)[0]) === value;

                                    return LinkButton.component(
                                        {
                                            icon: active ? 'fas fa-check' : true,
                                            href: '/t/' + label.href,
                                            active: active,
                                        },
                                        label.name
                                    );
                                })
                            )
                        );
                    }
                    break;
                case "Emisiuni":

                    let sortOptionsEmisiuni = [];

                    if (app.store.all('tags')[i].data.relationships) {
                        if (app.store.all('tags')[i].data.relationships.children) {

                            for (let x = 0; x < app.store.all('tags')[i].data.relationships.children.data.length; x++) {

                                let id_tag_children = app.store.all('tags')[i].data.relationships.children.data[x].id;

                                let title_tag_children;
                                let href_tag_children;

                                for (let z = 0; z < app.store.all('tags').length; z++) {
                                    if (app.store.all('tags')[z].data.id == id_tag_children) {
                                        title_tag_children = app.store.all('tags')[z].data.attributes.name;
                                        href_tag_children = app.store.all('tags')[z].data.attributes.slug;
                                    }
                                }
                                let params = {
                                    name: title_tag_children,
                                    href: href_tag_children
                                }
                                sortOptionsEmisiuni.push(params);

                            }
                        }
                    }



                    if (!sidebarItems.has(app.store.all('tags')[i].data.attributes.name)) {
                        id = app.store.all('tags')[i].data.id;
                        sidebarItems.add(
                            app.store.all('tags')[i].data.attributes.name,
                            Dropdown.component(
                                {
                                    icon: app.store.all('tags')[i].data.attributes.icon,
                                    buttonClassName: 'Button Button--primary tags_left',
                                    label: "Emisiuni",
                                    accessibleToggleLabel: "Emisiuni",
                                },
                                Object.keys(sortOptionsEmisiuni).map((value) => {
                                    const label = sortOptionsEmisiuni[value];
                                    const active = (app.search.params().sort || Object.keys(sortMap)[0]) === value;

                                    return LinkButton.component(
                                        {
                                            icon: active ? 'fas fa-check' : true,
                                            href: '/t/' + label.href,
                                            active: active,
                                        },
                                        label.name
                                    );
                                })
                            )
                        );
                    }
                    break;
                default:
                    break;
            }



        }
        var tags = await app.tagList.load(['children', 'lastPostedDiscussion', 'parent']).then(() => {
            return app.store.all('tags');
        });
        /* console.log(tags) */












    });
    extend(IndexPage.prototype, 'viewItems', function (viewItems) {

        if (viewItems.has('sort')) {
            viewItems.remove('sort');
        }



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
                            itemClassName: '',
                        },
                        items[y].children[0]
                    )
                );
            }
        }
    });

    extend(IndexPage.prototype, 'actionItems', function (items) {

        const sortMap = app.discussions.sortMap();

        /* const sortOptionsAn = [
            "2021",
            "2020",
            "2019",
            "2018",
            "2017",
            "2016",
            "2015",
            "2014",
            "2013",
            "2012",
            "2011",
            "2010",
        ]; */

        let sortOptionsAn = [];

        for (let i = 0; i < app.store.all('tags').length; i++) {
            let id = -1;
            const sortMap = app.discussions.sortMap();

            switch (app.store.all('tags')[i].data.attributes.name) {
                case "An":
                    if (app.store.all('tags')[i].data.relationships) {
                        if (app.store.all('tags')[i].data.relationships.children) {

                            for (let x = 0; x < app.store.all('tags')[i].data.relationships.children.data.length; x++) {

                                let id_tag_children = app.store.all('tags')[i].data.relationships.children.data[x].id;

                                let title_tag_children;
                                let href_tag_children;

                                for (let z = 0; z < app.store.all('tags').length; z++) {
                                    if (app.store.all('tags')[z].data.id == id_tag_children) {
                                        title_tag_children = app.store.all('tags')[z].data.attributes.name;
                                        href_tag_children = app.store.all('tags')[z].data.attributes.slug;
                                    }
                                }
                                let params = {
                                    name: title_tag_children,
                                    href: href_tag_children
                                }
                                sortOptionsAn.push(params);

                            }
                        }
                    }

                    items.add(
                        app.store.all('tags')[i].data.attributes.name,
                        Dropdown.component(
                            {
                                icon: app.store.all('tags')[i].data.attributes.icon,
                                buttonClassName: 'Button Button--primary tags_center',
                                label: "An",
                                accessibleToggleLabel: "An",
                            },
                            Object.keys(sortOptionsAn).map((value) => {
                                const label = sortOptionsAn[value];
                                const active = (app.search.params().sort || Object.keys(sortMap)[0]) === value;

                                return LinkButton.component(
                                    {
                                        icon: active ? 'fas fa-check' : true,
                                        href: '/t/' + label.href,
                                        active: active,
                                    },
                                    label.name
                                );
                            })
                        )
                    );
                    break;
            }
        }

        

        const sortOptionsLuna = [
            "Ianuarie",
            "Februarie",
            "Martie",
            "Aprilie",
            "Mai",
            "Iunie",
            "Iulie",
            "August",
            "Septembrie",
            "Octombrie",
            "Noiembrie",
            "Decembrie",
        ];

        if (!items.has('Luna')) {
            items.add(
                'Luna',
                Dropdown.component(
                    {
                        buttonClassName: 'Button Button--primary tags_center',
                        label: "Luna",
                        accessibleToggleLabel: "Luna",
                    },
                    Object.keys(sortOptionsLuna).map((value) => {
                        const label = sortOptionsLuna[value];
                        const active = (app.search.params().sort || Object.keys(sortMap)[0]) === value;

                        return LinkButton.component(
                            {
                                icon: active ? 'fas fa-check' : true,
                                href: '/t/' + label,
                                active: active,
                            },
                            label
                        );
                    })
                )
            );
        }

        const sortOptionsZi = [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
            "31",
        ];

        if (!items.has('Zi')) {
            items.add(
                'Zi',
                Dropdown.component(
                    {
                        buttonClassName: 'Button Button--primary tags_center',
                        label: "Zi",
                        accessibleToggleLabel: "Zi",
                    },
                    Object.keys(sortOptionsZi).map((value) => {
                        const label = sortOptionsZi[value];
                        const active = (app.search.params().sort || Object.keys(sortMap)[0]) === value;

                        return LinkButton.component(
                            {
                                icon: active ? 'fas fa-check' : true,
                                href: '/t/' + label,
                                active: active,
                            },
                            label
                        );
                    })
                )
            );
        }

    });



}