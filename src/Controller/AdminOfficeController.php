<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

class AdminOfficeController extends Controller
{
    /**
     * @Route("/admin", name="app_adminOffice")
     * @IsGranted("ROLE_ADMIN")
     */
    public function index()
    {
        return $this->render('admin_office/index.html.twig', [
            'page_title' => 'Admin Back Office',
        ]);
    }
}
