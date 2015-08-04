<?php

namespace AppBundle\Document;

use JMS\Serializer\Annotation as JMS;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class <%= resourceName %>
 * @package AppBundle\Document
 *
 * @MongoDB\Document
 * @JMS\ExclusionPolicy("all")
 *
 */
class <%= resourceName %>
{
    /**
     * @MongoDB\Id
     * @Assert\Type(type="string")
     * @JMS\Expose
     * @JMS\Type("string")
     */
    protected $id;

    /**
     * @MongoDB\String
     * @Assert\Type(type="string")
     * @Assert\NotBlank
     * @JMS\Expose
     * @JMS\Type("string")
     *
     */
    protected $name;

    public function getId()
    {
        return $this->id;
    }

    public function setName($v)
    {
        $this->name = $v;
    }

    public function getName()
    {
        return $this->name;
    }



}