<?php
namespace MyOrg\Model;

use SilverStripe\ORM\DataObject;

class Category extends DataObject
{
    private static $db = [
        'Name' => 'Varchar(255)',
    ];

    private static $has_many = [
        'Methods' => Method::class,
    ];

    private static $default_sort = 'Created DESC';

    public function canView($member = null)
    {
        return true;
    }

}