<template>
  <transition name="fade" mode="out-in">
    <div class="page-layout-box">
        <div class="page-layout-top">
            <div class="info-box layout-box">
                <div class="container-box flex-box">
                    <div class="login-info">
                        <div class="icon-box"><img src="http://b-ssl.duitang.com/uploads/item/201505/23/20150523001433_LR58B.jpeg" alt="头像"></div>
                        <div class="name-box">小于</div>
                        <div class="major-box">软件工程专业</div>
                    </div>
                    <div class="params-info">
                        <div class="params-item">98</div>
                        <div class="params-item">88</div>
                        <div class="params-item">2</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-layout-main layout-box">
            <div class="container-box flex-box">
            </div>
        </div>
    </div>
  </transition>
</template>

<script>

</script>
<style scoped>
.flex-box { display: flex; flex-flow: row nowrap; justify-content: space-between;}
.page-layout-box { width: 100vw; height: 100vh; box-sizing: border-box; user-select: none; }
.container-box { max-width: 1300px; height: inherit; margin: 0 auto; }
.layout-box { min-width: 1300px; margin: 0 auto; }
.page-layout-top { width: 100vw; min-width: 1300px; height: 300px; background: url(../assets/images/979196.jpg) no-repeat; background-position: 0 50%;}
.info-box { width: 100%; height: 130px; background-color: #fff; position: relative; top: 170px; bottom: 0; }
.login-info, .params-info { width: 342px; height: 100%; position: relative; display: flex}
.icon-box { width: 150px; height: 150px; background-color: #fff; position: relative; bottom: 40px;}
.icon-box img { width: 130px; height: 130px; margin: 10px; }
.login-info>div:nth-child(2), .login-info>div:nth-child(3) { width: 192px; height: 50%; position: absolute; right: 0; text-indent: 1rem;}
.name-box {  top: 0; line-height: 100px; font-size: 3vmin;}
.major-box { top: 65px; line-height: 30px; color: #999; font-size: 1.5vmin;}
.params-item { width: 114px; height: inherit; line-height: 130px; font-size: 5vmin; font-family: initial; color: #3399cc; opacity: .85; text-align: center; position: relative;}
.params-item:nth-child(1)::after { content: '本次平均分'; display: block; width: 100%; height: 30px; font-size: 12px; position: absolute; bottom: 20px; line-height: 30px; color: #999; }
.params-item:nth-child(2)::after { content: '本次最高分'; display: block; width: 100%; height: 30px; font-size: 12px; position: absolute; bottom: 20px; line-height: 30px; color: #999; }
.params-item:nth-child(3)::after { content: '班级排名'; display: block; width: 100%; height: 30px; font-size: 12px; position: absolute; bottom: 20px; line-height: 30px; color: #999;}

.page-layout-main {width: 100%; height: calc(100vh - 300px); background-color: #f6f6f6}
</style>
