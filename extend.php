<?php

/*
 * This file is part of vascan/presa-ui.
 *
 * Copyright (c) 2021 Lupan Vasile.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Vascan\PresaUi;

use Flarum\Extend;
use s9e\TextFormatter\Configurator;


return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),
    new Extend\Locales(__DIR__ . '/resources/locale'),
    (new Extend\Formatter)
        ->configure(function(Configurator $config) {
            $config->BBCodes->addCustom(
                '[video]{TEXT}[/video]',
                '[video]{TEXT}[/video]'
            );
            $config->BBCodes->addCustom(
                '[text]{TEXT}[/text]',
                '[text]{TEXT}[/text]'
            );
            $config->BBCodes->addCustom(
                '[transcript]{TEXT}[/transcript]',
                '[transcript]{TEXT}[/transcript]'
            );
        })
    
];
