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
     * @Route("/api/socials/add", name="api_socials_add")
     */
    public function addSocial(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $social = new Social();
        $social->setIcon($request->request->get('icon'));
        $social->setName($request->request->get('name'));
        $social->setUrl($request->request->get('url'));

        $em->persist($social);
        $em->flush();

        return new JsonResponse([
            'message' => 'OK'
        ]);
    }

    /**
     * @Route("/api/socials/delete", name="api_socials_delete")
     */
    public function deleteSocial(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $social = $em->getRepository(Social::class)->find(
            $request->request->get('id')
        );

        $em->remove($social);
        $em->flush();

        return new JsonResponse([
            'message' => 'OK'
        ]);
    }

    /**
     * @Route("/api/socials/edit", name="api_socials_edit")
     */
    public function editSocial(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $social = $em->getRepository(Social::class)->find(
            $request->request->get('id')
        );

        $social->setName($request->request->get('name'));
        $social->setUrl($request->request->get('url'));
        $social->setIcon($request->request->get('icon'));

        $em->flush();

        return new JsonResponse([
            'message' => 'OK'
        ]);
    }
}
