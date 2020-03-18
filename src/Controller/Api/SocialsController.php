<?php

namespace App\Controller\Api;

use App\Entity\Social;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/api/socials")
 */
class SocialsController extends AbstractController
{
    /**
     * @var ValidatorInterface $validator
     */
    private $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

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
     * @return JsonResponse
     */
    public function addSocial(Request $request)
    {
        $data = $request->getContent();
        $data = json_decode($data, true);

        $em = $this->getDoctrine()->getManager();

        $social = new Social();
        $social->setIcon($data['icon'])
            ->setName($data['name'])
            ->setUrl($data['url']);

        $formErrors = $this->validateSocialObject($social);
        if(!empty($formErrors))
            return new JsonResponse(['errors' => $formErrors], 400);

        $em->persist($social);
        $em->flush();

        return new JsonResponse($social, 201);
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

        return new JsonResponse();
    }

    /**
     * @Route("/{id}/edit", name="api_socials_edit", methods={"PATCH"})
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function editSocial(Request $request, int $id)
    {
        $data = $request->getContent();
        $data = json_decode($data, true);

        $em = $this->getDoctrine()->getManager();

        $socialValidate = new Social();

        $socialValidate->setName($data['name'])
            ->setUrl($data['url'])
            ->setIcon($data['icon']);

        $formErrors = $this->validateSocialObject($socialValidate);
        if (!empty($formErrors)) {
            return new JsonResponse(['errors' => $formErrors], 400);
        }

        $social = $em->getRepository(Social::class)->findOneBy([
            'id' => $id
        ]);

        $social->setName($data['name'])
            ->setUrl($data['url'])
            ->setIcon($data['icon']);

        $em->flush();

        return new JsonResponse();
    }

    private function validateSocialObject(Social $social)
    {
        $errors = [];
        $violations = $this->validator->validate($social);
        if (count($violations) > 0) {
            foreach ($violations as $violation) {
                $errors[] = [
                    'message' => $violation->getMessage(),
                    'propertyPath' => $violation->getPropertyPath()
                ];
            }
        }
        return $errors;
    }
}
