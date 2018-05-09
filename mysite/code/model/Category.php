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

        /**
     * @param Member $member
     * @param array $context Additional context-specific data which might
     * affect whether (or where) this object could be created.
     * @return boolean
     */
    public function canCreate($member = null, $context = array())
    {
//        $extended = $this->extendedCan(__FUNCTION__, $member, $context);
//        if ($extended !== null) {
//            return $extended;
//        }
//        return Permission::check('ADMIN', 'any', $member);
        return true;
    }

}