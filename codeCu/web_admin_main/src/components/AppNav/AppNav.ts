
import Vue from 'Vue'
import Component from "vue-class-component"
import { adminRoutes } from './../../router'
import store from '../../store'

@Component({
    props: {
        collapse: Boolean
    }
})
export default class AppNav extends Vue{
    constructor(){
        super()
    }

    private routesConfig = adminRoutes

    get active () {
        return store.state.admin.active
    }
}