<?php
namespace MyOrg\Model;

use SilverStripe\ORM\Connect\MySQLSchemaManager;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use SilverStripe\ORM\DataObject;
use SilverStripe\Assets\Image;
use SilverStripe\Security\Member;


class CodeExample extends DataObject implements ScaffoldingProvider
{
    private static $db = [
        'LanguageName' => 'Varchar(255)',
        'CodeSample' => 'Text'
    ];

    private static $has_one = [
        'Method' => Method::class, 
    ];

    private static $default_sort = 'Created DESC';

    public function canView($member = null)
    {
        return true;
    }

    public function canCreate($member = null, $context = array())
    {
//        $extended = $this->extendedCan(__FUNCTION__, $member, $context);
//        if ($extended !== null) {
//            return $extended;
//        }
//        return Permission::check('ADMIN', 'any', $member);
        return true;
    }

    public function onAfterWrite()
    {
        parent::onAfterWrite();
    }

    public function provideGraphQLScaffolding(SchemaScaffolder $scaffolder)
    {
        $scaffolder
            ->query('readCodeExamples', __CLASS__)
            ->addArgs([
                //'ID' => 'ID!'
            ])
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info){
                $codeExamples = self::get();
                return $codeExamples;
            })
            ->setUsePagination(false)
            ->end();

        return $scaffolder;
    }

}