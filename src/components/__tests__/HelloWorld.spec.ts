import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';


import { mount } from '@vue/test-utils'
import TaskList from '@/components/TaskList.vue'


describe('TaskList', () => {

  it('Zeigt keine Task an', () => {
    const wrapper = shallowMount(TaskList, { props: { title: 'Tasks' } });
    expect(wrapper.text()).toContain('Keine aktuellen Aufgaben!');
  });

  it('Rendert TaskList richtig', () => {
    const wrapper = mount(TaskList, { props: { title: 'Task Manager' } })
    expect(wrapper.text()).toContain('Task Manager')
  })


  it('verarbeitet die Benutzereingabe korrekt', async () => {
    const wrapper = mount(TaskList, { props: { title: 'Task Manager' } })

    const personInput = wrapper.find('input[placeholder="Person eingeben"]')

    await personInput.setValue('Herr Lehrer')

    expect(personInput.element.value).toBe('Herr Lehrer')
  })


  it('zeigt die Putzplaner-Hymne an', () => {
    const wrapper = mount(TaskList, { props: { title: 'Task Manager' } });

    const audioElement = wrapper.find('audio');

    const sourceElement = audioElement.find('source');
    const songUrl = sourceElement.attributes('src');

    const expectedSongUrl = '/src/assets/Putzplaner.mp3';

    expect(songUrl).toBe(expectedSongUrl);
  });

})
