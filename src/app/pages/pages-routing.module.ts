import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PageTemplateNewsPostComponent } from './page-template-news-post/page-template-news-post.component';
import { PageTemplateComponent } from './page-template/page-template.component';

const routes: Routes = [
  {path: 'chairman-word', component: PageTemplateComponent},
  {path: 'reference-and-objectives', component: PageTemplateComponent},
  {path: 'statute-and-regulations', component: PageTemplateComponent},
  {path: 'conditions', component: PageTemplateComponent},
  {path: 'board', component: PageTemplateComponent},
  {path: 'policy', component: PageTemplateComponent},
  {path: 'property', component: PageTemplateComponent},
  {path: 'questions', component: PageTemplateComponent},
  {path: 'sitemap', component: PageTemplateComponent},
  {path: 'news', component: PageTemplateComponent},
  {path: 'news/:id', component: PageTemplateNewsPostComponent},
  {path: 'courses', component: PageTemplateComponent},
  {path: 'courses/:id', component: PageTemplateNewsPostComponent},
  {path: 'contact-us', component: ContactUsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
