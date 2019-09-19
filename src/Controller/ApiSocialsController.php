<?php

namespace App\Controller;

use App\Entity\Social;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ApiSocialsController extends AbstractController
{
    /**
     * @Route("/api/socials", name="api_socials")
     */
    public function editSocial(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        if($request->request->get('method') === 'delete') {

            $social = $em->getRepository(Social::class)->find(
                $request->request->get('id')
            );

            $em->remove($social);
            $em->flush();
        }
        else if($request->request->get('method') === 'new') {
            $social = new Social();
            $social->setIcon($request->request->get('iconValue'));
            $social->setName($request->request->get('nameValue'));
            $social->setUrl($request->request->get('urlValue'));

            $em->persist($social);
            $em->flush();
        }

        return new JsonResponse([
            'message' => 'OK'
        ]);
    }
}
