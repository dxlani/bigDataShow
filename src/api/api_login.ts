import { Post, Get, Patch, Put, Delete,ax} from '../http/http'

export default {
    login: function (obj) {
             //  return Put( "login",obj)
          return Post( "User/PostLogin",obj)
        },
}
