~function () {
    

// 获取工具按钮
let tool = document.getElementsByClassName('tool')[0];
// 获取按钮文本
let toolBtns = tool.getElementsByTagName('span');
// 获取画布区域
let area = document.getElementsByClassName('area')[0];
// 获取文本(暂未生成，后期生成通过dom映射自动获取)
let spanText = area.getElementsByClassName('text');
// 获取形状(暂未生成，后期生成通过dom映射自动获取)
let shapes = area.getElementsByClassName('img');
// 获取文字按钮的菜单列表
let toolTextMenu = document.getElementsByClassName('tool-text-menu')[0];
let toolTextMenuList = toolTextMenu.getElementsByTagName('span');
//获取背景按钮的菜单按钮
let toolBgMenu = document.getElementsByClassName('tool-bg-menu')[0];
// 获取背景图片素材
let bgList = toolBgMenu.getElementsByTagName('img');
//获取形状按钮的菜单按钮
let toolShapeMenu = document.getElementsByClassName('tool-shape-menu')[0];
// 获取形状图片素材
let shapeList = toolShapeMenu.getElementsByTagName('img');

// 获取调整画布大小菜单
let canvas = document.getElementsByClassName('canvas')[0];
let canvasWidth = canvas.getElementsByClassName('canvas-width')[0];
let canvasHeight = canvas.getElementsByClassName('canvas-height')[0];
let wvalue = canvas.getElementsByClassName('wvalue')[0];
let hvalue = canvas.getElementsByClassName('hvalue')[0];


// 获取选项区域
let option = document.getElementsByClassName('option')[0];

// 获取字体大小和颜色选项
let fontSize = document.getElementsByClassName('font-size')[0];
let fontColor = document.getElementsByClassName('color')[0];

toolTextMenuList[0].ondblclick = function () {
    // 创建一个文本元素添加到画布
    let span = document.createElement('span');
    span.innerHTML = '请输入文本';
    span.className = 'text';
    area.append(span);
    // 给创建的span文本元素添加双击事件
    span.ondblclick = changeText;
    // 给创建的span文本元素添加拖拽事件
    drag(span);
    // 添加span文本单击事件
    span.onclick = function () {
        // 修改选项div的内容
        let str = `<p>设置文字大小</p>
                    <input name="range" class="size" type="range" step="1" min="10" max="80" value="${parseInt(getComputedStyle(span, null).fontSize)}">
                    <p>设置文字颜色</p>
                    <input name="color" class="color" type="color">
                    <button class="btn">删除文字</button>
                    `;
        option.innerHTML = str;
        // 获取设置大小和旋转角度两个表单
        let size = option.getElementsByClassName('size')[0];
        let color = option.getElementsByClassName('color')[0];
        let btn = option.getElementsByClassName('btn')[0];

        // 当表单的值改变让图片对应改变
        size.onchange = function () {
            span.style.fontSize = this.value + 'px';
        }
        color.onchange = function () {
            span.style.color = this.value;
        }
        btn.onclick = function () {
            // 删除形状和选项内容
            span.parentNode.removeChild(span);
            option.innerHTML = '';
        }
    }
}


// 三个按钮点击展开菜单事件
toolBtns[0].onclick = function () {
    toolBgMenu.style.left = '-60px';
    toolShapeMenu.style.left = '-60px';
    if (toolTextMenu.style.left == '120px') {
        toolTextMenu.style.left = '-60px';
        return;
    }
    toolTextMenu.style.left = '120px';
}
toolBtns[1].onclick = function () {
    toolTextMenu.style.left = '-60px';
    toolShapeMenu.style.left = '-60px'
    if (toolBgMenu.style.left == '120px') {
        toolBgMenu.style.left = '-60px';
        return;
    }
    toolBgMenu.style.left = '120px';
}
toolBtns[2].onclick = function () {
    toolTextMenu.style.left = '-60px';
    toolBgMenu.style.left = '-60px';
    if (toolShapeMenu.style.left == '120px') {
        toolShapeMenu.style.left = '-60px';
        return;
    }
    toolShapeMenu.style.left = '120px';
}

// 添加的span文本双击事件
function changeText(event) {
    // 当前的文本元素
    let target = event.target;

    // 先获取文本
    let text = target.innerHTML;

    // 让元素内容变成一个表单可以输入文字
    target.innerHTML = `<input tepe="text" class="inputText" value=${text}>`;
    // 然后获取当前单行表单元素
    let inputText = target.getElementsByTagName('input')[0];
    // 激活焦点
    inputText.focus();
    inputText.select();
    // 禁用span元素拖拽事件
    target.onmousedown = null;
    // 当单行文本表单按下回车键时失去焦点
    inputText.onkeydown = function (event) {
        if (event.keyCode == 13) {
            // 执行失去焦点事件
            event.target.blur();
        }
    }
    // 失去焦点时，获取表单的value值，把span的文本从新赋值为表单的value值
    inputText.onblur = function (event) {
        event.target.value = event.target.value.replace(/(<)/g, "&lt;")
        event.target.value = event.target.value.replace(/(>)/g, "&gt;")
        target.innerHTML = event.target.value.replace(/(\s)/g, "&nbsp;");
        // 重新启用拖拽事件
        drag(target);
        // 如果文本框的值为空，就删除span元素
        if (event.target.value.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
            target.parentNode.removeChild(target);
        }

        //如果文本超出，不让它超出
    }
}


// 添加的bg菜单图片双击事件
Array.prototype.concat.apply([], bgList).forEach(e => {
    e.ondblclick = function () {
        area.style.background = `url(${this.getAttribute("src").match(/ima(\S)*/)[0]}) no-repeat top left / 100% 100%`;
    }
});

// 添加的形状图片双击事件
Array.prototype.concat.apply([], shapeList).forEach(e => {
    // 添加形状图片双击事件
    e.ondblclick = function () {
        // 创建一个图片元素添加到画布
        let img = document.createElement('img');
        img.className = 'img';
        img.src = `${this.getAttribute("src")}`;
        area.append(img);
        // 添加拖拽事件
        drag(img);
        //添加形状图片单击事件
        img.onclick = function (event) {
            // 修改选项div的内容
            let str = `<p>设置大小</p>
                    <input name="range" class="size" type="range" step="5" min="10" max="80" value="30">
                    <p>设置旋转角度</p>
                    <input name="range" class="deg" type="range" step="5" min="0" max="360" value="0">
                    <button class="btn">删除元素</button>
                    `;
            option.innerHTML = str;
            // 获取设置大小和旋转角度两个表单
            let size = option.getElementsByClassName('size')[0];
            let deg = option.getElementsByClassName('deg')[0];
            let btn = option.getElementsByClassName('btn')[0];
            // 当表单的值改变让图片对应改变
            size.onchange = function () {
                img.style.width = this.value * 10 + 'px';
            }
            deg.onchange = function () {
                img.style.transform = `rotate(${this.value}deg)`;
            }
            btn.onclick = function () {
                // 删除形状和选项内容
                img.parentNode.removeChild(img);
                option.innerHTML = '';
            }
        }
    }

});




// 修改画布大小
canvasWidth.onchange = function () {
    // span显示最新的值
    wvalue.innerHTML = this.value + 'px';
    // 调整画布宽度
    area.style.width = this.value + 'px';
    console.log(1);
}
canvasHeight.onchange = function () {
    // span显示最新的值
    hvalue.innerHTML = this.value + 'px';
    // 调整画布高度
    area.style.height = this.value + 'px';
}

// 拖拽事件
function drag(obj) {
    // 当鼠标在被拖拽元素上按下时，开始拖拽，onmousedown
    obj.onmousedown = function (event) {
        // 设置box1的捕获所有鼠标按下的事件
        /*
         *   setCapture()
         *       - 只有IE支持，但是在火狐中调用时不会报错，
         *           而如果使用chrome调用，会报错
         */
        // if(box1.setCapture){
        //     box1.setCapture();
        // }
        obj.setCapture && obj.setCapture();

        event = event || window.event;
        // div的偏移量 鼠标.clienX - 元素.offsetLeft
        // div的偏移量 鼠标.clienY - 元素.offsetTop
        let ol = event.clientX - obj.offsetLeft;
        let ot = event.clientY - obj.offsetTop;

        // 获取元素宽高
        let eWidth = obj.offsetWidth;
        let eHeight = obj.offsetHeight;

        // 为document绑定onmousemove事件
        document.onmousemove = function (event) {
            event = event || window.event;
            // 当鼠标移动时被拖拽元素跟随鼠标移动 onmousemove
            // 获取鼠标的坐标
            let left = event.clientX - ol;
            let top = event.clientY - ot;

            // 修改box1的位置
            // if (parseInt(left) <= 0) {
            //     obj.style.left = 0 + "px";
            // } else if (parseInt(left) >= obj.parentNode.offsetWidth - eWidth) {
            //     obj.style.left = obj.parentNode.offsetWidth - eWidth + "px";
            // } else {
            //     obj.style.left = left + "px";
            // }

            obj.style.left = left + "px";


            // if (parseInt(top) <= 0) {
            //     obj.style.top = 0 + "px";
            // } else if (parseInt(top) >= obj.parentNode.offsetHeight - eHeight) {
            //     obj.style.top = obj.parentNode.offsetHeight - eHeight + "px";
            // } else {
            //     obj.style.top = top + "px";
            // }
            obj.style.top = top + "px";

        };

        // 为元素绑定鼠标松开事件
        document.onmouseup = function () {
            // 当鼠标松开时，被拖拽元素固定在当前位置 onmouseup
            // 取消document的onmousemove事件
            document.onmousemove = null;

            // 取消document的onmouseup事件
            document.onmouseup = null;
            // 当鼠标松开时，取消对事件的捕获
            obj.releaseCapture && obj.releaseCapture();
        };

        /*
         *   当我们拖拽一个网页中的内容时，浏览器会默认去搜索引擎中搜索内容，
         *       此时会导致拖拽功能的异常，这个是浏览器提供的默认行为
         *       如果不希望发生这个行为，则可以通过return false来取消默认行为
         * 
         *   但是这招对IE8不起作用
         */
        return false;
    };
}

}();
