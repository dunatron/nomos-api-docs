<?php

namespace MyOrg\Model;

use SilverStripe\GraphQL\Scaffolding\Interfaces\ResolverInterface;

class UpdateCodeExampleResolver implements ResolverInterface
{
    public function resolve($object, $args, $context, $info)
    {
        $codeExample = CodeExample::get()->byID($args['ID']);

        if ($codeExample->canEdit()) {
            $codeExample->MethodID = $args['NewMethodID'];
            $codeExample->LanguageName = $args['NewLanguageName'];
            $codeExample->CodeSample = $args['NewCodeSample'];
            $codeExample->write();
        }

        return $codeExample;
    }
}