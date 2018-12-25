import Vue from 'vue'
function vueTouch(el,binding,type){
    var _this=this;
    this.obj=el;
    this.binding=binding;
    this.touchType=type;
    this.vueTouches={x:0,y:0};
    this.vueMoves=true;
    this.vueLeave=true;
    this.longTouch=true;
    // console.log('binding.value = ',binding.value)
    this.vueCallBack=typeof(binding.value)=="object"?binding.value.fn:binding.value;
    // console.log('this.vueCallBack = ' ,this.vueCallBack)
    this.obj.addEventListener("touchstart",function(e){
        _this.start(e);
    },false);
    this.obj.addEventListener("touchend",function(e){
        _this.end(e);
    },false);
    this.obj.addEventListener("touchmove",function(e){
        _this.move(e);
    },false);
};
vueTouch.prototype={
    start:function(e){
        this.vueMoves=true;
        this.vueLeave=true;
        this.longTouch=true;
        this.vueTouches={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY};
        // console.log('this1 = ', this);
        this.time=setTimeout(function(){
            if(this.vueLeave&&this.vueMoves){
                // console.log('this.binding.value = ',this.binding.value);
                // console.log('this.vueCallBack = ',this.vueCallBack);
                
                this.touchType=="longtap"&&this.vueCallBack(this.binding.value,e);
                // console.log('this.touchType = ', this.touchType);
                this.longTouch=false;
            };
        }.bind(this),1000);

    },

    end:function(e){
        var disX=e.changedTouches[0].pageX-this.vueTouches.x;
        var disY=e.changedTouches[0].pageY-this.vueTouches.y;
        clearTimeout(this.time);
        // console.log('this.binding = ',this.binding)
        if(Math.abs(disX)>10||Math.abs(disY)>100){
            this.touchType=="swipe"&&this.vueCallBack(this.binding.value,e);
            if(Math.abs(disX)>Math.abs(disY)){
                if(disX>10){
                    this.touchType=="swiperight"&&this.vueCallBack(this.binding.value,e);
                };
                if(disX<-10){
                    this.touchType=="swipeleft"&&this.vueCallBack(this.binding.value,e);
                };
            }else{
                if(disY>10){
                    this.touchType=="swipedown"&&this.vueCallBack(this.binding.value,e);
                };
                if(disY<-10){
                    this.touchType=="swipeup"&&this.vueCallBack(this.binding.value,e);
                };  
            };
        }else{
            if(this.longTouch&&this.vueMoves){
                // console.log(this.binding)
                this.touchType=="tap"&&this.vueCallBack(this.binding.value,e);
                this.vueLeave=false
            };
        };
    },
    move:function(event){
        
        // if(this.touchType === 'swipe'){
        //     // console.log(this.touchType)
        //     var disX=event.changedTouches[0].pageX-this.vueTouches.x;
        //     var disY=event.changedTouches[0].pageY-this.vueTouches.y;
        //     // console.log('disX = ' ,disX)
        //     event.changedTouches[0]['x'] = disX;
        //     event.changedTouches[0]['y'] = disY;
        //     // console.log(this.binding.value);
        //     this.vueCallBack(this.binding.value,event);
            
        //    // console.log('event = ', event);
        // }
        // console.log('event = ', event);

        this.vueMoves=false;
    }
};
Vue.directive("tap",{
    bind:function(el,binding){
        new vueTouch(el,binding,"tap");
    }
});
Vue.directive("swipe",{
    bind:function(el,binding,vonde){
        new vueTouch(el,binding,"swipe",vonde);
    }
});
Vue.directive("swipeleft",{
    bind:function(el,binding){
        new vueTouch(el,binding,"swipeleft");
    }
});
Vue.directive("swiperight",{
    bind:function(el,binding){
        new vueTouch(el,binding,"swiperight");
    }
});
Vue.directive("swipedown",{
    bind:function(el,binding){
        new vueTouch(el,binding,"swipedown");
    }
});
Vue.directive("swipeup",{
    bind:function(el,binding){
        new vueTouch(el,binding,"swipeup");
    }
});
Vue.directive("longtap",{
    bind:function(el,binding){
        new vueTouch(el,binding,"longtap");
    }
});
/**
 * popup
 */

function Popup(el,binding,type){
    var _this = this;
    this.obj = el;
    this.binding = binding;
    this.type = type;
    this.container = document.querySelector('#app');
    this.obj.addEventListener('click',function(){
        _this.insetHtml()
        
    });
}
Popup.prototype = {
    insetHtml: function(){
        if(!this.binding.value.length) false;
        this.container.insertAdjacentHTML('beforeend',(()=>{
            let arr = [];
            for(var item of this.binding.value){
                arr.push(`<li optionid='${item.optionID}'>${item.value}</li>`)
            }
            return `<div class="popup-container">
                    <div class="popup-mask"></div>
                    <ul>
                        ${arr.join('')}
                        <li class='popup-cancel'>取消</li>
                    </ul>
            </div>`;
        })())
        
        setTimeout(function(){
            let container = document.querySelector('.popup-container');
            container.classList.add('show');
            this.bindingEvent(container)
        }.bind(this),200);

        
    },
    // 绑定事件
    bindingEvent:function(parent){
        var _this = this;
        let mask = parent.querySelector('.popup-mask');
        let ul = parent.querySelector('ul');
        mask.addEventListener('click',function(){
            this.hidePopup();
        }.bind(this));
        ul.addEventListener('click',function(){
            if(event.target.tagName == 'LI'){
                console.log(Vue)
                // if(event.target.getAttribute('optionid') == '1'){
                //     alert(window.location.href);
                // }else{
                //     alert(JSON.stringify(window.navigator.userAgent));
                // }
                _this.hidePopup();
            }
        });
    },
    // 隐藏 popup
    hidePopup:function(){
        let container = document.querySelector('.popup-container');
        container.classList.remove('show');
        setTimeout(function(){
            container.remove();
        },200);
    }
}
Vue.directive('popup',{
    bind:function(el,binding){
        // console.log('bind = ',arguments);
        new Popup(el,binding,'popup');
    },
    // inserted:function(){
    //     console.log('inserted = ',arguments);
    // },
    // update: function () {
    //     console.log('update = ',arguments);
    // },
    // componentUpdated: function () {
    //     console.log('componentUpdated = ',arguments);
    // },
    // unbind: function () {
    //     console.log('unbind = ',arguments);
    // }
})

