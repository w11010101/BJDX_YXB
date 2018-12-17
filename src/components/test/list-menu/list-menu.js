import Vue from 'vue';
let components = {
    'listMenu':Vue.component('list-menu',{
        props:['myprop'],
        data(){
            return {
                msg:'this is list-menu components',
            }
        },
        
        template:`<div class='list-slide'>
                <ul class='lists'>
                    <li>
                        <label for="">label</label>
                        <button>1</button><button>2</button><button>3</button>
                    </li>
                </ul>
            </div>`
    }),
    // 'private-header':Vue.component({
    //     props:['props'],
    //     data(){
    //         return {

    //         }
    //     },
    //     template:'adfads'
    // })
}

export default components;