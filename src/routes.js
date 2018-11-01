import Home from './components/Home.vue';
import CharacterCreation from './components/CharacterCreation.vue';
import CharacterList from './components/CharacterList.vue';
import Character from './components/Character.vue';

export const routes = [
  { path: '/', component: Home },
  { path: '/character-creation', component: CharacterCreation },
  { path: '/character-list', component: CharacterList },
  { path: '/character-view', component: Character }
]