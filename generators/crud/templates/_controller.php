<?php

namespace AppBundle\Controller;

use AppBundle\Document\<%= resourceName %>;
use AppBundle\Form\<%= resourceName %>Type;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use FOS\RestBundle\View\View,
    FOS\RestBundle\View\ViewHandler,
    FOS\RestBundle\View\RouteRedirectView;

use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\Routing\Route;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
* Class <%= pluralResourceName %>Controller
* @package AppBundle\Controller
*/

class <%= pluralResourceName %>Controller extends Controller
{
    /**
     * @param Request $request
     */
    public function createAction(Request $request)
    {
        $form = $this->createForm(new <%= resourceName %>Type(), new <%= resourceName %>());

        $form->handleRequest($request);
        if ($form->isValid()) {

            $<%= resourceNameLower %> = $form->getData();

            $dm = $this->get('doctrine_mongodb')->getManager();
            $dm->persist($<%= resourceNameLower %>);
            $dm->flush();

            $view = View::create($<%= resourceNameLower %>);
        }
        else {
            $view = View::create($form);
            $view->setStatusCode(400);
        }

        return $this->get('fos_rest.view_handler')->handle($view);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function showAction($id) {

        /** @var DocumentManager $dm */
        $dm = $this->get('doctrine_mongodb')->getManager();

        /** @var <%= resourceName %> $<%= resourceNameLower %>*/
        $<%= resourceNameLower %> = $dm->find('AppBundle:<%= resourceName %>', $id);

        if($<%= resourceNameLower %>) {
            $view = View::create($<%= resourceNameLower %>);
        }
        else {
            $view = View::create(array("message" => "<%= resourceName %> not found"), Response::HTTP_NOT_FOUND);
        }

        return $this->get('fos_rest.view_handler')->handle($view);
    }

    /**
     * @param $id
     * @param Request $request
     * @return mixed
     */
    public function updateAction($id, Request $request)
    {
        /** @var DocumentManager $dm */
        $dm = $this->get('doctrine_mongodb')->getManager();

        /** @var <%= resourceName %> $<%= resourceNameLower %>*/
        $<%= resourceNameLower %> = $dm->find('AppBundle:<%= resourceName %>', $id);

        if(!$<%= resourceNameLower %>) {
            throw new NotFoundHttpException("<%= resourceName %> not found");
        }

        $form = $this->createForm(new <%= resourceName %>Type(), $<%= resourceNameLower %>, array("method" => "PUT"));
        $form->handleRequest($request);

        if($form->isValid()) {
            /** @var <%= resourceName %> $<%= resourceNameLower %>*/
            $<%= resourceNameLower %> = $form->getData();
            $dm->persist($<%= resourceNameLower %>);
            $dm->flush();

            $view = View::create($<%= resourceNameLower %>);
        }
        else {
            $view = View::create($form, Response::HTTP_BAD_REQUEST);
        }

        return $this->get('fos_rest.view_handler')->handle($view);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function deleteAction($id)
    {

        /** @var DocumentManager $dm */
        $dm = $this->get('doctrine_mongodb')->getManager();

        $<%= resourceNameLower %> = $dm->find('AppBundle:<%= resourceName %>', $id);
        if($<%= resourceNameLower %>) {
            $dm->remove($<%= resourceNameLower %>);
            $dm->flush();
            $view = View::create(array("message" => "<%= resourceName %> $id removed "));
        }
        else {
            $view = View::create(array("message" => "<%= resourceName %> $id not found"), Response::HTTP_NOT_FOUND);
        }

        return $this->get('fos_rest.view_handler')->handle($view);
    }

    /**
     * @return mixed
     */
    public function listAction() {

        /** @var DocumentManager $dm */
        $dm = $this->get('doctrine_mongodb')->getManager();

        /** @var <%= resourceName %> $<%= resourceNameLower %>*/
        $<%= pluralResourceNameLower %> = $dm->getRepository('AppBundle:<%= resourceName %>')->findAll();

        $view = View::create($<%= pluralResourceNameLower %>);
        return $this->get('fos_rest.view_handler')->handle($view);
    }
}
