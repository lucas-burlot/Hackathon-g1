<?php

namespace App\Controller\Admin;

use EasyCorp\Bundle\EasyAdminBundle\Config\Assets;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        return $this->render('admin/dashboard.html.twig');
        return parent::index();
        
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()

            // there's no need to define the "text direction" explicitly because
            // its default value is inferred dynamically from the user locale
            ->setTextDirection('ltr')

            // by default, all backend URLs include a signature hash. If a user changes any
            // query parameter (to "hack" the backend) the signature won't match and EasyAdmin
            // triggers an error. If this causes any issue in your backend, call this method
            // to disable this feature and remove all URL signature checks
            ->disableUrlSignatures()

            // by default, all backend URLs are generated as absolute URLs. If you
            // need to generate relative URLs instead, call this method
            ->generateRelativeUrls()
        ;
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');
    }

    public function configureAssets(): Assets{
        $assets = parent::configureAssets();

        return $assets
            ->addCssFile('build/admin-app.css')
            ->addJsFile('build/admin-app.js');
    }
}
