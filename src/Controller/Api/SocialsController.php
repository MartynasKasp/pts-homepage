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
 * @Route("/api/socials")
 */
class SocialsController extends AbstractController
{
    /**
     * @Route("/", name="api_socials_get", methods={"GET"})
     */
    public function getSocials()
    {
        $em = $this->getDoctrine()->getManager();

        $socials = $em->getRepository(Social::class)->findAll();

        $allSocials = [];
        foreach ($socials as $social) {
            $allSocials[] = [
                'id' => $social->getId(),
                'name' => $social->getName(),
                'url' => $social->getUrl(),
                'icon' => $social->getIcon()
            ];
        }

        return new JsonResponse($allSocials);
    }

    /**
     * @Route("/add", name="api_socials_add", methods={"POST"})
     * @param Request $request
     * @param ValidatorInterface $validator
     * @return JsonResponse
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
            return new JsonResponse($formErrors, 400);

        $em->persist($social);
        $em->flush();

        $data['id'] = $social->getId();

        return new JsonResponse([
            'message' => 'OK',
            'item' => $data
        ]);
    }

    /**
     * @Route("/{id}/delete", name="api_socials_delete", methods={"DELETE"})
     * @param int $id
     * @return JsonResponse
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
     * @Route("/{id}/edit", name="api_socials_edit", methods={"PATCH"})
     * @param Request $request
     * @param ValidatorInterface $validator
     * @param int $id
     * @return JsonResponse
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
        if (!empty($formErrors))
            return new JsonResponse($formErrors, 400);

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
