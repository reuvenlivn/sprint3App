
import About            from './pages/about.vue';
import Home             from './pages/home.vue';

import Events             from './pages/events.vue';
import EventCenter        from './events/events/event-center.vue';
import EventDetails       from './events/events/event-details.vue';
import EventEdit          from './events/events/event-edit.vue';

import Emails             from './pages/emails.vue';
import EmailCenter        from './emails/emails/email-center.vue';
import EmailDetails       from './emails/emails/email-details.vue';
import EmailEdit          from './emails/emails/email-edit.vue';

export default [
    {path: '/', component: Home},
    {path: '/about', component: About},
    {path: '/event', component: Events, children: [
        {path: '', component: EventCenter},
        {path: 'edit', component: EventEdit},
        {path: ':id/edit', component: EventEdit},
        {path: ':id', component: EventDetails},
    ]},
    {path: '/email', component: Emails, children: [
        {path: '', component: EmailCenter},
        {path: 'edit', component: EmailEdit},
        {path: ':id/edit', component: EmailEdit},
        {path: ':id', component: EmailDetails},
    ]},
    {path: '*', redirect: '/'}
]
