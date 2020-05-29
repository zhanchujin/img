<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>作图界面</title>
    <link rel="stylesheet" href="css/create.css">
    <link rel="stylesheet" href="css/iconfont.css">
</head>

<body>
    <div class="top">
        <div class="logo">
            <img src="images/logo.png" alt="">
        </div>
        <div class="publish">
            <button>发布</button>
        </div>
    </div>
    <div class="wrap">
        <div class="tool">
            <ul>
                <li class="iconfont icon-wenzi"><span>文字</span></li>
                <li class="iconfont icon-beijingtu"><span>背景</span></li>
                <li class="iconfont icon-xingzhuang"><span>图形</span></li>
            </ul>
        </div>
        <div class="tool-text-menu">
            <span>横向文本</span>
            <span>竖向文本</span>
        </div>
        <div class="tool-bg-menu">
            <ul class="tool-bg-menu-ul">
                <!-- <li>
                    <img src="images/bg/1.jpg" alt="">
                </li>
                <li>
                    <img src="images/bg/2.jpg" alt="">
                </li>
                <li>
                    <img src="images/bg/3.jpg" alt="">
                </li> -->
            </ul>
        </div>
        <div class="tool-shape-menu">
            <ul class="tool-shape-menu-ul">
                <!-- <li>
                    <img src="images/shape/c1.png" alt="">
                </li>
                <li>
                    <img src="images/shape/2.png" alt="">
                </li>
                <li>
                    <img src="images/shape/3.png" alt="">
                </li> -->
            </ul>
        </div>
        <div class="interface">
            <div class="area" id="area"></div>
        </div>
        <div class="option">

        </div>
        <div class="canvas">
            <p>设置画布大小</p>
            <span>宽度</span>
            <input name="range" class="canvas-width" type="range" step="1" min="100" max="1300" value="890">
            <span class="wvalue">890px</span>
            <span>高度</span>
            <input name="range" class="canvas-height" type="range" step="1" min="100" max="900" value="700">
            <span class="hvalue">700px</span>
        </div>
    </div>
</body>

</html>

<script>
    // 获取背景素材ul
    let bgUl = document.getElementsByClassName('tool-bg-menu-ul')[0];
    // 获取形状素材ul
    let shapeUl = document.getElementsByClassName('tool-shape-menu-ul')[0];

    // 读取bg素材文件
    let msg1 = <?php
                function readFolderFiles($path)
                {
                    $list = [];
                    $resource = opendir($path);
                    while ($file = readdir($resource)) {
                        //排除根目录
                        if ($file != ".." && $file != ".") {
                            //根目录下的文件
                            $list[] = $file;
                        }
                    }
                    closedir($resource);
                    return $list ? $list : [];
                };
                echo json_encode(readFolderFiles('images/bg')); ?>;

    // 读取形状素材文件
    let msg2 = <?php
                echo json_encode(readFolderFiles('images/shape')); ?>;

    let ulContent = '';
    let ulContent2 = '';
    for (var i = 0; i < msg1.length; i++) {
        let str = `
        <li><img src='images/bg/${msg1[i]}' /></li>
      `;
        ulContent += str;
    }
    for (var i = 0; i < msg2.length; i++) {
        let str = `
        <li><img src='images/shape/${msg2[i]}' /></li>
      `;
        ulContent2 += str;
    }
    bgUl.innerHTML = ulContent;
    shapeUl.innerHTML = ulContent2;
</script>

<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/html2canvas.js"></script>
<script src="js/create.js"></script>
<script src="js/screenshots.js"></script>