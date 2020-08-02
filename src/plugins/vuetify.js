import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#1565C0',
            secondary: '#DBE6EC',
            accent: '#C90951',
            error: '#f44336',
            warning: '#ffc107',
            info: '#00bcd4',
            success: '#4caf50'
          },
        },
      },
});