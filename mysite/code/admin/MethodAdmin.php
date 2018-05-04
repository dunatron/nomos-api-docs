<?php
namespace MyOrg\Controller;
use MyOrg\Model\Method;
use SilverStripe\Admin\ModelAdmin;

class MethodAdmin extends ModelAdmin
{
    private static $managed_models = [
        Method::class,
    ];
    private static $url_segment = 'api-methods';
    private static $menu_title = 'API Methods';
}