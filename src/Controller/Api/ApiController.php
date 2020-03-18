<?php

namespace App\Controller\Api;

use App\Entity\Social;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
* @Route("/api")
*/
class ApiController extends AbstractController
{
    /**
     * @Route("/email/send", name="api_email_send", methods={"POST"})
     * @param Request $request
     * @param \Swift_Mailer $mailer
     * @return JsonResponse
     */
    // TODO: create symfony form
    public function emailSend(Request $request, \Swift_Mailer $mailer)
    {
        $data = $request->getContent();
        $data = json_decode($data, true);

        if(empty($data)) {
            return new JsonResponse([
                'error' => 'ERROR'
            ], 400);
        }

        $data['message'] = strip_tags($data['message']);

        $formErrors = [];
        if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $formErrors['emailError'] = 'Privalote įvesti galiojantį el. pašto adresą.';
        }

        if(empty($data['name'])) {
            $formErrors['nameError'] = 'Privalote įvesti savo vardą.';
        }
        else if(strlen($data['name']) < 5) {
            $formErrors['nameError'] = 'Pateiktas vardas yra per trumpas.';
        }
        else if(strlen($data['name']) > 30) {
            $formErrors['nameError'] = 'Pateiktas vardas yra per ilgas.';
        }

        if(empty($data['message'])) {
            $formErrors['messageError'] = 'Privalote įvesti žinutę.';
        }
        else if(strlen($data['message']) > 1000) {
            $formErrors['messageError'] = 'Įvestas per ilgas žinutės tekstas.';
        }

        if(!empty($formErrors)) {
            return new JsonResponse(['errors' => $formErrors], 400);
        }

        $users = $this->getDoctrine()->getRepository(User::class)->findAll();

        $targetEmails = [];
        foreach($users as $user) {
            $targetEmails[] = $user->getEmail();
        }

        // TODO: create mailer service
        $message = (new \Swift_Message('Nauja žinutė iš portfolio'))
            ->setFrom($data['email'])
            ->setTo($targetEmails)
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
                'response' => 'Kažkas įvyko neteisingai, Jūsų žinutė nebuvo išsiųsta!'
            ], 400);
        }

        return new JsonResponse([
            'response' => 'Jūsų žinutė išsiųsta sėkmingai!'
        ]);
    }
}
