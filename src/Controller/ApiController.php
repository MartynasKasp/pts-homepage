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
    public function emailSend(Request $request, \Swift_Mailer $mailer)
    {
        $data = $request->getContent();
        $data = json_decode($data, true);

        if(empty($data)) {
            return new JsonResponse([
                'error' => 'ERROR'
            ]);
        }

        $message = (new \Swift_Message('Nauja žinutė iš portfolio'))
            ->setFrom($data['email'])
            ->setTo('martis.kasparavicius@gmail.com')
            ->setBody(
                $this->renderView(
                    'emails/contact_message.html.twig',
                    [
                        'message' => $data['message'],
                        'name' => $data['name']
                    ]
                ),
                'text/html'
            );

        if(!$mailer->send($message)) {
            return new JsonResponse([
                'errorMessage' => 'Kažkas įvyko neteisingai, Jūsų žinutė nebuvo išsiųsta!'
            ]);
        }

        return new JsonResponse([
            'successMessage' => 'Jūsų žinutė išsiųsta sėkmingai!'
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
