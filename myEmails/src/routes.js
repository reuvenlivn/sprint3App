
import About            from './pages/about.vue';
import Home             from './pages/home.vue';
import Emails             from './pages/emails.vue';
import EmailCenter        from './emails/email-center.vue';
import EmailDetails       from './emails/email-details.vue';
import EmailEdit          from './emails/email-edit.vue';

export default [
    {path: '/', component: Home},
    {path: '/about', component: About},
    {path: '/email', component: Emails, children: [
        {path: '', component: EmailCenter},
        {path: 'edit', component: EmailEdit},
        {path: ':id/edit', component: EmailEdit},
        {path: ':id', component: EmailDetails},
    ]},
    {path: '*', redirect: '/'}

]
