<?php
namespace MyOrg\Controller;
use MyOrg\Model\ApiMethod;
use SilverStripe\Admin\ModelAdmin;

class ApiMethodAdmin extends ModelAdmin
{
    private static $managed_models = [
        ApiMethod::class,
    ];
    private static $url_segment = 'api-methods';
    private static $menu_title = 'API Methods';
}