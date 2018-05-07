<?php
namespace MyOrg\Model;

use SilverStripe\ORM\Connect\MySQLSchemaManager;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\ORM\DataObject;
use SilverStripe\Assets\Image;
use SilverStripe\Security\Member;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\DateField;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\NumericField;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Forms\TimeField;
use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TabSet;
use SilverStripe\Forms\Tab;
use SilverStripe\Forms\HeaderField;
use SilverStripe\Forms\FieldGroup;
use SilverStripe\Forms\ReadonlyField;

class QueryParam extends DataObject
{
    private static $db = [
        'Parameter' => 'Varchar(255)',
        'Description' => 'Text'
    ];

    private static $has_one = [
        'Method' => Method::class,
    ];

    private static $default_sort = 'Created DESC';

    public function canView($member = null)
    {
        return true;
    }

}