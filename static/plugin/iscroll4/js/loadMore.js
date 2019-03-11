import('../css/pullToRefresh.css');
(function(root,factory){
    if (typeof define === 'function' && define.amd) {
        define(function(){return factory});
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory;
    } else {
        root.loadMore = factory;
    }
})(this,function(){

    var refresher = {
        info: {
            "pullDownLable": "下拉更新...",
            "pullingDownLable": "更新中...",
            "pullUpLable": "上拉加载更多...",
            "pullingUpLable": "加载更多中...",
            "loadingLable": "加载中..."
        },
        init: function(parameter) {
            var wrapper = document.getElementById(parameter.id);
            var div = document.createElement("div");
            div.className = "scroller";
            wrapper.appendChild(div);
            var scroller = wrapper.querySelector(".scroller");
            var list = wrapper.querySelector("#" + parameter.id + " ul");
            scroller.insertBefore(list, scroller.childNodes[0]);
            var pullDown = document.createElement("div");
            pullDown.className = "pullDown";
            var loader = document.createElement("div");
            loader.className = "loader";
            for (var i = 0; i < 4; i++) {
                var span = document.createElement("span");
                loader.appendChild(span);
            }
            pullDown.appendChild(loader);
            var pullDownLabel = document.createElement("div");
            pullDownLabel.className = "pullDownLabel";
            pullDown.appendChild(pullDownLabel);
            scroller.insertBefore(pullDown, scroller.childNodes[0]);
            var pullUp = document.createElement("div");
            pullUp.className = "pullUp";
            var loader = document.createElement("div");
            loader.className = "loader";
            for (var i = 0; i < 4; i++) {
                var span = document.createElement("span");
                loader.appendChild(span);
            }
            pullUp.appendChild(loader);
            var pullUpLabel = document.createElement("div");
            pullUpLabel.className = "pullUpLabel";
            var content = document.createTextNode(refresher.info.pullUpLable);
            pullUpLabel.appendChild(content);
            pullUp.appendChild(pullUpLabel);
            scroller.appendChild(pullUp);
            var pullDownEl = wrapper.querySelector(".pullDown");
            var pullDownOffset = pullDownEl.offsetHeight;
            var pullUpEl = wrapper.querySelector(".pullUp");
            var pullUpOffset = pullUpEl.offsetHeight;
            return this.scrollIt(parameter, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset);

        },
        scrollIt: function(parameter, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset) {
            var iScroll = require('./iscroll-true.js').iScroll;
            var myScroll = eval(parameter.id + '= new iScroll(parameter.id, {useTransition: true,vScrollbar: true,topOffset: pullDownOffset,onRefresh: function () {refresher.onRelease(pullDownEl,pullUpEl);},onScrollMove: function () {refresher.onScrolling(this,pullDownEl,pullUpEl,pullUpOffset);},onScrollEnd: function () {refresher.onPulling(pullDownEl,parameter.pullDownAction,pullUpEl,parameter.pullUpAction);},})');
            pullDownEl.querySelector('.pullDownLabel').innerHTML = refresher.info.pullDownLable;
            console.log(document.getElementById(parameter.id))
            document.getElementById(parameter.id).addEventListener('touchmove', function(e) {
                e.preventDefault();
            }, {passive:false});
            return myScroll;
        },
        onScrolling: function(e, pullDownEl, pullUpEl, pullUpOffset) {
            if (e.y > -(pullUpOffset)) {
                pullDownEl.id = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = refresher.info.pullDownLable;
                e.minScrollY = -pullUpOffset;
            }
            if (e.y > 0) {
                pullDownEl.classList.add("flip");
                pullDownEl.querySelector('.pullDownLabel').innerHTML = refresher.info.pullingDownLable;
                e.minScrollY = 0;
            }
            if (e.scrollerH < e.wrapperH && e.y < (e.minScrollY - pullUpOffset) || e.scrollerH > e.wrapperH && e.y < (e.maxScrollY - pullUpOffset)) {
                pullUpEl.style.display = "block";
                pullUpEl.classList.add("flip");
                pullUpEl.querySelector('.pullUpLabel').innerHTML = refresher.info.pullingUpLable;
            }
            if (e.scrollerH < e.wrapperH && e.y > (e.minScrollY - pullUpOffset) && pullUpEl.id.match('flip') || e.scrollerH > e.wrapperH && e.y > (e.maxScrollY - pullUpOffset) && pullUpEl.id.match('flip')) {
                pullDownEl.classList.remove("flip");
                pullUpEl.querySelector('.pullUpLabel').innerHTML = refresher.info.pullUpLable;
            }
        },
        onRelease: function(pullDownEl, pullUpEl) {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.classList.toggle("loading");
                pullDownEl.querySelector('.pullDownLabel').innerHTML = refresher.info.pullDownLable;
                pullDownEl.querySelector('.loader').style.display = "none"
                pullDownEl.style.lineHeight = pullDownEl.offsetHeight + "px";
            }
            if (pullUpEl.className.match('loading')) {
                pullUpEl.classList.toggle("loading");
                pullUpEl.querySelector('.pullUpLabel').innerHTML = refresher.info.pullUpLable;
                pullUpEl.querySelector('.loader').style.display = "none"
                pullUpEl.style.lineHeight = pullUpEl.offsetHeight + "px";
            }
        },
        onPulling: function(pullDownEl, pullDownAction, pullUpEl, pullUpAction) {
            if (pullDownEl.className.match('flip') /*&&!pullUpEl.className.match('loading')*/ ) {
                pullDownEl.classList.add("loading");
                pullDownEl.classList.remove("flip");
                pullDownEl.querySelector('.pullDownLabel').innerHTML = refresher.info.loadingLable;
                pullDownEl.querySelector('.loader').style.display = "block"
                pullDownEl.style.lineHeight = "20px";
                if (pullDownAction) pullDownAction();
            }
            if (pullUpEl.className.match('flip') /*&&!pullDownEl.className.match('loading')*/ ) {
                pullUpEl.classList.add("loading");
                pullUpEl.classList.remove("flip");
                pullUpEl.querySelector('.pullUpLabel').innerHTML = refresher.info.loadingLable;
                pullUpEl.querySelector('.loader').style.display = "block"
                pullUpEl.style.lineHeight = "20px";
                if (pullUpAction) pullUpAction();
            }
        }
    }
    var loadMore = function () {
        var self = this;
        this.scroll = function (option){

            // 下拉
            var pullDown = typeof option.pullDown == "string"?function (){
                // 传入时 refresh 字符串
                self.Refresh();
            }:option.pullDown;
            // 上拉
            var pullUp = typeof option.pullUp == "string"?function (){
                // 传入时 refresh 字符串
                self.Refresh();
            }:option.pullUp;
            
            refresher.init({
                id: option.id,
                pullDownAction: pullDown,
                pullUpAction: pullUp,
                // preventDefault:false
            });
        }    
        var generatedCount = 0;
        // 重置
        this.Refresh = function (){
            wrapper.refresh()
        }
        // 销毁
        this.destroy = function (){
            wrapper.destroy();
        }
        // 恢复
        this.enable = function (){
            wrapper.enable();
        }
    }

    var loadMore = new loadMore();
    return loadMore;
})