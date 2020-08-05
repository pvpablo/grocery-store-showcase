import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#FAFAFA',
            secondary: '#1565C0',
            accent: '#C90951',
            subtitle: '#999999',
            error: '#f44336',
            warning: '#ffc107',
            info: '#00bcd4',
            success: '#4caf50'
          },
        },
      },
});