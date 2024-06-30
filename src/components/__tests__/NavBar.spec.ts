import { describe, it, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { mount } from '@vue/test-utils';
import NavBar from '@/components/NavBar.vue';

const routes = [
  { path: '/', component: { template: '<div>Home</div>' } },
  { path: '/historie', component: { template: '<div>Historie</div>' } },
  { path: '/info', component: { template: '<div>Info</div>' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

describe('NavBar.vue', () => {
  it('Schaut ob alle router links da sind', async () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router]
      }
    });

    // Check if the router-links are rendered correctly
    const homeLink = wrapper.find('a[href="/"]');
    expect(homeLink.exists()).toBe(true);

    const historieLink = wrapper.find('a[href="/historie"]');
    expect(historieLink.exists()).toBe(true);

    const infoLink = wrapper.find('a[href="/info"]');
    expect(infoLink.exists()).toBe(true);
  });
});



