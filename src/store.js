import {defineStore} from "pinia";
import axios from 'axios'

export const useStore = defineStore('user', {
  state: () => ({
    user: {
      firstName: '',
      lastName: '',
      email: '',
      option: 'Fun to use',
      telephone: '',
      website: ''
    }
  }),
  actions: {
    getLoggedInUsers() {
      return axios.get('http://localhost:3001/user')
          .then(res => {
            this.user = res.data
          })
          .catch(err => {
            console.log('Error: ', err)
          })
    }
  }
})