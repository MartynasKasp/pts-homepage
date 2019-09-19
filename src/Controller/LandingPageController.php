<?php

namespace App\Controller;

use App\Entity\Social;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class LandingPageController extends AbstractController
{
    /**
     * @Route("/", name="app_main")
     */
    public function index()
    {
        $socialLinks = $this->getDoctrine()->getRepository(Social::class)->findAll();

        $repLogAppProps = [
            'socialLinks' => [],
        ];

        foreach($socialLinks as $socialLink) {
            $repLogAppProps['socialLinks'][] = [
                'id' => $socialLink->getId(),
                'name' => $socialLink->getName(),
                'url' => $socialLink->getUrl(),
                'icon' => $socialLink->getIcon()
            ];
        }

        return $this->render('landing_page/index.html.twig', [
            'page_title' => 'Welcome to my CV!',
            'repLogAppProps' => $repLogAppProps,
        ]);
    }
}
