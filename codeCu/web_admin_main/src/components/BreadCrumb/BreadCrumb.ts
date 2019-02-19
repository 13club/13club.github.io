import Vue from 'Vue'
import Component from "vue-class-component"

@Component({
    components: {
    }
})
export default class BreadCrumb extends Vue{
    constructor() {
        super()
    }
    private admin = this.$store.state.admin
}