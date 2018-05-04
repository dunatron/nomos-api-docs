<?php
namespace MyOrg\Model;

use SilverStripe\ORM\Connect\MySQLSchemaManager;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use SilverStripe\ORM\DataObject;
use SilverStripe\Assets\Image;
use SilverStripe\Security\Member;


class CodeExample extends DataObject
{
    private static $db = [
        'Title' => 'Varchar(255)',
        'CodeSample' => 'Text'
    ];

    private static $has_one = [
        'ApiMethod' => ApiMethod::class
    ];

    private static $default_sort = 'Created DESC';

    public function canView($member = null)
    {
        return true;
    }

    public function onAfterWrite()
    {
        parent::onAfterWrite();
    }

}