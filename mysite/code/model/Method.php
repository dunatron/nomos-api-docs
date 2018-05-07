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

class Method extends DataObject implements ScaffoldingProvider
{
    private static $db = [
        'Name' => 'Varchar(255)',
        'Description' => 'Text', 
        'HttpRequest' => 'Varchar(255)',
        'PermittedCall' => 'Text',
    ];

    private static $has_one = [
        'Category' => Category::class,
    ];

    private static $has_many =[
        'CodeExamples' => CodeExample::class,
        'QueryParams' => QueryParam::class
    ];

    private static $default_sort = 'Created DESC';

    public function canView($member = null)
    {
        return true;
    }

    public function provideGraphQLScaffolding(SchemaScaffolder $scaffolder)
    {
        $scaffolder
            ->query('getSingleMethod', __CLASS__)
            ->addArgs([
                'ID' => 'ID!'
            ])
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info){
                $method = self::get()->byID($args['ID']);
                //$method->CodeExamples();
                return $method;
            })
            ->setUsePagination(false)
            ->end();

        return $scaffolder;
    }

}