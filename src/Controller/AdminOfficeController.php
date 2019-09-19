<?php

namespace App\Controller;

use App\Entity\Social;
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

        return $this->render('admin_office/index.html.twig', [
            'page_title' => 'Admin Back Office',
            'repLogAppProps' => $repLogAppProps,
        ]);
    }
}
