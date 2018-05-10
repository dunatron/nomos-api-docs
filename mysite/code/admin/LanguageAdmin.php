<?php
namespace MyOrg\Controller;
use MyOrg\Model\Language;
use SilverStripe\Admin\ModelAdmin;

class LanguageAppAdmin extends ModelAdmin
{
    private static $managed_models = [
        Language::class,
    ];
    private static $url_segment = 'languages';
    private static $menu_title = 'Languages';
}