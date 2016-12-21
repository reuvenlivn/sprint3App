
import About            from './pages/about.vue';
import Home             from './pages/home.vue';
import Events             from './pages/events.vue';
import EventCenter        from './events/event-center.vue';
import EventDetails       from './events/event-details.vue';
import EventEdit          from './events/event-edit.vue';

export default [
    {path: '/', component: Home},
    {path: '/about', component: About},
    {path: '/event', component: Events, children: [
        {path: '', component: EventCenter},
        {path: 'edit', component: EventEdit},
        {path: ':id/edit', component: EventEdit},
        {path: ':id', component: EventDetails},
    ]},
    {path: '*', redirect: '/'}

]
