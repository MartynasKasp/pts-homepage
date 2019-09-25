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
        return $this->render('landing_page/index.html.twig', [
            'page_title' => 'Welcome to my CV!'
        ]);
    }
    /**
     * @Route("/contact", name="app_contact")
     */
    public function contact()
    {
        return $this->index();
    }
}