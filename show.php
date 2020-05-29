<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>作品展示</title>
  <link rel="stylesheet" href="css/show.css">
</head>

<body>
  <div class="top">
    <div class="logo">
      <img src="images/logo.png" alt="">
    </div>
    <p>作品展示</p>
    <a class="index" href="index.html">返回首页</a>
  </div>
  <div class="left">
    <img src="images/left.png" alt="">
  </div>
  <div class="right">
    <img src="images/right.png" alt="">
  </div>
  <ul id="wrap">

  </ul>
  <script>
    let msg = <?php
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
              echo json_encode(readFolderFiles('images/zuopin')); ?>;

    let ul = document.getElementById('wrap');
    let ulContent = '';
    for (var i = 0; i < msg.length; i++) {
      let str = `
        <li><img src='images/zuopin/${msg[i]}' /></li>
      `;
      ulContent += str;
    }
    ul.innerHTML = ulContent;
  </script>
</body>

</html>