import app from 'flarum/common/app';
import { extend, override } from 'flarum/extend';
import DiscussionHero from 'flarum/components/DiscussionHero'

export default function () {

    extend(DiscussionHero.prototype, 'items', function (items1) {
        if (items1.items.tags) {
            let lengthTags = items1.items.tags.content.children.length;
            /* console.log(items1.items.tags.content.children) */

            for (let i = 0; i < lengthTags; i++) {
                let text = items1.items.tags.content.children[i].children[0].children[2].children

                if ((text == "Canale") || (text == "An") || (text == "Luna") || (text == "Zi")) {
                    items1.items.tags.content.children[i].attrs.className += " d-none"
                    console.log(items1.items.tags.content.children[i].attrs.className)

                }
                /* console.log(items1.items.tags.content.children[i].children[0].children[2].children) */
            }

        }
    });





















}