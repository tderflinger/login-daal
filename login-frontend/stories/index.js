import Vue from 'vue';
import { storiesOf } from '@storybook/vue';

storiesOf('Button', module)
  .add('with text', () => '<p>with text</p>')
  .add('with emoji', () => '<p>😀 😎 👍 💯</p>');
/*  .add('as a component', () => ({
    components: { MyButton },
    template: '<my-button :rounded="true">rounded</my-button>'
  }) 
  );*/
