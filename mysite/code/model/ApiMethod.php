<?php
namespace MyOrg\Model;

use SilverStripe\ORM\Connect\MySQLSchemaManager;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use SilverStripe\ORM\DataObject;
use SilverStripe\Assets\Image;
use SilverStripe\Security\Member;


class ApiMethod extends DataObject implements ScaffoldingProvider
{
    private static $db = [
        'Title' => 'Varchar(255)',
        'httpRequest' => 'Varchar(255)'
    ];

    private static $has_one = [
        'Category' => Category::class
    ];

    private static $has_many = [
        'CodeExamples' => CodeExample::class,
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

    public function provideGraphQLScaffolding(SchemaScaffolder $scaffolder)
    {
        $scaffolder
            ->query('getSingleApiMethod', __CLASS__)
            ->addArgs([
                'ID' => 'ID!'
            ])
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info){
                $event = self::get()->byID($args['ID']);
                if (!$event) {
                    throw new \InvalidArgumentException(sprintf(
                        'Event #%s does not exist',
                        $args['ID']
                    ));
                }
                $params = [
                    'ID' => $event->ID
                ];
                return $event;
            })
            ->setUsePagination(false)
            ->end();



        return $scaffolder;
    }
}