<?php

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\ExceptionController;
use Symfony\Component\Debug\Exception\FlattenException as DebugFlattenException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Log\DebugLoggerInterface;

/**
 * Class ErrorController
 *
 * The built in exception handling always returns HTML responses, fixing this to return in JSON format.
 */
class ErrorController extends ExceptionController
{
    /**
     * @param Request                   $request
     * @param DebugFlattenException     $exception
     * @param DebugLoggerInterface|null $logger
     * @return JsonResponse
     */
    public function showAction(Request $request, $exception, DebugLoggerInterface $logger = null)
    {
        $request->setRequestFormat('json');
        return parent::showAction($request, $exception, $logger);
    }
}
