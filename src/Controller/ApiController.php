<?php

namespace App\Controller;

use App\Entity\Social;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ApiController extends AbstractController
{
    /**
     * @Route("/api/socials/add", name="api_socials_add")
     */
    public function addSocial(Request $request, ValidatorInterface $validator)
    {
        $data = $request->getContent();
        $data = json_decode($data, true);

        $em = $this->getDoctrine()->getManager();

        $social = new Social();
        $social->setIcon($data['icon'])
            ->setName($data['name'])
            ->setUrl($data['url']);

        $formErrors = $this->validateSocialObject($social, $validator);
        if(!empty($formErrors))
            return new JsonResponse($formErrors);

        $em->persist($social);
        $em->flush();

        $data['id'] = $social->getId();

        return new JsonResponse([
            'message' => 'OK',
            'item' => $data
        ]);
    }

    /**
     * @Route("/api/socials/delete/{id}", name="api_socials_delete")
     */
    public function deleteSocial(int $id)
    {
        $em = $this->getDoctrine()->getManager();

        $social = $em->getRepository(Social::class)->findOneBy([
            'id' => $id
        ]);

        $em->remove($social);
        $em->flush();

        return new JsonResponse([
            'message' => 'OK'
        ]);
    }

    /**
     * @Route("/api/socials/edit/{id}", name="api_socials_edit")
     */
    public function editSocial(Request $request, ValidatorInterface $validator, int $id)
    {
        $data = $request->getContent();
        $data = json_decode($data, true);

        $em = $this->getDoctrine()->getManager();

        $socialValidate = new Social();

        $socialValidate->setName($data['name'])
            ->setUrl($data['url'])
            ->setIcon($data['icon']);

        $formErrors = $this->validateSocialObject($socialValidate, $validator);
        if(!empty($formErrors))
            return new JsonResponse($formErrors);

        $social = $em->getRepository(Social::class)->findOneBy([
            'id' => $id
        ]);

        $social->setName($data['name'])
            ->setUrl($data['url'])
            ->setIcon($data['icon']);

        $em->flush();

        return new JsonResponse([
            'message' => 'OK'
        ]);
    }

    /**
     * @Route("/api/email/send", name="api_email_send")
     */
    public function emailSend(Request $request)
    {
        $data = $request->getContent();
        $data = json_decode($data, true);

        return new JsonResponse([
            'message' => 'OK'
        ]);
    }

    private function validateSocialObject(Social $social, ValidatorInterface $validator)
    {
        $nameError = $validator->validateProperty($social, 'name');
        $urlError = $validator->validateProperty($social, 'url');
        $iconError = $validator->validateProperty($social, 'icon');
        $formErrors = [];
        if(count($nameError) > 0)
            $formErrors['nameError'] = true;
        if(count($urlError) > 0)
            $formErrors['urlError'] = true;
        if(count($iconError) > 0)
            $formErrors['iconError'] = true;

        return $formErrors;
    }
}
